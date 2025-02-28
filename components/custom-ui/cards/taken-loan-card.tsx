/* eslint-disable @next/next/no-img-element */
import { formatUnixTimestamp } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import { Button } from "@/components/shadcn-ui/button";
import { RequestedLoan } from "@/lib/types";

interface TakenLoanCardProps {
  loan: RequestedLoan;
  index: number;
}

export const TakenLoanCard = ({ loan, index }: TakenLoanCardProps) => {
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
              className="h-[65px] w-[75px] rounded-bl-lg rounded-tl-lg object-cover"
            />
            <div className="flex flex-col gap-1 px-2.5 py-1.5 w-full h-[65px] justify-start bg-card hover:bg-card/80 transition-all duration-150 rounded-br-lg rounded-tr-lg items-start">
              <div className="flex items-center justify-between w-full">
                <p className="text-lg font-semibold">
                  {loan.title.length > 12
                    ? loan.title.slice(0, 12) + "..."
                    : loan.title}
                </p>
                <p className="text-sm">{loan.amount} USDC</p>
              </div>
              <div className="flex flex-col size-full justify-start items-start">
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm">
                    {loan.collateralPercentage}% @{" "}
                    <span className="text-green-400">
                      {loan.interestPercentage}%
                    </span>{" "}
                  </p>
                  <p className="text-sm">
                    {formatUnixTimestamp(loan.deadline)}
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
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">Description</p>
                  <p className="text-sm">{loan.description}</p>
                </div>
              </div>
            </div>
            <Button className="w-[90%] font-semibold bg-primary hover:bg-primary/80">
              Repay Loan
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
};
