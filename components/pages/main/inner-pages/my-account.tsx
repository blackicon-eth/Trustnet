"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/custom-ui/page-header";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRegisteredUser } from "@/components/providers/user-provider";
import { useSignIn } from "@/lib/hooks/use-sign-in";

export default function MyAccountPage() {
  const { logout } = useSignIn();
  const { user } = useRegisteredUser();
  const [humanityStatus, setHumanityStatus] = useState<
    "verified" | "unverified"
  >("verified");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">Your Account</h1>
      </PageHeader>
      <div className="flex flex-col items-center justify-start gap-4 mt-3 size-full">
        {/* User Info */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="text-base font-medium">Logged in as</p>
            <p className="text-base text-primary">{user?.farcasterUsername}</p>
          </div>
          <Button
            className="bg-destructive hover:bg-destructive/80"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        {/* Humanity Status */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start justify-start">
            <p className="text-base font-medium">Humanity Status</p>
            <p
              className={cn(
                "text-base",
                humanityStatus === "verified"
                  ? "text-green-500"
                  : "text-red-500"
              )}
            >
              {humanityStatus === "verified" ? "Verified" : "Unverified"}
            </p>
          </div>
          {humanityStatus === "unverified" && <Button>Verify</Button>}
        </div>
      </div>
    </motion.div>
  );
}
function useUser(): { user: any } {
  throw new Error("Function not implemented.");
}
