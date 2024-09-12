"use client";
import StatusCard from "@/components/pages/Invest-page/status-card/StatusCard";
import { getAllInvests } from "@/dataFetching/invest";

import useSWR from "swr";
const investFetcher = () => getAllInvests();
const InvestmentStatus = ({ totalInvestmentAmount }) => {
  const { data: investments, error, mutate } = useSWR("/invest", investFetcher);

  const investmentData = investments?.data;

  let totalInvestors = 0;

  let monthlyReturn = 0;
  let totalReturn = 0;

  if (investmentData?.length > 0) {
    for (const investment of investmentData) {
      totalInvestors += 1;

      monthlyReturn += investment.monthlyReturn || 0;
      totalReturn += investment.totalReturn || 0;
    }
  }

  return (
    <div>
      <StatusCard
        totalInvestors={totalInvestors.toLocaleString()}
        totalInvestmentAmount={totalInvestmentAmount}
        monthlyReturn={monthlyReturn.toLocaleString()}
        totalReturn={totalReturn.toLocaleString()}
      />
    </div>
  );
};

export default InvestmentStatus;
