import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarSection } from "../../Schedules";
import { EmployeePaidLeaveList } from "../components";

export const PaidLeavesOwnerPage: React.FC = () => {
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
            <h2 className="font-semibold">Data cuti pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <CalendarSection />
        </div>
        <div className="mt-2 mx-6">
          <EmployeePaidLeaveList />
        </div>
      </div>
    </main>
  );
};
