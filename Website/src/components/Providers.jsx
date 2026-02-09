"use client";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }) {
  // seed with one item to mirror your original dropdown
  const seed = [
    { id: "apple", name: "Apple Juice", price: 250, quantity: 1, thumbnail: "/images/thumb/thumb_apple.png" }
  ];
  return <CartProvider initial={seed}>{children}</CartProvider>;
}
