import {
  useCreateDailyTaskEmployee,
  useCreateSchedule,
} from "@/features/admin/pages/Schedule";
import { ScheduleType } from "@/types";
import { Button, Divider, Image, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconUsers } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

const BaseURL = import.meta.env.VITE_API_URL;
interface EmployeeScheduleListProps {
  workingEmployees: ScheduleType[];
  date?: string;
  RefetchWorkingEmployees: () => void;
}

export const EmployeeScheduleList: React.FC<EmployeeScheduleListProps> = ({
  workingEmployees,
  date,
  RefetchWorkingEmployees,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CREATE SCHEDULES
  const mutationCreateSchedules = useCreateSchedule();
  const mutationCreateDailyTaskEmployee = useCreateDailyTaskEmployee();

  const handleCreateSchedules = async () => {
    setIsSubmitting(true); // Mulai loading
    try {
      const currentDate = new Date(date ?? "");

      const schedulesData = {
        month: format(currentDate, "MM-yyyy", { locale: id }),
        make_schedule: true,
      };

      await mutationCreateSchedules.mutateAsync(schedulesData);

      const taskData = {
        month: format(currentDate, "yyyy-MM", { locale: id }),
        make_task: true,
      };

      await mutationCreateDailyTaskEmployee.mutateAsync(taskData);

      RefetchWorkingEmployees();
      close();
    } catch (error) {
      console.error("Error creating schedules or tasks:", error);
    } finally {
      showNotification({
        message: "Berhasil menambahkan jadwal pegawai",
        color: "green",
        position: "top-center",
      });
      setIsSubmitting(false);
    }
  };
  // END FOR CREATE SCHEDULE

  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Pegawai yang bekerja
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      {workingEmployees.length != 0 && (
        <div className="mt-2">
          <div className="mx-4">
            <Divider
              label="Pegawai tetap"
              labelPosition="center"
              style={{ marginBottom: "4px" }}
            />
          </div>
          {workingEmployees
            .filter((data) => data.employee.account.status != "Part time")
            .map((data, index) => (
              <button
                className="w-full"
                style={{ marginTop: "-3px" }}
                key={index}
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

      {workingEmployees.filter(
        (data) => data.employee.account.status == "Part time"
      ).length != 0 && (
        <div className="">
          <div className="mx-4">
            <Divider
              label="Part time"
              labelPosition="center"
              style={{ marginBottom: "4px" }}
            />
          </div>
          {workingEmployees
            .filter((data) => data.employee.account.status == "Part time")
            .map((data, index) => (
              <button
                className="w-full"
                style={{ marginTop: "-3px" }}
                key={index}
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

      {workingEmployees.length == 0 && (
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
                Jadwal masih belum dibuat
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={400} size="xs"></Text>
            </div>
          </div>
          <div className="px-5">
            <Button fullWidth size="sm" onClick={open} color="yellow">
              Buat jadwal
            </Button>
          </div>
        </div>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="text-center my-3">
          <Text fw={600} size="sm">
            Apakah anda yakin ingin membuat jadwal untuk bulan?
          </Text>
          <Text fw={700} size="sm" c={"red"}>
            "{date && format(date, "MMMM yyyy", { locale: id })}"
          </Text>
        </div>
        <div className="flex gap-2">
          <Button color="grey" c={"white"} onClick={close} fullWidth>
            Kembali
          </Button>
          <Button
            fullWidth
            loading={isSubmitting}
            loaderProps={{ type: "dots" }}
            onClick={handleCreateSchedules}
          >
            Ya! Buat jadwal!
          </Button>
        </div>
      </Modal>
    </section>
  );
};
