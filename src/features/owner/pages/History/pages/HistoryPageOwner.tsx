import { useEffect, useState } from "react";
import { HistoryMenu, OwnerRecap } from "../components";
import { CashAdvanceType, LeaveRequestType } from "@/types";
import { useGetAllLeave } from "@/features/admin/pages/Request";
import { useGetAllCashAdvance } from "@/features/employee/pages/CashAdvance";

export const HistoryPageOwner: React.FC = () => {
  // GET REQUEST
  const [requests, setRequests] = useState<LeaveRequestType[]>([]);
  const { data: DataRequests } = useGetAllLeave();
  useEffect(() => {
    if (DataRequests) {
      setRequests(DataRequests);
    }
  }, [DataRequests]);
  // END FOR GET REQUEST

  // GET CASH ADVANCE
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances } = useGetAllCashAdvance();
  useEffect(() => {
    if (DataRequests) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);
  // END FOR GET CASH ADVANCE
  return (
    <>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <div>
        <div>
          <OwnerRecap requests={requests} cashAdvances={cashAdvances} />
        </div>
        <div>
          <HistoryMenu />
        </div>
      </div>
    </>
  );
};
