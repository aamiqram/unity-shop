// context/CartContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("unityCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("unityCart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedVariant === product.selectedVariant,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedVariant === product.selectedVariant
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, variant, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedVariant === variant
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeItem = (id, variant) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedVariant === variant),
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.priceMin * item.quantity,
    0,
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
