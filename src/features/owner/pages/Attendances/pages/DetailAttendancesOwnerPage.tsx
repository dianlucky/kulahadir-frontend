import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DetailAttendanceSection,
  LocationCardSection,
  PhotoSection,
  TaskEmployeeSection,
} from "../components";
import { Image, Text } from "@mantine/core";
import { AccountType, AttendanceType, DailyTaskEmployeeType } from "@/types";
import { useGetAccountById } from "@/features/admin/pages/DataMaster/Account";
import { useGetDailyTaskEmployeeByDateEmployeeId } from "@/features/employee/pages/CheckLog/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const BaseURL = import.meta.env.VITE_API_URL;

export const DetailAttendancesOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const attendance = location.state.data as AttendanceType;

  // ====================================================//
  // GET ACCOUNT
  const [account, setAccount] = useState<AccountType>();
  const { data: DataAccount } = useGetAccountById(
    attendance.schedule.employee.account_id
  );
  useEffect(() => {
    if (DataAccount) {
      setAccount(DataAccount);
    }
  }, [DataAccount]);
  // END FOR GET ACCOUNT
  // ====================================================//

  // ====================================================//
  // GET DAILY TASK EMPLOYEE
  const [dailyTask, setDailyTask] = useState<DailyTaskEmployeeType[]>([]);
  const { data: DataDailyTask } = useGetDailyTaskEmployeeByDateEmployeeId(
    format(attendance.schedule.date, "yyyy-MM-dd", { locale: id }),
    attendance.schedule.employee_id
  );
  useEffect(() => {
    if (DataDailyTask) {
      setDailyTask(DataDailyTask);
    }
  }, [DataDailyTask]);
  // END FOR GET DAILY TASK EMPLOYEE
  // ====================================================//
  return (
    <main className="mb-20">
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
            <h2 className="font-semibold">Detail kehadiran pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <section className="bg-white shadow-xs rounded-2xl mx-2 py-5 mt-2">
            <div className="flex justify-center px-2">
              <div className="">
                <Image
                  radius="30px"
                  h={40}
                  w={40}
                  src={
                    attendance.schedule.employee.profile_pic
                      ? `${BaseURL}/uploads/employees/${attendance.schedule.employee.profile_pic}`
                      : "/images/profile-default.png"
                  }
                />
              </div>
              <div className="ml-3 my-auto">
                <Text fw={700} size="18px" truncate="end">
                  {attendance.schedule.employee.name}
                </Text>
                <Text fw={300} size="xs" mt={-3}>
                  {account?.status}
                </Text>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-2 mx-6">
          <LocationCardSection attendance={attendance} />
        </div>
        <div className="mt-2 mx-6">
          <PhotoSection attendance={attendance} />
        </div>
        <div className="mt-2 mx-9">
          <DetailAttendanceSection attendance={attendance} />
        </div>
        <div className="mt-2 mx-6">
          <TaskEmployeeSection dailyTask={dailyTask} />
        </div>
      </div>
    </main>
  );
};
