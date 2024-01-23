"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { MenuItemDocument } from "../models/MenuItem";

interface CartContextProps {
  cartItems: MenuItemDocument[];
  setCartItems: React.Dispatch<React.SetStateAction<MenuItemDocument[]>>;
  addToCart: (item: MenuItemDocument) => void;
  clearCart: () => void;
  removeCartItem: (index: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

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

  function clearCart() {
    setCartItems([]);
    saveCartItemsToLocalStorage([]);
  }

  function removeCartItem(indexToRemove: number) {
    setCartItems((prev) => {
      const newCartItems = prev.filter((v, index) => index !== indexToRemove);
      saveCartItemsToLocalStorage(newCartItems);
      return newCartItems;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
          clearCart,
          removeCartItem,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
