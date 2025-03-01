"use client";

import { motion } from "framer-motion";
import {
  House,
  ReceiptText,
  ShoppingCart,
  SquarePlus,
  User,
} from "lucide-react";
import { FooterButton } from "./footer-button";
import { usePageContent } from "@/components/providers/page-content-provider";
import { PageContent } from "@/lib/enums";
import { useCart } from "@/components/providers/cart-provider";

const Footer = () => {
  const { pageContent, setPageContent } = usePageContent();
  const { cart } = useCart();
  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex relative justify-between items-end border-t-[1px] border-[#323232] bg-background text-white py-3.5 px-5 sm:px-32">
        {/* Home */}
        <FooterButton
          icon={
            <House
              size={24}
              className={pageContent === PageContent.HOME ? "text-primary" : ""}
            />
          }
          label="Home"
          onClick={() => setPageContent(PageContent.HOME)}
        />

        {/* My Loans */}
        <FooterButton
          icon={
            <ReceiptText
              size={24}
              className={
                pageContent === PageContent.MY_LOANS ? "text-primary" : ""
              }
            />
          }
          label="My Loans"
          onClick={() => setPageContent(PageContent.MY_LOANS)}
        />

        {/* New Loan */}
        <FooterButton
          icon={
            <SquarePlus
              size={24}
              className={
                pageContent === PageContent.NEW_LOAN ? "text-primary" : ""
              }
            />
          }
          label="New Loan"
          onClick={() => setPageContent(PageContent.NEW_LOAN)}
        />

        {/* Cart */}
        <div className="relative">
          <FooterButton
            icon={
              <ShoppingCart
                size={24}
                className={
                  pageContent === PageContent.CART ? "text-primary" : ""
                }
              />
            }
            label="Cart"
            onClick={() => setPageContent(PageContent.CART)}
          />
          {cart.length > 0 && (
            <div className="absolute -top-1 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <p className="text-xs font-bold">{cart.length}</p>
            </div>
          )}
        </div>

        {/* My Account */}
        <FooterButton
          icon={
            <User
              size={24}
              className={
                pageContent === PageContent.MY_ACCOUNT ? "text-primary" : ""
              }
            />
          }
          label="My Account"
          onClick={() => setPageContent(PageContent.MY_ACCOUNT)}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
