"use client";

import dynamic from "next/dynamic";
import { FrameProvider } from "@/components/providers/farcaster-provider";
import { NavigationProvider } from "@/components/providers/navigation-provider";
import { PageContentProvider } from "@/components/providers/page-content-provider";

const ErudaProvider = dynamic(() => import("@/components/providers/eruda").then((c) => c.ErudaProvider), {
  ssr: false,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErudaProvider>
      <FrameProvider>
        <PageContentProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </PageContentProvider>
      </FrameProvider>
    </ErudaProvider>
  );
};
