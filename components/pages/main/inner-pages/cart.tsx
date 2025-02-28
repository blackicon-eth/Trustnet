"use client";

import { CartCard } from "@/components/custom-ui/cards/cart-card";
import { PageHeader } from "@/components/custom-ui/page-header";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/shadcn-ui/button";
import { usePagination } from "@/lib/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CartPage() {
  const { cart } = useCart();
  const {
    currentData: currentCart,
    Pager,
    currentPage,
    handlePageChange,
  } = usePagination(cart, 4);

  useEffect(() => {
    if (currentCart.length === 0 && currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentCart, currentPage, handlePageChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">Your Cart</h1>
        <Button
          className={cn(
            "bg-green-500 hover:bg-green-600 font-semibold",
            cart.length === 0 && "opacity-50 cursor-not-allowed"
          )}
          disabled={cart.length === 0}
        >
          Checkout
        </Button>
      </PageHeader>
      {cart.length > 0 ? (
        <div className="flex flex-col items-center justify-start gap-2.5 w-full">
          {currentCart.map((item, index) => (
            <CartCard key={item.id} index={index} loan={item} />
          ))}
          <Pager />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          className="flex flex-col h-[300px] items-center justify-center gap-1"
        >
          <p className="text-2xl font-bold">There&apos;s nothing here :(</p>
          <p className="text-sm text-muted-foreground">
            Add some items to your cart to get started!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
