import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailCashAdvanceSection } from "../components";
import { CashAdvanceType } from "@/types";
export const DetailCashAdvancePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cashAdvance = location.state as CashAdvanceType;
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="grid grid-cols-12 mb-1">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Detail kasbon</h2>
          </div>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg mt-2 mx-5">
        <DetailCashAdvanceSection cashAdvance={cashAdvance} />
      </section>
    </main>
  );
};
