"use server";

import db from "@/services/Prisma";
import { getCurrentUser } from "./auth-actions";


type cartItem = {
  productId: number;
  quantity: number;
};

export async function addToCart(productId: number, quantity: number) {
  try {
    if (!productId || !quantity || quantity < 1) {
      throw new Error("Invalid product or quantity");
    }
    const result = await verifyUserRequest();
    if (!result.success || !result.user) {
      return { success: false, message: "Invalid user request." };
    }
    const { user, cart } = result;
    if (!cart) {
      const newCart = await db.cart.create({
        data: {
          userId: user.id,
          items: [
            {
              productId,
              quantity,
            },
          ],
        },
      });
      return { success: true, message: "Item(s) added to Cart.", newCart };
    }

    const updatedItems = updateItemList(cart.items, productId, quantity);

    const updatedCart = await db.cart.update({
      where: { userId: user.id },
      data: {
        items: updatedItems,
      },
    });

    return {
      success: true,
      message: "Item(s) added to cart.",
      cart: updatedCart,
    };
  } catch (err) {
    return { success: false, message: "Failed to add item to cart" };
  }
}

export async function removeFromCart(productId: number, quantity: number) {
  try {
    if (!productId || !quantity || quantity < 1) {
      throw new Error("Invalid product or quantity");
    }
    const result = await verifyUserRequest();
    if (!result.success || !result.user || !result.cart) {
      return { success: false, message: "Invalid user request." };
    }
    const { user, cart } = result;

    const updatedItems = updateItemList(cart.items, productId, -1 * quantity);

    const updatedCart = await db.cart.update({
      where: { userId: user.id },
      data: { items: updatedItems },
    });

    return {
      success: true,
      message: "Items(s) removed from cart.",
      cart: updatedCart,
    };
  } catch (err) {
    return { success: false, message: "Failed to remove item(s) from cart." };
  }
}

export async function getUserCart() {
  try {
    const res = await verifyUserRequest();
    if (!res || !res.user || !res.cart) {
      return { success: false, message: "Unauthorized" };
    }
    const { cart, user } = res;
    const items = cart.items as cartItem[];
    const productIds = items.map((item) => item.productId);
    const products = await db.product.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
    });

    const productMap = new Map();
    products.forEach((item) => {
      productMap.set(item.productId, item);
    });

    const populatedItems = cart.items
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;

        return {
          quantity: item.quantity,
          product: {
            productId: product.productId,
            title: product.title,
            description: product.description,
            rating: product.rating,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
          },
        };
      })
      .filter(Boolean)
    return { success: true, message: "success", cart:{
      id : cart.id,
      userId : user.id,
      items : populatedItems
    }};
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function syncWithLocalCart(localCart: any) {
  try {
    if (!Array.isArray(localCart)) {
      throw new Error("invalid cart format");
    }
    const res = await verifyUserRequest();
    if (!res?.user) {
      throw new Error("unauthorized");
    }
    const { user, cart } = res;
    if (!cart) {
      await db.cart.create({
        data: {
          userId: user.id,
          items: localCart,
        },
      });
      return { success: true, cart: localCart };
    } else {
      const mergedMap = new Map();

      cart.items.forEach((item) =>
        mergedMap.set(item.productId, item.quantity)
      );

      localCart.forEach((item: any) => {
        const quantity = mergedMap.get(item.productId) || 0;
        mergedMap.set(item.productId, (item.quantity || 1) + quantity);
      });

      const mergedItems = Array.from(mergedMap.entries()).map(
        ([productId, quantity]) => ({ productId, quantity })
      );

      await db.cart.update({
        where: { id: cart.id },
        data: { items: mergedItems },
      });
      return { success: true, cart: mergedItems };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

async function verifyUserRequest() {
  try {
    const tokenUser = await getCurrentUser();
    if (!tokenUser) throw new Error("Unauthorized access.");

    const user = await db.user.findUnique({
      where: { id: tokenUser.id as string },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    const cart = await db.cart.findUnique({
      where: { userId: user.id },
    });
    return { success: true, user, cart };
  } catch (err) {
    return { success: false };
  }
}

function updateItemList(
  cartItems: cartItem[],
  productId: number,
  quantity: number
) {
  const updatedItems = [...cartItems];
  const existingIndex = updatedItems.findIndex(
    (item) => item.productId === productId
  );
  if (existingIndex !== -1) {
    updatedItems[existingIndex].quantity += quantity;
    if (updatedItems[existingIndex].quantity < 1) {
      updatedItems.splice(existingIndex, 1);
    }
  } else {
    if (quantity > 0) {
      updatedItems.push({ productId, quantity });
    }
  }
  return updatedItems;
}
