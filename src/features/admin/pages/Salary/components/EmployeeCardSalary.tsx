import { EmployeeType, ScheduleType } from "@/types";
import { Button, Divider, Image, Text } from "@mantine/core";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";

const BaseURL = import.meta.env.VITE_API_URL;

interface EmployeeCardSalaryProps {
  employees: ScheduleType[];
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<EmployeeType | undefined>
  >;
}

export const EmployeeCardSalary: React.FC<EmployeeCardSalaryProps> = ({
  employees,
  setSelectedEmployee,
}) => {
  return (
    <>
      <section className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <div className="text-dark font-semibold cursor-pointer text-md">
            Daftar pegawai
          </div>
          <div>
            <IconUsers />
          </div>
        </div>
        <Divider />
        <div className="mt-4">
          {employees.length != 0 && (
            <div>
              <Divider label="Pegawai tetap" labelPosition="left" />{" "}
              {employees
                .filter(
                  (data) => data.employee.account.status == "Pegawai tetap"
                )
                .map((data, index) => (
                  <div
                    className="bg-slate-50 shadow-xs grid grid-cols-12 rounded-xl p-3 mb-2"
                    key={index}
                  >
                    <div className="col-span-2 flex justify-center">
                      <Image
                        radius="200"
                        src={
                          data.employee.profile_pic
                            ? `${BaseURL}/uploads/employees/${data.employee.profile_pic}`
                            : "/images/profile-default.png"
                        }
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-7">
                      <div>
                        <Text fw={"bold"} size="sm" truncate="end">
                          {data.employee.name}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs">{data.employee.account.status}</Text>
                      </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1 flex justify-end">
                      <div>
                        <Button
                          size="compact-sm"
                          variant="subtle"
                          color="gray"
                          onClick={() => setSelectedEmployee(data.employee)}
                        >
                          <IconInfoCircle color="#4E71FF" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {employees.filter(
            (data) => data.employee.account.status == "Part time"
          ).length != 0 && (
            <div>
              <Divider label="Part time" labelPosition="left" />{" "}
              {employees
                .filter((data) => data.employee.account.status == "Part time")
                .map((data, index) => (
                  <div
                    className="bg-slate-50 shadow-xs grid grid-cols-12 rounded-xl p-3 mb-2"
                    key={index}
                  >
                    <div className="col-span-2 flex justify-center">
                      <Image
                        radius="200"
                        src={
                          data.employee.profile_pic
                            ? `${BaseURL}/uploads/employees/${data.employee.profile_pic}`
                            : "/images/profile-default.png"
                        }
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-8">
                      <div>
                        <Text fw={"bold"} size="sm" truncate="end">
                          {data.employee.name}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs">{data.employee.account.status}</Text>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <div>
                        <Button
                          size="compact-sm"
                          variant="subtle"
                          color="gray"
                          onClick={() => setSelectedEmployee(data.employee)}
                        >
                          <IconInfoCircle color="#4E71FF" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
