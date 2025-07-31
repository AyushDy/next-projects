"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react"

export default function LogoutButton(){
    const {handleLogout} = useAuthContext() as any;
    const { setCartCount, setCartItems } = useCart() as any;

    function handleClick(){
      handleLogout();
      setCartItems([]);
      setCartCount(0);
    }

    return (
        <button
         onClick={handleClick}
        className="border border-gray-300/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100 hover:text-gray-800 transition-colors"
      >
        Logout
      </button>
    )
}