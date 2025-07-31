//@ts-nocheck
"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useTransition } from "react";
import Toaster from "../Toaster";
import Spinner from "@/components/skeletons/Spinner";

export default function AddToCartButton({ product }) {
  const { getItemCount, updateCart, handleRemoveFromCart } = useCart();
  const itemCount = getItemCount(product);
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await updateCart(product);
      setStatus(res.message);
      setShowToast(true);
    });
  };

  const handleRemove = async () => {
    startTransition(async () => {
      const res = await handleRemoveFromCart(product);
      setStatus(res.message);
      setShowToast(true);
    });
  };

  return (
    <>
      {showToast && (
        <Toaster text={status} onClose={() => setShowToast(false)} />
      )}
      {itemCount ? (
        <div className="flex bg-[#161616] text-white items-center rounded-3xl">
          <button
            className=" hover:bg-[#373636] cursor-pointer px-4 w-full text-white py-2 rounded-3xl"
            onClick={handleAddToCart}
            disabled={isPending}
          >
            +
          </button>
          <p className="">{isPending ? <Spinner /> : itemCount}</p>
          <button
            className=" hover:bg-[#373636] cursor-pointer px-4 w-full text-white py-2 rounded-3xl"
            onClick={handleRemove}
            disabled={isPending}
          >
            -
          </button>
        </div>
      ) : (
       
         <button
          className="bg-[#161616] flex justify-center hover:bg-[#373636] cursor-pointer px-4 w-full text-white py-2 rounded-4xl "
          onClick={handleAddToCart}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Add To Cart"}
        </button>
       )}
    </>
  );
}
