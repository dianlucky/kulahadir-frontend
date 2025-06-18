import { ScheduleType } from "@/types";
import {
  Button,
  Divider,
  Image,
  Indicator,
  Modal,
  Notification,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalendar,
  IconCalendarTime,
  IconPencil,
  IconUsers,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  useCreateDailyTaskEmployee,
  useCreateSchedule,
  useGetScheduleByDate,
  useUpdateSchedule,
} from "../api";
import { useDisclosure } from "@mantine/hooks";
import { WorkerDetailSchedule } from "../components";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png";

export const SchedulePageAdmin: React.FC = () => {
  const [loading, { toggle }] = useDisclosure();
  const [successAdd, setSuccessAdd] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [worker, setWorker] = useState<ScheduleType>();
  const [status, setStatus] = useState<string | null | undefined>(
    worker?.status
  );
  // console.log("Status :", status);
  // console.log("WORKER : ", worker);
  const [modalAddSchedules, { open: openSchedules, close: closeSchedules }] =
    useDisclosure(false);
  const [
    modalDeleteWorker,
    { open: openWorkerDelete, close: closeWorkerDelete },
  ] = useDisclosure(false);
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
    setStatus(worker?.status);
    if (DataWorkingEmployee) {
      setWorkingEmployee(DataWorkingEmployee);
    }
  }, [DataWorkingEmployee, worker]);
  // console.log("Data Working Employee :", workingEmployee);

  // CREATE SCHEDULES
  const mutationCreateSchedules = useCreateSchedule();
  const mutationCreateDailyTaskEmployee = useCreateDailyTaskEmployee();
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
        setNotificationMessage("Jadwal berhasil dibuat");
        RefetchWorker();
        closeSchedules();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });

    const taskData = {
      month: format(new Date(formattedDate ? formattedDate : ""), "yyyy-MM", {
        locale: id,
      }),
      make_task: true,
    };
    await mutationCreateDailyTaskEmployee.mutateAsync(taskData, {
      onSuccess: (data: ScheduleType[]) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        setNotificationMessage("Jadwal berhasil dibuat");
        RefetchWorker();
        closeSchedules();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END FOR CREATE SCHEDULES

  // UPDATE WORKER
  const mutationUpdateWorker = useUpdateSchedule(worker?.id);
  const handleDeleteWorker = async () => {
    const removeWorkerData = {
      status: status,
    };

    let message = "";
    if (status == "on") {
      message = "Pegawai berhasil di-aktifkan dari jadwal";
    } else {
      message = "Pegawai berhasil di-nonaktifkan dari jadwal";
    }

    await mutationUpdateWorker.mutateAsync(removeWorkerData, {
      onSuccess: (data: ScheduleType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        setNotificationMessage(message);
        RefetchWorker();
        closeWorkerDelete();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END FOR UPDATE WORKER

  return (
    <>
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
                    ? format(new Date(date), "EEEE, dd MMMM yyyy", {
                        locale: id,
                      })
                    : ""}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Pegawai :</Text>
                <Text fw={"bold"} size="sm" c="#343a40">
                  {workingEmployee
                    ? workingEmployee.filter((emp) => emp.status === "on")
                        .length
                    : " - "}
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
                      <Button color="yellow" onClick={openSchedules}>
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
            opened={modalAddSchedules}
            onClose={closeSchedules}
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
                    format(new Date(formattedDate), "MMMM yyyy", {
                      locale: id,
                    })}
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
                  handleCreateSchedules();
                }}
              >
                Ya! Buat jadwal!
              </Button>
            </div>
          </Modal>
          <div className="relative col-span-6 bg-white shadow-sm p-6 rounded-lg">
            <div className="flex justify-between mb-1 -mt-3">
              <Text fw={"bold"} size="md" c="#343a40">
                Data pegawai yang bekerja
              </Text>
              <IconUsers />
            </div>
            <Divider />
            <div className="grid grid-cols-12 w-full gap-2 mt-2">
              {workingEmployee.length != 0 &&
                workingEmployee.map((data, index) => (
                  <div className="col-span-6 w-full" key={index}>
                    <Indicator
                      color={data.status == "on" ? `green` : `red`}
                      inline
                      size={10}
                      position="top-start"
                      offset={10}
                    >
                      <div className="bg-white shadow-sm p-3 rounded-lg w-full">
                        <div className="grid grid-cols-12">
                          <div className="col-span-2">
                            <div className="bg-white-500 rounded-full p-1 w-10 h-10 overflow-hidden">
                              <Image
                                src={
                                  data.employee?.profile_pic
                                    ? `${BaseURL}/uploads/employees/${data.employee?.profile_pic}`
                                    : DEFAULT_IMAGE
                                }
                                alt="Foto Profil"
                                className="w-full h-full object-fill rounded-full"
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <Text fw={"bold"} size="sm" truncate="end" mb={-2}>
                              {data.employee.name}
                            </Text>
                            <Text size="xs" mt={-2}>
                              {data.employee.account.status}
                            </Text>
                          </div>
                          <div className="col-span-4">
                            <div className="grid grid-cols-2 gap-1">
                              <div className="col-span-1"></div>
                              <div className="col-span-1">
                                <Tooltip
                                  label="Ubah jadwal"
                                  withArrow
                                  transitionProps={{
                                    transition: "fade-up",
                                    duration: 300,
                                  }}
                                >
                                  <Button
                                    size="compact-sm"
                                    color="yellow"
                                    onClick={() => {
                                      openWorkerDelete(), setWorker(data);
                                    }}
                                  >
                                    <IconPencil size={18} color="white" />
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Indicator>
                  </div>
                ))}
            </div>
            <Modal
              opened={modalDeleteWorker}
              onClose={closeWorkerDelete}
              title="Konfirmasi hapus pekerja dari jadwal"
            >
              <div className="text-center px-2">
                <div>
                  <Text fw={"bold"} size="md">
                    Apakah anda yakin ingin mengubah status pekerja dari jadwal?
                  </Text>
                </div>
                <div className="mt-2">
                  <Text fw={"bold"} color="red">
                    "
                    {formattedDate &&
                      format(new Date(formattedDate), "EEEE, dd MMMM yyyy", {
                        locale: id,
                      })}{" "}
                    | {worker && worker.employee.name}"
                  </Text>
                </div>
                <div className="text-left">
                  <Select
                    label="Status"
                    data={["on", "off"]}
                    value={status}
                    onChange={(value) => setStatus(value)}
                  />
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
                    handleDeleteWorker(), toggle;
                  }}
                >
                  Ya! Ubah status
                </Button>
              </div>
            </Modal>
            <div className="absolute bottom-2 right-3 flex items-center space-x-1">
              <div>
                <Indicator size={12} color="red" offset={1} />
              </div>
              <div className="ml-1">
                <Text size="xs">Tidak bekerja</Text>
              </div>
            </div>
            <div className="absolute bottom-2 right-30 flex items-center space-x-1">
              <div>
                <Indicator size={12} color="green" offset={1} />
              </div>
              <div className="ml-1">
                <Text size="xs">Bekerja</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50 w-100">
          {successAdd && (
            <Notification color="teal" title="Berhasil!" mt="md">
              {notificationMessage}
            </Notification>
          )}
        </div>
      </section>
      <WorkerDetailSchedule />
    </>
  );
};
