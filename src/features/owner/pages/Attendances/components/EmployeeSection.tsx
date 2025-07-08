import { AttendanceType } from "@/types";
import { Divider, Image, Text, UnstyledButton } from "@mantine/core";
import {
  IconClockDown,
  IconClockUp,
  IconInfoCircle,
  IconUsers,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL;

interface EmployeeSectionProps {
  attendances: AttendanceType[];
  date?: string;
}

export const EmployeeSection: React.FC<EmployeeSectionProps> = ({
  attendances,
  date,
}) => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Presensi{" "}
            {format(new Date(date ? date : ""), "EEEE, dd MMMM yyyy", {
              locale: id,
            })}
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      {attendances.length != 0 &&
        attendances.map((data, index) => (
          <div className="" key={index}>
            <div className="grid grid-cols-12 p-2 mb-2">
              <div className="col-span-2 m-auto">
                <Image
                  radius="30px"
                  h={45}
                  w={45}
                  src={
                    data.schedule.employee.profile_pic
                      ? `${BaseURL}/uploads/employees/${data.schedule.employee.profile_pic}`
                      : "/images/profile-default.png"
                  }
                />
              </div>
              <div className="col-span-1">
                <div className="w-px h-full bg-gray-300 mx-4" />
              </div>
              <div className="col-span-9">
                <div className="flex justify-between pe-2">
                  <Text fw={700} size="md" truncate="end">
                    {data.schedule.employee.name}
                  </Text>
                  <UnstyledButton
                    size={"xs"}
                    onClick={() => {
                      navigate("/employee-attendances/detail", {
                        state: { data },
                      });
                    }}
                  >
                    <IconInfoCircle color="#4E71FF" />
                  </UnstyledButton>
                </div>
                <div className="my-1">
                  <Divider />
                </div>
                <div className="flex justify-between mt-2">
                  <div className="w-full flex">
                    <div>
                      <IconClockDown color="#77B254" size={16} />
                    </div>
                    <div className="ml-2">
                      <Text
                        size="xs"
                        fw={"bold"}
                        c={
                          data.schedule.attendance_status == "Late"
                            ? "yellow"
                            : "black"
                        }
                      >
                        {data.check_in
                          ? format(data.check_in, "HH:mm", { locale: id })
                          : "--:--"}
                      </Text>
                    </div>
                  </div>
                  <Divider orientation="vertical" />
                  <div className="w-full flex ml-2">
                    <div>
                      <IconClockUp color="#F72C5B" size={16} />
                    </div>
                    <div className="ml-2">
                      <Text size="xs" fw={"bold"}>
                        {data.check_out
                          ? format(data.check_out, "HH:mm", { locale: id })
                          : "--:--"}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}

      {attendances.length == 0 && (
        <div className="p-4 rounded-xl">
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
                Belum ada pegawai yang absen
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={400} size="xs"></Text>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
