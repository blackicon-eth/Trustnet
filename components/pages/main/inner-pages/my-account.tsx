"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/custom-ui/page-header";
import { Button } from "@/components/shadcn-ui/button";
import { useRegisteredUser } from "@/components/providers/user-provider";
import { useSignIn } from "@/lib/hooks/use-sign-in";
import Link from "next/link";
import { toast } from "sonner";
import ky from "ky";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function MyAccountPage() {
  const { logout } = useSignIn();
  const { user, refetchUser } = useRegisteredUser();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyHumanity = async () => {
    try {
      setIsVerifying(true);
      const { updated } = await ky
        .put<{ updated: boolean }>("/api/humanity")
        .json();
      if (updated) {
        await refetchUser();
        toast.success("Humanity verified!");
      } else {
        toast.error("No humanity credential found :(");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying humanity");
    } finally {
      setIsVerifying(false);
    }
  };

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
            className="bg-destructive hover:bg-destructive/80 w-[90px]"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        {/* Humanity Status */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start justify-start">
            <Link
              href="https://docs.humanity.org/"
              target="_blank"
              className="text-base font-medium underline"
            >
              Humanity Status
            </Link>
            {user?.isHumanityVerified === 0 && (
              <p className="text-base text-red-500">Unverified</p>
            )}
          </div>
          {user?.isHumanityVerified === 0 ? (
            <Button
              className="w-[90px]"
              onClick={handleVerifyHumanity}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>
          ) : (
            <p className="text-lg font-semibold text-green-500">Verified! ✨</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
