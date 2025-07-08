import { AttendanceType, ScheduleType } from "@/types";
import { Badge, Button, Divider, Image, Text } from "@mantine/core";
import { IconClockDown, IconClockUp, IconUsers } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL;

interface WorkerListProps {
  schedules: ScheduleType[];
  attendances: AttendanceType[];
}

export const WorkerList: React.FC<WorkerListProps> = ({
  schedules,
  attendances,
}) => {
  const navigate = useNavigate();
  // MAKE WORKER ARRAY
  const workers = schedules?.map((schedule) => {
    const attendance = attendances?.find(
      (att) => att.schedule_id === schedule.id
    );

    return {
      ...schedule,
      attendance_id: attendance?.id ?? null,
      attendance_status: schedule.attendance_status ?? null,
      attendance: attendance ? attendance : null,
    };
  });
  // END FOR MAKE WORKER ARRAY

  return (
    <section className="bg-slate-50 rounded-lg p-4">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="black">
            Pegawai yang bekerja
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="grid grid-cols-12 w-full gap-2 px-1 mt-2">
        {workers &&
          workers.map((data, index) => (
            <div
              className="col-span-6 bg-white rounded-lg shadow-sm"
              key={index}
            >
              <div className="grid grid-cols-12 p-2">
                <div className="col-span-1">
                  <div className="bg-slate-100 rounded-full p-1 w-[35px] h-[35px] overflow-hidden border-4 border-gray-800 mt-2">
                    <img
                      src={
                        data.employee.profile_pic
                          ? `${BaseURL}/uploads/employees/${data.employee.profile_pic}`
                          : "/images/profile-default.png"
                      }
                      alt="Foto Profil"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="col-span-1 ml-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-10 ml-1">
                  <div className="flex justify-end">
                    <Badge
                      size="10px"
                      radius={"xs"}
                      color={
                        data.attendance_status == "Done" ||
                        data.attendance_status == "Present"
                          ? "green"
                          : data.attendance_status == "Late"
                          ? "yellow"
                          : "red"
                      }
                    >
                      <span style={{ fontSize: "8px", fontWeight: "bold" }}>
                        {data.attendance_status}
                      </span>
                    </Badge>
                  </div>
                  <div className="mb-1">
                    <Text fw={600} size="12px">
                      {data.employee.name}
                    </Text>
                  </div>
                  <div>
                    <Divider />
                  </div>
                  <div className="mt-1 flex justify-between">
                    <div className="w-full flex">
                      <div>
                        <IconClockDown color="#77B254" size={16} />
                      </div>
                      <div className="ml-2 mt-1">
                        <Text
                          size="11px"
                          fw={600}
                          c={
                            data.attendance_status == "Late"
                              ? "yellow"
                              : "black"
                          }
                        >
                          {data.attendance
                            ? format(data.attendance.check_in, "HH:mm", {
                                locale: id,
                              })
                            : "--:--"}
                        </Text>
                      </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="w-full flex ml-2">
                      <div>
                        <IconClockUp color="#F72C5B" size={16} />
                      </div>
                      <div className="ml-2 mt-1">
                        <Text size="11px" fw={600}>
                          {data.attendance?.check_out
                            ? format(data.attendance.check_out, "HH:mm", {
                                locale: id,
                              })
                            : "--:--"}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {workers.length == 0 && (
          <div className=" col-span-12 bg-white shadow-sm p-4 rounded-xl">
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
                  Jadwal masih belum dibuat
                </Text>
              </div>
              <div className="flex justify-center -mt-1">
                <Text fw={400} size="xs">
                  Cek di menu jadwal...
                </Text>
              </div>
              <div className="w-40 mx-auto mt-1">
                <Button
                  size="xs"
                  color="yellow"
                  fullWidth
                  onClick={() => navigate("/schedule")}
                >
                  Menu jadwal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
