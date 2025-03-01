import { createConfig, http } from "wagmi";
import { baseSepolia } from "viem/chains";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

const chains = [baseSepolia] as const;

export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
  connectors: [farcasterFrame()],
});
