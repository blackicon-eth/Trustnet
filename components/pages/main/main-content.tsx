"use client";

import { usePageContent } from "@/components/providers/page-content-provider";
import { AnimatePresence } from "framer-motion";
import HomePage from "./inner-pages/home";
import { PageContent } from "@/lib/enums";
import CartPage from "./inner-pages/cart";
import MyLoansPage from "./inner-pages/my-loans";
import MyAccountPage from "./inner-pages/my-account";
export default function MainContent() {
  const { pageContent } = usePageContent();

  return (
    <AnimatePresence mode="wait">
      {pageContent === PageContent.HOME && <HomePage key="home" />}
      {pageContent === PageContent.CART && <CartPage key="cart" />}
      {pageContent === PageContent.MY_LOANS && <MyLoansPage key="my-loans" />}
      {pageContent === PageContent.MY_ACCOUNT && (
        <MyAccountPage key="my-account" />
      )}
    </AnimatePresence>
  );
}
