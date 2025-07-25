import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DailyTaskMenu, TodayTaskSection } from "../components";
import { DailyTaskEmployeeType } from "@/types";
import { useGetDailyTaskEmployeeByDate } from "../api/getDailyTaskEmployee";
import { format, subDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const DailyTaskPageOwner: React.FC = () => {
  const navigate = useNavigate();

  // DATE FORMATTER TIME
  const getEffectiveDate = () => {
    const makassarTime = toZonedTime(new Date(), "Asia/Makassar");
    const hour = makassarTime.getHours();

    if (hour < 3) {
      const yesterday = subDays(makassarTime, 1);
      return format(yesterday, "yyyy-MM-dd");
    }

    return format(makassarTime, "yyyy-MM-dd");
  };
  const formattedDate = getEffectiveDate();
  // END FOR DATE FORMATTER TIME

  // DATEPICKER STATE
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(formattedDate)
  );
  // ENDFOR DATEPICKER STATE

  // GET DAILY TASK EMPLOYEE
  const [dailyTask, setDailyTask] = useState<DailyTaskEmployeeType[]>([]);
  const { data: DataDailyTask, isLoading: LoadingDailyTaskEmployee } =
    useGetDailyTaskEmployeeByDate(
      format(
        new Date(selectedDate ? selectedDate : formattedDate),
        "yyyy-MM-dd"
      )
    );
  useEffect(() => {
    if (DataDailyTask) {
      setDailyTask(DataDailyTask);
    }
  }, [DataDailyTask]);
  console.log("Data :", dailyTask);
  // END FOR GET DAILY TASK EMPLOYEE
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
            <h2 className="font-semibold">Tugas Pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <section className="mt-2 px-6">
        <DailyTaskMenu />
      </section>
      <section className="mt-4 px-5 mb-20">
        <TodayTaskSection
          dailyTask={dailyTask}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          formattedDate={formattedDate}
          LoadingDailyTaskEmployee={LoadingDailyTaskEmployee}
        />
      </section>
    </main>
  );
};
