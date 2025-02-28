"use client";

import { usePageContent } from "@/components/providers/page-content-provider";
import { AnimatePresence } from "framer-motion";
import HomePage from "./inner-pages/home";
import { PageContent } from "@/lib/enums";
import CartPage from "./inner-pages/cart";

export default function MainContent() {
  const { pageContent } = usePageContent();

  return (
    <AnimatePresence mode="wait">
      {pageContent === PageContent.HOME && <HomePage key="home" />}
      {pageContent === PageContent.CART && <CartPage key="cart" />}
    </AnimatePresence>
  );
}
