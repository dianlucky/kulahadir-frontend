import { ScheduleType } from "@/types";
import {
  Button,
  Divider,
  em,
  Image,
  Indicator,
  Modal,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalendar,
  IconCalendarTime,
  IconEye,
  IconPencil,
  IconUsers,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useCreateSchedule, useGetScheduleByDate } from "../api";
import { useDisclosure } from "@mantine/hooks";

export const SchedulePageAdmin: React.FC = () => {
  const [loading, { toggle }] = useDisclosure();
  const [successAdd, setSuccessAdd] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>();
  useEffect(() => {
    if (date) {
      let dateFormat = format(date ?? new Date(), "yyyy-MM-dd", { locale: id });
      setFormattedDate(dateFormat);
    }
  }, [date]);
  // console.log("Tanggal yang dipilih :", formattedDate);
  const [workingEmployee, setWorkingEmployee] = useState<ScheduleType[]>([]);
  const { data: DataWorkingEmployee, refetch: RefetchWorker } =
    useGetScheduleByDate(formattedDate);
  useEffect(() => {
    if (DataWorkingEmployee) {
      setWorkingEmployee(DataWorkingEmployee);
    }
  }, [DataWorkingEmployee]);
  console.log("Data Working Employee :", workingEmployee);

  // CREATE SCHEDULES
  const mutationCreateSchedules = useCreateSchedule();
  const handleCreateSchedules = async () => {
    const schedulesData = {
      month: format(new Date(formattedDate ? formattedDate : ""), "MM-yyyy", {
        locale: id,
      }),
      make_schedule: true,
    };

    await mutationCreateSchedules.mutateAsync(schedulesData, {
      onSuccess: (data: ScheduleType[]) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        RefetchWorker();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END FOR CREATE SCHEDULES

  return (
    <section className="bg-white shadow-lg p-6 rounded-lg">
      <div className="flex justify-center mb-4">
        <Text fw={"bolder"} size="lg" c="#343a40">
          Data Jadwal Pegawai
        </Text>
      </div>
      <Divider />
      <div className="grid grid-cols-12 mt-5 gap-2">
        <div className="col-span-3 bg-white shadow-sm p-6 rounded-lg h-[370px]">
          <div className="flex justify-between mb-1 -mt-3">
            <Text fw={"bold"} size="md" c="#343a40">
              Kalender
            </Text>
            <IconCalendar />
          </div>
          <Divider />
          <div className="flex justify-center w-full mt-2">
            <DatePicker value={date} onChange={setDate} size="sm" />
          </div>
        </div>
        <div className="col-span-3 bg-white shadow-sm p-6 rounded-lg">
          <div className="flex justify-between mb-1 -mt-3">
            <Text fw={"bold"} size="md" c="#343a40">
              Detail jadwal
            </Text>
            <IconCalendarTime />
          </div>
          <Divider />
          <div className="w-full mt-2">
            <div className="flex justify-between">
              <Text size="sm">Tanggal :</Text>
              <Text fw={"bold"} size="sm" c="#343a40">
                {" "}
                {date
                  ? format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id })
                  : ""}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text size="sm">Pegawai :</Text>
              <Text fw={"bold"} size="sm" c="#343a40">
                {workingEmployee ? workingEmployee.length : " - "}
              </Text>
            </div>
            <Divider className="mt-2" />
            {/* {workingEmployee
              ? workingEmployee.map((employee, index) => (
                  <div className="mt-2" key={index}>
                    <div className="grid grid-cols-12">
                      <div className="col-span-1">
                        <Image
                          radius="200"
                          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                          style={{
                            width: "25px",
                            height: "25px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-span-10 ml-2 mt-1">
                        <Text truncate="end" size="sm">
                          {employee.employee.name}
                        </Text>
                      </div>
                      <div className="col-span-1">
                        <UnstyledButton>
                          <IconPencil size={21} color="#f03e3e" />{" "}
                        </UnstyledButton>
                      </div>
                    </div>
                    <Divider className="mt-2" />
                  </div>
                ))
              : ""} */}
            {workingEmployee.length == 0 && (
              <div className="flex justify-center">
                <div className="text-center mt-10">
                  <div>
                    <Image
                      className="ml-15"
                      src="/images/not-found.svg"
                      style={{
                        width: "120px",
                      }}
                    />
                  </div>
                  <div>
                    <Text fw={"bold"} c="#343a40">
                      Jadwal tidak ditemukan
                    </Text>
                  </div>
                  <div className="mt-2">
                    <Button color="yellow" onClick={open}>
                      Buat jadwal untuk bulan ini
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {workingEmployee == null && (
              <div className="mt-2">
                <Button fullWidth size="sm" c={"white"}>
                  Tambah pegawai
                </Button>
              </div>
            )}
          </div>
        </div>
        <Modal
          opened={opened}
          onClose={close}
          title="Konfirmasi pembuatan jadwal"
        >
          <div className="text-center px-2">
            <div>
              <Text fw={"bold"} size="md">
                Apakah anda yakin ingin membuat jadwal untuk bulan
              </Text>
            </div>
            <div className="mt-2">
              <Text fw={"bold"} color="red">
                "
                {formattedDate &&
                  format(new Date(formattedDate), "MMMM yyyy", { locale: id })}
                "
              </Text>
            </div>
          </div>
          <div className="flex mt-5 gap-2 px-1">
            <Button color="grey" c={"white"} onClick={close} fullWidth>
              Kembali
            </Button>
            <Button
              loading={loading}
              fullWidth
              onClick={() => {
                handleCreateSchedules(), toggle;
              }}
            >
              Ya! Buat jadwal!
            </Button>
          </div>
        </Modal>
        <div className="col-span-6 bg-white shadow-sm p-6 rounded-lg">
          <div className="flex justify-between mb-1 -mt-3">
            <Text fw={"bold"} size="md" c="#343a40">
              Data pegawai yang bekerja
            </Text>
            <IconUsers />
          </div>
          <Divider />
          <div className="grid grid-cols-12 w-full gap-2 mt-2">
            {workingEmployee.length != 0 &&
              workingEmployee.map((employee, index) => (
                <div className="col-span-6 bg-white shadow-sm p-3 rounded-lg">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2">
                      <Image
                        radius="200"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-span-6">
                      <Text fw={"bold"} size="sm" truncate="end">
                        {employee.employee.name}
                      </Text>
                      <Text size="xs">{employee.employee.name}</Text>
                    </div>
                    <div className="col-span-4">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="col-span-1">
                          <Tooltip
                            label="Detail jadwal"
                            withArrow
                            transitionProps={{
                              transition: "fade-up",
                              duration: 300,
                            }}
                          >
                            <Button size="xs">
                              <IconEye size={18} color="white" />
                            </Button>
                          </Tooltip>
                        </div>
                        <div className="col-span-1">
                          <Tooltip
                            label="Ubah jadwal"
                            withArrow
                            transitionProps={{
                              transition: "fade-up",
                              duration: 300,
                            }}
                          >
                            <Button size="xs" color="yellow">
                              <IconPencil size={18} color="white" />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
