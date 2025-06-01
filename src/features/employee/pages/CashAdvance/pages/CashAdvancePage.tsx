import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CashAdvanceList, MonthPickerSection } from "../components";
import { CashAdvanceType } from "@/types";
import { useEffect, useState } from "react";
import { useGetCashAdvanceByMonthEmployeeId } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAuth } from "@/features/auth";

export const CashAdvancePage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    format(new Date(), "yyyy-MM", { locale: id })
  );
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances, refetch: RefetchCashAdvances } =
    useGetCashAdvanceByMonthEmployeeId(selectedMonth, creds?.employee_id);
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);
  useEffect(() => {
    RefetchCashAdvances();
  }, [selectedMonth]);
  console.log("Month :", selectedMonth);
  console.log("Kasbon :", cashAdvances);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Pengajuan kasbon</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div className="mt-2 mx-6">
        <MonthPickerSection setSelectedMonth={setSelectedMonth} />
      </div>
      <div className="mt-2 mx-6 mb-20">
        <CashAdvanceList
          cashAdvances={cashAdvances}
          refetchCashAdvances={RefetchCashAdvances}
        />
      </div>
    </main>
  );
};
