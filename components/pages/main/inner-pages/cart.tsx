"use client";

import { RequestedLoanCard } from "@/components/custom-ui/requested-loan-card";
import { useCart } from "@/components/providers/cart-provider";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold w-full align-top">Your Cart</h1>
      </div>
      {cart.length > 0 ? (
        <div className="flex flex-col items-center justify-start gap-2.5 w-full">
          {cart.map((item) => (
            <RequestedLoanCard key={item.id} index={0} loan={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-[300px] items-center justify-center gap-1">
          <p className="text-2xl font-bold">There&apos;s nothing here :(</p>
          <p className="text-sm text-muted-foreground">
            Add some items to your cart to get started!
          </p>
        </div>
      )}
    </motion.div>
  );
}
