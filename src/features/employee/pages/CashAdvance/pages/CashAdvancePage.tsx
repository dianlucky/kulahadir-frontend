import { UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CashAdvanceList, MonthPickerSection } from "../components";

export const CashAdvancePage: React.FC = () => {
  const navigate = useNavigate();
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
        <MonthPickerSection />
      </div>
      <div className="mt-2 mx-6">
        <CashAdvanceList />
      </div>
    </main>
  );
};
