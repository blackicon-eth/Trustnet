import { RequestedLoan } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export type CartContextType = {
  cart: RequestedLoan[];
  totalAmount: number;
  addLoan: (loan: RequestedLoan) => void;
  removeLoan: (loan: RequestedLoan) => void;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<RequestedLoan[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addLoan = useCallback((loan: RequestedLoan) => {
    setCart((prevCart) => [...prevCart, loan]);
    setTotalAmount((prevTotalAmount) => prevTotalAmount + loan.amount);
  }, []);

  const removeLoan = useCallback((loan: RequestedLoan) => {
    setCart((prevCart) => prevCart.filter((b) => b.id !== loan.id));
    setTotalAmount((prevTotalAmount) => prevTotalAmount - loan.amount);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        addLoan,
        removeLoan,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
