import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetStatsOfOutgoingDataDailyByMonth } from "../../../OutgoingStock";
import { format } from "date-fns";

export const MonthlyOutgoingItemStats: React.FC = () => {
  const { pathname } = useLocation();
  const isFrozen = pathname.includes("frozen");
  // Get statistic of outgoing data daily per month
  const [monthlyData, setMonthlyData] = useState<MonthlyOutgoingItemStats[]>(
    []
  );
  const { data: MonthlyData, isLoading: LoadingMonthlyData } =
    useGetStatsOfOutgoingDataDailyByMonth(
      isFrozen ? "Frozen" : "!Frozen",
      format(new Date(), "yyyy-MM")
    );
  useEffect(() => {
    if (MonthlyData) {
      setMonthlyData(MonthlyData);
    } else {
      setMonthlyData([]);
    }
  });
  // End for get statistic of outgoing data daily per month
  return <></>;
};
