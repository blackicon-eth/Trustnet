import { useFrame } from "../components/farcaster-provider";
import { FrameContext } from "@farcaster/frame-core/dist/context";
import sdk from "@farcaster/frame-sdk";

export enum ContextType {
  Farcaster = "farcaster",
}

// Define specific types for each context
interface FarcasterContextResult {
  type: ContextType.Farcaster;
  context: FrameContext;
  actions: typeof sdk.actions | null;
}

interface NoContextResult {
  type: null;
  context: null;
  actions: null;
}

// Union type of all possible results
type ContextResult = FarcasterContextResult | NoContextResult;

export const useMiniAppContext = (): ContextResult => {
  // Try to get Farcaster context
  try {
    const farcasterContext = useFrame();
    if (farcasterContext.context) {
      return {
        type: ContextType.Farcaster,
        context: farcasterContext.context,
        actions: farcasterContext.actions,
      } as FarcasterContextResult;
    } else {
      throw new Error("No context found");
    }
  } catch (e) {
    return {
      type: null,
      context: null,
      actions: null,
    } as NoContextResult;
  }
};
