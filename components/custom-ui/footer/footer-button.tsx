import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FooterButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  label: string;
  className?: string;
  textClassName?: string;
}

export const FooterButton = ({ icon, label, onClick, className, textClassName }: FooterButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn("flex flex-col gap-1.5 w-[73px] justify-center items-center", className)}
    >
      {icon}
      <p className={cn("text-[11px] font-bold", textClassName)}>{label}</p>
    </motion.button>
  );
};
