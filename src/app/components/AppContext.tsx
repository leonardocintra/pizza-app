"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { MenuItemDocument } from "../models/MenuItem";

export const CartContext = createContext({});

export default function AppProvider({ children }: any) {
  const [cartItems, setCartItems] = useState<MenuItemDocument[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    console.log("robinho");

    if (ls && ls.getItem("cart")) {
      // Use ! para afirmar que ls.getItem("cart") não é null
      setCartItems(JSON.parse(ls.getItem("cart")!));
    }
  }, [ls]);

  function saveCartItemsToLocalStorage(cartItem: any) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartItems));
    }
  }

  function addToCart(item: MenuItemDocument) {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, item];
      saveCartItemsToLocalStorage(newItems);
      return newItems;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
