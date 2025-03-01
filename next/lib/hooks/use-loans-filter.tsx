import { useEffect, useState } from "react";
import { Filters, RequestedLoan } from "../types";

const filterLoans = (loans: RequestedLoan[], filters: Filters) => {
  return loans.filter((loan) => {
    const { deadline, amount, collateralPercentage, interestPercentage } = loan;
    return (
      (!filters.minDeadline || deadline >= filters.minDeadline) &&
      (!filters.maxDeadline || deadline <= filters.maxDeadline) &&
      (!filters.minAmount || amount >= filters.minAmount) &&
      (!filters.maxAmount || amount <= filters.maxAmount) &&
      (!filters.minCollateral ||
        collateralPercentage >= filters.minCollateral) &&
      (!filters.maxCollateral ||
        collateralPercentage <= filters.maxCollateral) &&
      (!filters.minInterest || interestPercentage >= filters.minInterest) &&
      (!filters.maxInterest || interestPercentage <= filters.maxInterest)
    );
  });
};

export const useLoansFilter = (loans: RequestedLoan[], filters: Filters) => {
  const [filteredLoans, setFilteredLoans] = useState(
    filterLoans(loans, filters)
  );

  useEffect(() => {
    setFilteredLoans(filterLoans(loans, filters));
  }, [filters, loans]);

  return { filteredLoans };
};
