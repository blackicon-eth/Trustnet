"use client";

import { CartCard } from "@/components/custom-ui/cards/cart-card";
import { PageHeader } from "@/components/custom-ui/page-header";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/shadcn-ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import { usePagination } from "@/lib/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CartPage() {
  const { cart, totalAmount, averageCollateral, averageInterest } = useCart();
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className={cn(
                "bg-green-500 hover:bg-green-600 font-semibold",
                cart.length === 0 && "opacity-50 cursor-not-allowed"
              )}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </DrawerTrigger>
          <DrawerContent
            handleClassName="bg-card"
            className="h-[90%] bg-foreground border-card text-white"
          >
            <DrawerTitle className="hidden" />
            <DrawerDescription className="hidden" />
            <div className="px-4 pt-4 pb-5 flex flex-col justify-between size-full">
              <div className="flex flex-col gap-7">
                <p className="text-2xl font-semibold w-full text-center">
                  Checkout 💸
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Total</p>
                    <p className="text-lg font-medium">${totalAmount}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Loans #</p>
                    <p className="text-lg font-medium">{cart.length}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Average Interest</p>
                    <p className="text-lg font-medium">{averageInterest}%</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Average Collateral</p>
                    <p className="text-lg font-medium">{averageCollateral}%</p>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Finance Loan{cart.length > 1 ? "s" : ""}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
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
