"use server";

import db from "@/services/Prisma";
import { productData } from "@/data/data";
import { getCurrentUser } from "./auth-actions";


export async function getAllProducts(page:number, limit:number ) {
  const skip = (page-1)*limit;
  try {
    const result = await db.product.findMany({
      skip :skip,
      take: 30,
    });
    return result;
  } catch (err: any) {
    return err instanceof Error ? err.message : String(err);
  }
}

export async function getProductsCount(){
  return await db.product.count();
}

export async function searchProducts(query: string) {
  try {
    const result = await db.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return result;
  } catch (err: any) {
    return err instanceof Error ? err.message : String(err);
  }
}

export async function getProductById(id: number) {
  try {
    const product = await db.product.findUnique({
      where: { productId: id },
    });
    return product;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

export async function addProduct(form_data: any) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized access");
  }
  const imageUrl = form_data.url?.toString?.().trim();
  if (!imageUrl) {
    return "Image URL is missing";
  }

  try {
    const lastProduct = await db.product.findFirst({
      orderBy: {
        productId: "desc",
      },
      select: {
        productId: true,
      },
    });
    const newId = (lastProduct?.productId || 0) + 1;
    const obj = {
      productId: newId,
      title: form_data.title,
      description: form_data.description,
      rating: parseFloat(form_data.rating) || 0,
      price: parseFloat(form_data.price) || 0,
      image_url: form_data.url,
      category: form_data.category,
    };

    const res = await fetch(obj.image_url, { method: "HEAD" });
    const isImage =
      res.ok && res.headers.get("content-type")?.startsWith("image/");
    if (!isImage) return "Image url not valid";

    await db.product.create({
      data: obj,
    });
    return "success";
  } catch (error: any) {
    console.error("Add product error:", error);
    return error.message || "Failed to add product";
  }
}

export async function updateProduct(productId: number, updateData: any) {
  try {

    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return "Unauthorized access";
    }

    // Validate productId
    if (!productId) {
      return "Product ID is required";
    }

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { productId: productId },
    });

    if (!existingProduct) {
      return "Product not found";
    }

    // If image URL is being updated, validate it
    if (updateData.image_url) {
      try {
        const res = await fetch(updateData.image_url, { method: "HEAD" });
        const isImage =
          res.ok && res.headers.get("content-type")?.startsWith("image/");
        if (!isImage) {
          return "Invalid image URL";
        }
      } catch (error) {
        return "Unable to validate image URL";
      }
    }

    // Update the product
    await db.product.update({
      where: { productId: productId },
      data: updateData,
    });

    return "Product Updated Successfully";
  } catch (err: any) {
    console.error("Update product error:", err);
    return err.message || "Failed to update product";
  }
}

export async function uploadMany() {
  const uploadData = productData.map((item) => {
    return {
      productId: item.id,
      title: item.title,
      description: item.description,
      rating: item.rating,
      price: item.price,
      image_url: item.thumbnail,
      category: item.category,
    };
  });

  try {
    await db.product.createMany({ data: uploadData });
    return "Success";
  } catch (err: any) {
    return err.message;
  }
}


export async function deleteProduct(productId : number){
  try{
    const user = await getCurrentUser();
    if(!user || user.role !== "admin"){
      throw new Error("unauthorized access");
    }
    if(!productId){
      throw new Error("invalid productId");
    }
    const deletedProduct = await db.product.delete({
      where : {productId}
    })
    return {success : "Item deleted successfully"};
  }catch(err){
    return  {error :  'Unable to delete product. Try again.'}
  }
}
