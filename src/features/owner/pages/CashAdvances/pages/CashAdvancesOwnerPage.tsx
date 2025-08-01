import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CashAdvanceList } from "../components";
import { useEffect, useState } from "react";
import { CashAdvanceType } from "@/types";
import { useGetAllCashAdvance } from "@/features/employee/pages/CashAdvance";

export const CashAdvanceOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances } = useGetAllCashAdvance();
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);
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
            <h2 className="font-semibold">Permintaan kasbon</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <CashAdvanceList cashAdvances={cashAdvances} />
        </div>
      </div>
    </main>
  );
};
