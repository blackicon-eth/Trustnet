import { sdk } from "@farcaster/frame-sdk";
import { useCallback, useState } from "react";
import { MESSAGE_EXPIRATION_TIME } from "@/lib/constants";
import { ContextType, useMiniAppContext } from "./use-miniapp-context";
import ky from "ky";
import { User } from "../db/schemas/db.schema";

export const useSignIn = () => {
  const { type: contextType, context } = useMiniAppContext();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!context) {
        console.log("No context found");
        return;
      }

      // Check if the user is already signed in
      try {
        const { user } = await ky
          .get("/api/auth/check")
          .json<{ user: User | null }>();
        if (user) {
          setIsSignedIn(true);
          setIsLoading(false);
          return { user, token: null };
        }
      } catch {
        console.log("User not found in cookies, signing it up...");
      }

      const isContextFarcaster = contextType === ContextType.Farcaster;

      if (isContextFarcaster && !context.user?.fid) {
        throw new Error(
          "No FID found. Please make sure you're logged into Warpcast."
        );
      }
      let result: { message: string; signature: string; address?: string };

      result = await sdk.actions.signIn({
        nonce: Math.random().toString(36).substring(2),
        notBefore: new Date().toISOString(),
        expirationTime: new Date(
          Date.now() + MESSAGE_EXPIRATION_TIME
        ).toISOString(),
      });

      const data = await ky
        .post<{ user: User; token: string }>("/api/auth/sign-in", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signature: result.signature,
            message: result.message,
            fid: context.user.fid,
          }),
        })
        .json();

      setIsSignedIn(true);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign in failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [context, contextType]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
  }, []);

  return { signIn, logout, isSignedIn, isLoading, error };
};
