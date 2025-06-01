import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarSection, EmployeePaidLeaveList } from "../components";
import { format } from "date-fns";
import { ScheduleType } from "@/types";
import {
  useGetScheduleByDateStatus,
  useGetScheduleByMonthAll,
} from "@/features/admin/pages/Schedule";
import { id } from "date-fns/locale";

export const PaidLeavesOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd")
  );

  // GET FOR RENDER INDICATOR
  const [indicatorOff, setIndicatorOff] = useState<ScheduleType[]>([]);
  const { data: DataIndicatorOff, refetch: RefetchIndicator } =
    useGetScheduleByMonthAll(
      format(date ? date : new Date(), "yyyy-MM", { locale: id })
    );
  useEffect(() => {
    if (DataScheduleOff) {
      setIndicatorOff(DataIndicatorOff);
    }
  }, [DataIndicatorOff]);
  // console.log("Schedule : ", indicatorOff);
  // GET FOR RENDER INDICATOR

  // GET PAIDLEAVE DAILY
  const [scheduleOff, setScheduleOff] = useState<ScheduleType[]>([]);
  const { data: DataScheduleOff, refetch: RefetchPaidLeaveDaily } =
    useGetScheduleByDateStatus(date, "off");
  useEffect(() => {
    if (DataScheduleOff) {
      setScheduleOff(DataScheduleOff);
    }
  }, [DataScheduleOff]);
  // GET PAIDLEAVE DAILY
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
          <CalendarSection setDate={setDate} indicatorOff={indicatorOff} />
        </div>
        <div className="-mt-2 mx-6 mb-20">
          <EmployeePaidLeaveList
            date={date}
            schedulesOff={scheduleOff}
            refetchSchedule={RefetchIndicator}
            refetchPaidLeaveDaily={RefetchPaidLeaveDaily}
          />
        </div>
      </div>
    </main>
  );
};
