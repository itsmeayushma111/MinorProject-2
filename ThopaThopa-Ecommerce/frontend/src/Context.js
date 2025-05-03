import { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// Create CartContext
export const CartContext = createContext();

// Create a Provider component for UserContext
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // initially no user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a Provider component for CartContext
export function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null); // initially empty cart

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
}
