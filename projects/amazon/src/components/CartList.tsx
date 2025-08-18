"use client";
import CartItemCard from "./UI/cards/CartItemCard";
import { CartContextType, useCart } from "@/contexts/CartContext";

export default function CartList() {
  const { cartItems } = useCart() as CartContextType;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center md:grid-cols-1 w-fit justify-center mx-auto">
      {cartItems.map((product) => {
        return <CartItemCard key={product.id} product={product} />;
      })}
    </div>
  );
}
