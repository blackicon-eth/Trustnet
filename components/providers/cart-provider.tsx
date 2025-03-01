import { RequestedLoan } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export type CartContextType = {
  cart: RequestedLoan[];
  totalAmount: number;
  averageInterest: number;
  averageCollateral: number;
  addItem: (item: RequestedLoan) => void;
  removeItem: (item: RequestedLoan) => void;
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

  const averageInterest = useMemo(() => {
    return (
      cart.reduce((acc, loan) => acc + loan.interestPercentage, 0) / cart.length
    );
  }, [cart]);

  const averageCollateral = useMemo(() => {
    return (
      cart.reduce((acc, loan) => acc + loan.collateralPercentage, 0) /
      cart.length
    );
  }, [cart]);

  const addItem = useCallback((loan: RequestedLoan) => {
    setCart((prevCart) => [...prevCart, loan]);
    setTotalAmount((prevTotalAmount) => prevTotalAmount + loan.amount);
  }, []);

  const removeItem = useCallback((loan: RequestedLoan) => {
    setCart((prevCart) => prevCart.filter((b) => b.id !== loan.id));
    setTotalAmount((prevTotalAmount) => prevTotalAmount - loan.amount);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        averageInterest,
        averageCollateral,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
