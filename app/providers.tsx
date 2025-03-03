"use client";

import dynamic from "next/dynamic";
import { FrameProvider } from "@/components/providers/farcaster-provider";
import { NavigationProvider } from "@/components/providers/navigation-provider";
import { PageContentProvider } from "@/components/providers/page-content-provider";
import { UserProvider } from "@/components/providers/user-provider";
import { CartProvider } from "@/components/providers/cart-provider";

const ErudaProvider = dynamic(
  () => import("@/components/providers/eruda").then((c) => c.ErudaProvider),
  {
    ssr: false,
  }
);

const CustomWagmiProvider = dynamic(
  () => import("@/lib/wagmi/custom-wagmi-provider").then((c) => c.default),
  {
    ssr: false,
  }
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErudaProvider>
      <CustomWagmiProvider>
        <FrameProvider>
          <UserProvider>
            <CartProvider>
              <PageContentProvider>
                <NavigationProvider>{children}</NavigationProvider>
              </PageContentProvider>
            </CartProvider>
          </UserProvider>
        </FrameProvider>
      </CustomWagmiProvider>
    </ErudaProvider>
  );
};
