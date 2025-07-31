//@ts-nocheck
"use client";
import CartItemCard from "./UI/cards/CartItemCard";
import { useCart } from "@/contexts/CartContext";

export default function CartList() {
  const { cartItems } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center md:grid-cols-1 w-fit justify-center mx-auto">
      {cartItems.map((product) => {
        return <CartItemCard key={product.product.id} product={product.product} />;
      })}
    </div>
  );
}
