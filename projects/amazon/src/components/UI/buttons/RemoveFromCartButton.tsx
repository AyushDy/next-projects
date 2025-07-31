"use client"

import { useCart } from "@/contexts/CartContext";

export default function CartIcon({ product }:any) {
    const { removeFromCart }:any = useCart();

    return (
        <button onClick={() => removeFromCart(product)}>
          <span className="mx-1 px-1 rounded-full flex  items-center text-xs text-red-500 border-red-500 border cursor-pointer hover:bg-red-500 hover:text-white">
            Remove
          </span>
        </button>
    );
}