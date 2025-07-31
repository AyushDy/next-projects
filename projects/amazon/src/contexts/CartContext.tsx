// @ts-nocheck
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getCartItems,
  getCartSubTotal,
  saveCartItems,
  getCartCount,
} from "@/lib/Cart";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  syncWithLocalCart,
} from "@/actions/cart-actions";
import { useAuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedin } = useAuthContext();

  useEffect(() => {
    async function initializeCart(){
      if(isLoggedin){
        try{
          const result = await getUserCart();
          if(result.success){
            updateCartState(result.cart?.items || []);
          }
        }catch(err){
          console.log(err.message)
          updateCartState([]);
        }
      }else{
        const items = getCartItems();
        updateCartState(items);
      }
    }
    initializeCart();
  }, [isLoggedin]);

  useEffect(()=>{
    if(isLoggedin){
      const refreshCart = async()=>{
        try{
          const result = await getUserCart();
          if(result.success){
            updateCartState(result.cart?.items || []);
          }
        }catch (err){
          console.log("Error refershing cart : ",err.message);
        }
      }

      const timer = setTimeout(refreshCart,500);
      return ()=>clearTimeout(timer);
    }
  },[isLoggedin]);

  const updateCart = async (product, quantity = 1) => {
    try {
      const res = await addToCart(product.productId, quantity);
      if (isLoggedin && !res?.success) return res;

      const updatedCart = modifyCart(product, quantity, "add");
      if (!isLoggedin)
        return {
          success: true,
          message: "Item(s) added to cart.",
          cart: updatedCart,
        };
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleRemoveFromCart = async (product, quantity = 1) => {
    try {
      const res = await removeFromCart(product.productId, quantity);
      if (isLoggedin && !res?.success) {
        return res;
      }
      const updatedCart = modifyCart(product, quantity, "remove");

      if (!isLoggedin)
        return {
          success: true,
          message: "Item(s) removed from cart.",
          cart: updatedCart,
        };
      return res;
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Something went wrong",
      };
    }
  };

  const getItemCount = (item) => {
    const cartItem = cartItems.find((_item) => _item.id == item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const modifyCart = (product, quantity, operation = "add") => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(
      (item) => item.productId === product.productId
    );

    if (index != -1) {
      updatedCart[index].quantity += operation === "add" ? quantity : -quantity;
      if (updatedCart[index].quantity < 1) {
        updatedCart.splice(index, 1);
      }
    } else if (operation === "add") {
      updatedCart.push({ ...product, quantity });
    }
    updateCartState(updatedCart);
    return updatedCart;
  };

  const updateCartState = (newCart) => {
    setCartItems(newCart);
    setCartCount(getCartCount(newCart));
    saveCartItems(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        setCartItems,
        setCartCount,
        updateCart,
        getItemCount,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
