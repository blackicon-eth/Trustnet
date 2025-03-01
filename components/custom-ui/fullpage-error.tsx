import { cn } from "@/lib/utils";
import React from "react";

interface FullPageErrorProps {
  className?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}

export const FullPageError = ({
  className,
  errorMessage,
  children,
}: FullPageErrorProps) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen items-center justify-center bg-background px-6 text-center gap-2",
        className
      )}
    >
      {errorMessage && (
        <>
          <p className="text-white text-2xl">Uh oh! 😞</p>
          <p className="text-red-500">{errorMessage}</p>
        </>
      )}
      {children}
    </div>
  );
};
