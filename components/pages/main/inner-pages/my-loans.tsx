"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/custom-ui/page-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";
import { TakenLoanCard } from "@/components/custom-ui/cards/taken-loan-card";
import { mockRequestedLoans } from "@/lib/constants";
import { usePagination } from "@/lib/hooks/use-pagination";
import { GivenLoanCard } from "@/components/custom-ui/cards/given-loan-card";

export default function MyLoansPage() {
  const { currentData: currentTakenLoans, Pager } = usePagination(
    mockRequestedLoans,
    5
  );

  const { currentData: currentGivenLoans, Pager: GivenPager } = usePagination(
    mockRequestedLoans,
    4
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">Your Loans</h1>
      </PageHeader>

      <Tabs defaultValue="taken" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-card">
          <TabsTrigger
            value="taken"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent"
          >
            Taken
          </TabsTrigger>
          <TabsTrigger
            value="offered"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent"
          >
            Offered
          </TabsTrigger>
        </TabsList>
        <TabsContent value="taken" className="space-y-2">
          {mockRequestedLoans.length > 0 ? (
            <>
              {currentTakenLoans.map((loan, index) => (
                <TakenLoanCard key={loan.id} loan={loan} index={index} />
              ))}
              <Pager />
            </>
          ) : (
            <div className="flex flex-col h-[300px] items-center justify-center gap-1">
              <p className="text-sm text-muted-foreground">No loans found</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="offered" className="space-y-2">
          {mockRequestedLoans.length > 0 ? (
            <>
              {currentGivenLoans.map((loan, index) => (
                <GivenLoanCard key={loan.id} loan={loan} index={index} />
              ))}
              <GivenPager />
            </>
          ) : (
            <div className="flex flex-col h-[300px] items-center justify-center gap-1">
              <p className="text-sm text-muted-foreground">No loans found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
