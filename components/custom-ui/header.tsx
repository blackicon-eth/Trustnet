"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Skeleton } from "../shadcn-ui/skeleton";

export const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 flex flex-col w-full bg-black text-white border-b-[1px] border-[#323232] z-50 gap-1"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-5 py-3">
        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          <div>
            Trust<span className="text-primary">NET</span>
          </div>
        </Link>
        <Skeleton className="h-[44px] w-[44px] rounded-full bg-white/20" />
      </div>
    </motion.header>
  );
};

export default Header;
