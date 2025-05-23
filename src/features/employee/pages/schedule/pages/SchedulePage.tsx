import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DailyCalendar, DailySchedule } from "../components";
import { useEffect, useState } from "react";
import { ScheduleType } from "@/types";
import { useGetSchedule } from "../api";

export const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataOff } = useGetSchedule(1);
  useEffect(() => {
    if (DataOff) {
      setSchedule(DataOff);
    }
  }, [DataOff]);
  console.log(schedule?.date);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="grid grid-cols-12">
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
            <h2 className="font-semibold">Jadwal bulanan</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <DailyCalendar />

      <DailySchedule />
    </main>
  );
};
