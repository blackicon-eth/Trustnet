"use client";

import { RequestedLoanCard } from "@/components/custom-ui/requested-loan-card";
import { useRegisteredUser } from "@/components/providers/user-provider";
import {
  ContextType,
  useMiniAppContext,
} from "@/lib/hooks/use-miniapp-context";
import { motion } from "framer-motion";

const mockRequestedLoans = [
  {
    id: 1,
    userFid: 215293,
    title: "Car Loan",
    description: "I want to take this loan to buy a new car!! :)",
    loanImageUrl: "https://picsum.photos/200/300",
    amount: 1000,
    collateralPercentage: 90,
    interestPercentage: 10,
    deadline: 1754435200, // unix timestamp 1 month from now
  },
  {
    id: 2,
    userFid: 215293,
    title: "House Loan",
    description: "I want to take this loan to buy a new house",
    loanImageUrl: "https://picsum.photos/200/300",
    amount: 1000,
    collateralPercentage: 95,
    interestPercentage: 15,
    deadline: 1757435200, // unix timestamp 1 month from now
  },
  {
    id: 3,
    userFid: 215293,
    title: "Builder Loan",
    description: "I want to take this loan to build a new web 3 project",
    loanImageUrl: "https://picsum.photos/200/300",
    amount: 5500,
    collateralPercentage: 86,
    interestPercentage: 12,
    deadline: 1759435200, // unix timestamp 1 month from now
  },
];

export default function HomePage() {
  const { type: contextType, context, actions } = useMiniAppContext();
  const { user } = useRegisteredUser();

  const handlePresave = async () => {
    if (contextType === ContextType.Farcaster) {
      if (!context.client.added && actions) {
        await actions.addFrame();
        // add to db
      }
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
      <h1 className="text-2xl font-bold w-full align-top">Available Loans</h1>
      <div className="flex flex-col items-center justify-start gap-2.5 w-full">
        {mockRequestedLoans.map((loan, index) => (
          <RequestedLoanCard key={loan.id} index={index} loan={loan} />
        ))}
      </div>
    </motion.div>
  );
}
