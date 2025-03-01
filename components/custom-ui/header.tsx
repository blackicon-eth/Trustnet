/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { Skeleton } from "../shadcn-ui/skeleton";
import { useRegisteredUser } from "../providers/user-provider";
import { usePageContent } from "../providers/page-content-provider";
import { PageContent } from "@/lib/enums";
import {
  ContextType,
  useMiniAppContext,
} from "@/lib/hooks/use-miniapp-context";
import { useCallback } from "react";
import sdk from "@farcaster/frame-sdk";

export const Header = () => {
  const { user } = useRegisteredUser();
  const { setPageContent } = usePageContent();
  const { context, type: contextType } = useMiniAppContext();

  const openWarpcastUrl = useCallback(() => {
    sdk.actions.viewProfile({
      fid: Number(user?.farcasterFid),
    });
  }, [user?.farcasterFid]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 flex flex-col w-full bg-background text-white border-b-[1px] border-[#323232] z-50 gap-1"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-5 py-3">
        <button
          onClick={() => setPageContent(PageContent.HOME)}
          className="text-3xl font-extrabold tracking-tight"
        >
          <div>
            Trust<span className="text-primary">NET</span>
          </div>
        </button>
        {user ? (
          <>
            <button
              onClick={(event) => {
                event.stopPropagation();
                if (context && contextType === ContextType.Farcaster) {
                  openWarpcastUrl();
                }
              }}
            >
              <img
                src={user.farcasterPfpUrl ?? ""}
                alt="User Profile Picture"
                width={44}
                height={44}
                className="rounded-full"
              />
            </button>
          </>
        ) : (
          <Skeleton className="h-[44px] w-[44px] rounded-full bg-skeleton" />
        )}
      </div>
    </motion.header>
  );
};

export default Header;
