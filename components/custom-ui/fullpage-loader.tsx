import { cn } from "@/lib/utils";
import { HashLoader } from "react-spinners";

interface FullPageLoaderProps {
  customLoader?: React.ReactNode;
  className?: string;
}

export const FullPageLoader = ({
  customLoader,
  className,
}: FullPageLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen items-center justify-center bg-background text-white",
        className
      )}
    >
      {customLoader || (
        <HashLoader size={45} color="#3381FF" speedMultiplier={1.3} />
      )}
    </div>
  );
};
