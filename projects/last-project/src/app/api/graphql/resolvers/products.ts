import { getUserFromCookies } from "@/lib/helper";
import prisma from "@/lib/services/prisma";
import { ProductCategory } from "@prisma/client";

export default async function addProduct(
  _: any,
  args: {
    title: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    imageUrl: string;
    supplierId: string;
  }
) {
  const { title, description, price, category, stock, supplierId, imageUrl } =
    args;
  const newProduct = {
    title,
    description,
    price,
    category,
    stock,
    imageUrl,
    supplierId,
  };
  try {
    const product = await prisma.product.create({
      data: newProduct,
    });
    return product;
  } catch (error) {
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    return null;
  }
}

export async function getProductById(
  _: any,
  args: {
    id: string;
  }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: args.id },
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!product) return false;
    const sales = product.sales.map((sale: any) => {
      return {
        id: sale.id,
        productId: sale.productId,
        quantity: sale.quantity,
        createdAt: new Date(Number(sale.createdAt)).toLocaleDateString(),
        updatedAt: new Date(Number(sale.updatedAt)).toLocaleDateString(),
      };
    });

    const dataMap = new Map<string, number>();

    sales.forEach((sale: { createdAt: string; quantity: number }) => {
      dataMap.set(
        sale.createdAt,
        (dataMap.get(sale.createdAt) || 0) + sale.quantity
      );
    });

    const mergedSales = Array.from(dataMap.entries()).map(
      ([createdAt, quantity]) => ({
        createdAt,
        quantity,
      })
    );

    return {
      ...product,
      sales: mergedSales,
    };
  } catch (error) {
    return false;
  }
}

export async function createSale(
  _: any,
  args: {
    productId: string;
    quantity: number;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return false;

    const product = await prisma.product.findUnique({
      where: { id: args.productId },
    });
    if (!product || product.stock < args.quantity) return false;

    await prisma.$transaction([
      prisma.sale.create({
        data: {
          productId: args.productId,
          quantity: args.quantity,
        },
      }),
      prisma.product.update({
        where: { id: args.productId },
        data: {
          stock: {
            decrement: args.quantity,
          },
        },
      }),
      prisma.stockLog.create({
        data: {
          userId: user.id as string,
          productId: args.productId,
          change: -args.quantity,
          reason: "Sale created",
        },
      }),
    ]);
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function getAllSales() {
  try {
    const sales = await prisma.sale.findMany({});
    return sales;
  } catch (error) {
    return null;
  }
}

export async function restockProduct(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return false;

    const product = await prisma.product.findUnique({
      where: { id: args.id },
    });
    if (!product) return false;

    await prisma.$transaction([
      prisma.product.update({
        where: { id: args.id },
        data: {
          stock: {
            increment: args.quantity,
          },
        },
      }),
      prisma.stockLog.create({
        data: {
          userId: user.id as string,
          productId: args.id,
          change: args.quantity,
          reason: "Restocked",
        },
      }),
    ]);
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function editProduct(
  _: any,
  args: {
    id: string;
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    imageUrl?: string;
    supplierId?: string;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return false;

    const product = await prisma.product.findUnique({
      where: { id: args.id },
    });
    if (!product) return false;
    const dataToUpdate: any = {};
    if (args.title) dataToUpdate.title = args.title;
    if (args.description) dataToUpdate.description = args.description;
    if (args.price) dataToUpdate.price = args.price;
    if (args.category) dataToUpdate.category = args.category;
    if (args.stock) dataToUpdate.stock = args.stock;
    if (args.imageUrl) dataToUpdate.imageUrl = args.imageUrl;
    if (args.supplierId) dataToUpdate.supplierId = args.supplierId;

    await prisma.product.update({
      where: { id: args.id },
      data: {
        ...dataToUpdate,
      },
    });
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
