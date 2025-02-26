"use client";

import { motion } from "framer-motion";
import { House, ReceiptText, ShoppingCart, User } from "lucide-react";
import { FooterButton } from "./footer-button";
import { usePageContent } from "@/components/providers/page-content-provider";
import { PageContent } from "@/lib/enums";

const Footer = () => {
  const { pageContent, setPageContent } = usePageContent();

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex relative justify-between items-end border-t-[1px] border-[#323232] bg-black text-white py-3.5 px-5 sm:px-32">
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

        {/* Cart */}
        <FooterButton
          icon={
            <ShoppingCart
              size={24}
              className={pageContent === PageContent.CART ? "text-primary" : ""}
            />
          }
          label="Cart"
          onClick={() => setPageContent(PageContent.CART)}
        />

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
