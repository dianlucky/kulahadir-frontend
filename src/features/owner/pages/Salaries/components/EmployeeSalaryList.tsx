import { ScheduleType } from "@/types";
import { Button, Divider, Image, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL;
interface EmployeeSalaryListProps {
  employees?: ScheduleType[];
  month: string;
}

export const EmployeeSalaryList: React.FC<EmployeeSalaryListProps> = ({
  employees,
  month,
}) => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Data pegawai
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      {employees?.length !== 0 && (
        <div className="mt-2">
          <div className="mx-4">
            <Divider
              label="Pegawai tetap"
              labelPosition="center"
              style={{ marginBottom: "4px" }}
            />
          </div>
          {employees
            ?.filter((data) => data.employee.account.status == "Pegawai tetap")
            .map((data, index) => (
              <button
                className="w-full"
                style={{ marginTop: "-3px" }}
                key={index}
                onClick={() => {
                  navigate("/employee-salary/detail", {
                    state: {
                      data: { employee: data.employee, month: month },
                    },
                  });
                }}
              >
                <div className="w-full bg-slate-50 shadow-sm rounded-2xl px-2">
                  <div className="grid grid-cols-12 p-2 mb-2">
                    <div className="col-span-2 m-auto">
                      <Image
                        radius="30px"
                        h={40}
                        w={40}
                        src={
                          data.employee.profile_pic
                            ? `${BaseURL}/uploads/employees/${data.employee.profile_pic}`
                            : `/images/profile-default.png`
                        }
                      />
                    </div>
                    <div className="col-span-9 ml-2">
                      <div className="text-start">
                        <Text fw={700} size="md" truncate="end">
                          {data.employee.name}
                        </Text>
                      </div>
                      <div className="">
                        <Divider />
                      </div>
                      <div className="text-start">
                        <Text fw={400} size="xs">
                          {data.employee.account.status}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}
      {employees?.length !== 0 && (
        <div className="mt-2">
          <div className="mx-4">
            <Divider
              label="Part time"
              labelPosition="center"
              style={{ marginBottom: "4px" }}
            />
          </div>
          {employees
            ?.filter((data) => data.employee.account.status == "Part time")
            .map((data, index) => (
              <button
                className="w-full"
                style={{ marginTop: "-3px" }}
                key={index}
                onClick={() => {
                  navigate("/employee-salary/detail", {
                    state: {
                      data: { employee: data.employee, month: month },
                    },
                  });
                }}
              >
                <div className="w-full bg-slate-50 shadow-sm rounded-2xl px-2">
                  <div className="grid grid-cols-12 p-2 mb-2">
                    <div className="col-span-2 m-auto">
                      <Image
                        radius="30px"
                        h={40}
                        w={40}
                        src={
                          data.employee.profile_pic
                            ? `${BaseURL}/uploads/employees/${data.employee.profile_pic}`
                            : `/images/profile-default.png`
                        }
                      />
                    </div>
                    <div className="col-span-9 ml-2">
                      <div className="text-start">
                        <Text fw={700} size="md" truncate="end">
                          {data.employee.name}
                        </Text>
                      </div>
                      <div className="">
                        <Divider />
                      </div>
                      <div className="text-start">
                        <Text fw={400} size="xs">
                          {data.employee.account.status}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}
      {employees?.length == 0 && (
        <div className="bg-white p-4 rounded-xl">
          <div className="mt-2 px-3 py-2">
            <div className="flex justify-center">
              <Image
                src="/images/not-found.svg"
                style={{
                  width: "120px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Text fw={700} size="md">
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="sm">
                Pegawai kosong
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={400} size="xs">
                Jadwal belum diterbitkan
              </Text>
            </div>
            <div className="flex justify-center mt-1">
              <Button
                w={"100%"}
                size="sm"
                color="yellow"
                onClick={() => navigate("/employee-schedule")}
              >
                Atur jadwal
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
