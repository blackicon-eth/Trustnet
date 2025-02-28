"use client";

import { RequestedLoanCard } from "@/components/custom-ui/requested-loan-card";
import { motion } from "framer-motion";
import { useState } from "react";
import { mockRequestedLoans } from "@/lib/constants";
import { usePagination } from "@/lib/hooks/use-pagination";
import { FiltersButton } from "@/components/custom-ui/filters-button";
import { useLoansFilter } from "@/lib/hooks/use-loans-filter";
import { PageHeader } from "@/components/custom-ui/page-header";

export default function HomePage() {
  const [filters, setFilters] = useState({
    minDeadline: 1604435200,
    maxDeadline: 1914435200,
    minAmount: 10,
    maxAmount: 100000,
    minCollateral: 50,
    maxCollateral: 100,
    minInterest: 5,
    maxInterest: 30,
  });
  const { filteredLoans } = useLoansFilter(mockRequestedLoans, filters);
  const { currentData: currentLoans, Pager } = usePagination(filteredLoans, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start size-full p-4 gap-3.5"
    >
      <PageHeader>
        <h1 className="text-2xl font-bold w-full align-top">Available Loans</h1>
        <FiltersButton filters={filters} setFilters={setFilters} />
      </PageHeader>
      {filteredLoans.length > 0 ? (
        <>
          <div className="flex flex-col items-center justify-start gap-2.5 w-full">
            {currentLoans.map((loan, index) => (
              <RequestedLoanCard key={loan.id} index={index} loan={loan} />
            ))}
          </div>
          <Pager />
        </>
      ) : (
        <div className="flex flex-col h-[300px] items-center justify-center gap-1">
          <p className="text-2xl font-bold">No loans found :(</p>
          <p className="text-sm text-muted-foreground">
            Try changing the filters or come back later!
          </p>
        </div>
      )}
    </motion.div>
  );
}
