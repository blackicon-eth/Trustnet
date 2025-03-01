"use client";

import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";

function CustomWagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}

export default CustomWagmiProvider;
