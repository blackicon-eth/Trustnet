/* eslint-disable @next/next/no-img-element */
import { User } from "@/lib/db/schemas/db.schema";
import { cn, formatUnixTimestamp } from "@/lib/utils";
import { motion } from "framer-motion";
import ky from "ky";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import sdk from "@farcaster/frame-sdk";
import {
  ContextType,
  useMiniAppContext,
} from "@/lib/hooks/use-miniapp-context";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import { Button } from "@/components/shadcn-ui/button";
import { RequestedLoan } from "@/lib/types";

interface GivenLoanCardProps {
  loan: RequestedLoan;
  index: number;
}

export const GivenLoanCard = ({ loan, index }: GivenLoanCardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { type: contextType, context } = useMiniAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true);
      const { user } = await ky
        .get<{ user: User | null }>(`/api/user/${loan.userFid}`)
        .json();
      if (user) {
        setUser(user);
      }
      setIsLoadingUser(false);
    };

    fetchUser();
  }, [loan.userFid]);

  const openWarpcastUrl = useCallback(() => {
    sdk.actions.viewProfile({
      fid: loan.userFid,
    });
  }, [loan.userFid]);

  return (
    <motion.div
      key={loan.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="w-full"
    >
      <Drawer>
        <DrawerTrigger asChild>
          <button className="flex items-start justify-start border-[1px] w-full h-full border-card/20 rounded-lg">
            <img
              src={loan.loanImageUrl}
              alt="Loan Image"
              className="w-auto h-[90px] rounded-bl-lg rounded-tl-lg object-cover"
            />
            <div className="flex flex-col gap-1.5 px-2.5 py-1.5 w-full h-[90px] justify-start bg-card hover:bg-card/80 transition-all duration-150 rounded-br-lg rounded-tr-lg items-start">
              <div className="flex items-center justify-between w-full">
                <p className="text-lg font-semibold">
                  {loan.title.length > 12
                    ? loan.title.slice(0, 12) + "..."
                    : loan.title}
                </p>
                {isLoadingUser ? (
                  <Skeleton className="w-32 h-5 rounded-lg bg-skeleton" />
                ) : (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      if (context && contextType === ContextType.Farcaster) {
                        openWarpcastUrl();
                      }
                    }}
                    className="flex justify-start items-center text-sm gap-1"
                  >
                    <p className="text-sm underline">
                      {user?.farcasterUsername}
                    </p>
                    <div className="relative">
                      <img
                        src={user?.farcasterPfpUrl ?? ""}
                        alt="User PFP"
                        className="w-5 h-5 rounded-full"
                      />
                      {user?.isHumanityVerified === 1 && (
                        <img
                          src="/images/humanity_logo.png"
                          alt="Humanity Logo"
                          className="w-3 h-3 rounded-full absolute -top-1 -right-1"
                        />
                      )}
                    </div>
                  </button>
                )}
              </div>
              <div className="flex flex-col size-full justify-start items-start">
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm">{loan.amount} USDC</p>
                  <p className="text-sm">{loan.collateralPercentage}% Coll.</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm">
                    {formatUnixTimestamp(loan.deadline)}
                  </p>
                  <p className="text-sm">
                    <span className="text-green-400">
                      {loan.interestPercentage}%
                    </span>{" "}
                    Int.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent
          handleClassName="bg-card"
          className="h-[90%] bg-foreground border-card text-white"
        >
          <DrawerTitle className="hidden" />
          <DrawerDescription className="hidden" />
          <div className="flex flex-col justify-between items-center size-full pb-5 pt-4 gap-3">
            <div className="flex flex-col gap-1 w-full">
              <div className="relative w-full h-[90px]">
                <img
                  src={loan.loanImageUrl}
                  alt="Loan Image"
                  className="w-full h-[90px] object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  {isLoadingUser ? (
                    <Skeleton className="w-32 h-5 rounded-lg bg-skeleton" />
                  ) : (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        if (context && contextType === ContextType.Farcaster) {
                          openWarpcastUrl();
                        }
                      }}
                      className="flex justify-start items-center text-sm gap-1"
                    >
                      <p className="text-base">Given to</p>
                      <p className="text-base underline">
                        {user?.farcasterUsername}
                      </p>
                      <img
                        src={user?.farcasterPfpUrl ?? ""}
                        alt="User PFP"
                        className="w-5 h-5 rounded-full"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full p-3 gap-9">
                <div className="flex flex-col">
                  <p className="text-xl font-bold pb-3">{loan.title}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-base">Amount</p>
                    <p className="text-base">{loan.amount} USDC</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-base">Collateral</p>
                    <p className="text-base">{loan.collateralPercentage}%</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-base">Interest</p>
                    <p className="text-base text-green-400">
                      {loan.interestPercentage}%
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-base">Deadline</p>
                    <p className="text-base">
                      {formatUnixTimestamp(loan.deadline)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-base">Humanity</p>
                    <p
                      className={cn(
                        "text-base",
                        user?.isHumanityVerified === 1
                          ? "text-green-400"
                          : "text-red-400"
                      )}
                    >
                      {user?.isHumanityVerified === 1
                        ? "Verified! ✨"
                        : "Unverified"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">Description</p>
                  <p className="text-sm">{loan.description}</p>
                </div>
              </div>
            </div>
            <Button className="w-[90%] font-semibold bg-destructive hover:bg-destructive/80">
              Close Loan
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
};
