import {
  useGetScheduleByDateStatus,
  useUpdateScheduleByDateEmployeeId,
} from "@/features/admin/pages/Schedule";
import { useAuth } from "@/features/auth";
import { ScheduleType } from "@/types";
import {
  Button,
  Divider,
  Image,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconTrash, IconUsers } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

const BaseURL = import.meta.env.VITE_API_URL;
interface EmployeePaidLeaveListProps {
  date?: string;
  refetchSchedule: () => void;
  refetchPaidLeaveDaily: () => void;
  schedulesOff: ScheduleType[];
}

export const EmployeePaidLeaveList: React.FC<EmployeePaidLeaveListProps> = ({
  date,
  refetchSchedule,
  refetchPaidLeaveDaily,
  schedulesOff,
}) => {
  const { creds } = useAuth();
  // const [employeeId, setEmployeeId] = useState<string | null>();

  const [modalDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [selectedEmployee, setSelectedEmployee] = useState<ScheduleType>();

  // DELETE EMPLOYEE PAIDLEAVE
  const mutationUpdateWorker = useUpdateScheduleByDateEmployeeId();
  const handleDeletePaidLeave = async () => {
    const removeWorkerData = {
      date: date,
      employee_id: selectedEmployee?.employee_id,
      status: "on",
    };

    await mutationUpdateWorker.mutateAsync(removeWorkerData, {
      onSuccess: (data: ScheduleType) => {
        console.log("Success:", data);
        refetchSchedule();
        refetchPaidLeaveDaily();
        showNotification({
          message: "Berhasil menghapus cuti",
          color: "green",
          position: "top-center",
        });
        closeDelete();
      },
    });
  };
  // END FOR DELETE EMPLOYEE PAIDLEAVE

  // UPDATE WORKER
  const [opened, { open, close }] = useDisclosure(false);
  const handleAddPaidLeave = async (event: React.FormEvent) => {
    event.preventDefault();

    const removeWorkerData = {
      date: date,
      employee_id: creds?.employee_id,
      status: "off",
    };

    await mutationUpdateWorker.mutateAsync(removeWorkerData, {
      onSuccess: () => {
        refetchSchedule();
        refetchPaidLeaveDaily();
        showNotification({
          message: "Berhasil mengajukan cuti",
          color: "red",
          position: "top-center",
        });
        close();
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal menghapus kategori. Silakan coba lagi.";
        close();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };
  // END FOR UPDATE WORKER
  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Pegawai yang cuti
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      {schedulesOff.length != 0 && (
        <>
          {[...schedulesOff]
            .sort((a, b) =>
              b.employee.account.status.localeCompare(a.employee.account.status)
            )
            .map((data, index) => (
              <div key={index} className="px-2">
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
                  <div className="col-span-8 ml-2">
                    <div>
                      <Text fw={700} size="md" truncate="end">
                        {data.employee.name}
                      </Text>
                    </div>
                    <div>
                      <Divider />
                    </div>
                    <div>
                      <Text fw={400} size="xs">
                        {data.employee.account.status}
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1 my-auto">
                    {creds?.level == "Owner" && (
                      <Button
                        color="red"
                        size="compact-xs"
                        onClick={() => {
                          openDelete(), setSelectedEmployee(data);
                        }}
                      >
                        <IconTrash size={15} />
                      </Button>
                    )}
                    {creds?.employee_id == data.employee_id && (
                      <Button
                        color="red"
                        size="compact-xs"
                        onClick={() => {
                          openDelete(), setSelectedEmployee(data);
                        }}
                      >
                        <IconTrash size={15} />
                      </Button>
                    )}
                  </div>
                </div>
                <Divider size={"sm"} />
              </div>
            ))}

          {/* Tombol Tambah Pegawai */}
          {/* <div className="mt-2 px-1">
              <Button fullWidth size="sm" onClick={open}>
                Tambahkan pegawai
              </Button>
            </div> */}
        </>
      )}
      {schedulesOff.length == 0 && (
        <div className="p-4 rounded-xl">
          <div className="mt-2 px-3 py-2">
            <div className="flex justify-center ml-4">
              <Image
                src="/images/not-found.svg"
                style={{
                  width: "120px",
                }}
              />
            </div>
            <div className="flex justify-center mt-1">
              <Text fw={700} size="sm">
                Tidak ada pegawai yang cuti
              </Text>
            </div>
            {creds?.level == "Pegawai" && (
              <div className="flex justify-center mt-2">
                <Button size="compact-sm" onClick={open} color="yellow">
                  Saya ingin cuti
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Konfirmasi cuti pegawai">
        <form onSubmit={handleAddPaidLeave}>
          <div className="p-2">
            <div className="text-center w-full">
              <Text size="sm" fw={600}>
                Apakah anda yakin ingin mengajukan cuti pada hari
              </Text>
              <Text size="sm" fw={600} c={"blue"}>
                "
                {format(new Date(date ?? ""), "EEEE, dd MMMM yyyy", {
                  locale: id,
                })}
                "
              </Text>
            </div>
            {/* <div className="">
              <TextInput
                label="Tanggal"
                disabled
                value={"23 Mei 2025"}
              ></TextInput>
            </div>
            <div className="mt-2">
              <Select
                label="Pegawai"
                data={selectEmployee}
                onChange={setEmployeeId}
                required={true}
              />
            </div> */}
            <div className="mt-4 flex justify-between gap-2">
              <Button
                onClick={() => {
                  close();
                }}
                fullWidth
                color={"grey"}
              >
                Batal
              </Button>
              <Button fullWidth type="submit">
                Ya! Ajukan
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        opened={modalDelete}
        onClose={closeDelete}
        title="Konfirmasi hapus cuti"
      >
        <div className="p-2">
          <div className="text-center">
            <Text fw={700} size="sm">
              Apakah anda yakin ingin membatalkan cuti anda pada hari
            </Text>
            <Text fw={700} size="sm" c={"red"}>
              "
              {format(new Date(date ?? ""), "EEEE, dd MMMM yyyy", {
                locale: id,
              })}
              "
            </Text>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <Button
              onClick={() => {
                close();
              }}
              fullWidth
              color={"grey"}
            >
              Kembali
            </Button>
            <Button
              fullWidth
              onClick={() => {
                handleDeletePaidLeave();
              }}
            >
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
