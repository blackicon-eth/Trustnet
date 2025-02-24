import { ReactNode } from "react";
import Header from "../custom-ui/header";
import Footer from "../custom-ui/footer/footer";
import { usePathname } from "next/navigation";

const disabledPaths = ["/test"];

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (disabledPaths.includes(pathname)) return <>{children}</>;

  // The padding top and bottom are hardcoded here because the header and footer are fixed
  return (
    <div className="pt-[68px] pb-[74px] min-h-screen bg-black transition-all duration-300">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
