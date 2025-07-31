//@ts-nocheck

"use client"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext";

export default function CartIcon(){
    const { cartCount } = useCart();

    return (
        <>
         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 hover:cursor-pointer" />
        </>
    )
}