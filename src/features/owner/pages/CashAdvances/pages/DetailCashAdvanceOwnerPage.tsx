import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailCashAdvanceSection } from "../components";
import { CashAdvanceType } from "@/types";
import { useEffect, useState } from "react";
import { useGetCashAdvanceByMonthEmployeeId } from "@/features/employee/pages/CashAdvance";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const DetailCashAdvanceOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cashAdvance = location.state.data as CashAdvanceType;
  console.log(cashAdvance);
  // GET TOTAL CASH ADVANCE
  const [employeeCashAdvances, setEmployeeCashAdvances] = useState<
    CashAdvanceType[]
  >([]);
  const { data: DataCashAdvance } = useGetCashAdvanceByMonthEmployeeId(
    format(new Date(), "yyyy-MM", { locale: id }),
    cashAdvance.employee_id
  );
  useEffect(() => {
    if (DataCashAdvance) {
      setEmployeeCashAdvances(DataCashAdvance);
    }
  });
  const totalCashAdvance = employeeCashAdvances.reduce((total, item) => {
    if (item.status === "accepted") {
      return total + item.amount;
    }
    return total;
  }, 0);
  // END FOR GET TOTAL CASH ADVANCE
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
            <h2 className="font-semibold">Detail permintaan kasbon</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <DetailCashAdvanceSection
            cashAdvance={cashAdvance}
            totalCashAdvance={totalCashAdvance}
          />
        </div>
      </div>
    </main>
  );
};
