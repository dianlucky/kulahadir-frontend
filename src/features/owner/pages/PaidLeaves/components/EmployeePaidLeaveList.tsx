import {
  useGetScheduleByDateStatus,
  useUpdateScheduleByDateEmployeeId,
} from "@/features/admin/pages/Schedule";
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
import { IconTrash, IconUsers } from "@tabler/icons-react";
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
  const mutationUpdateWorker = useUpdateScheduleByDateEmployeeId();
  const [employeeId, setEmployeeId] = useState<string | null>();

  // DELETE EMPLOYEE PAIDLEAVE
  const [modalDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [selectedEmployee, setSelectedEmployee] = useState<ScheduleType>();
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
        closeDelete();
      },
    });
  };
  // END FOR DELETE EMPLOYEE PAIDLEAVE

  // // GET EMPLOYEE
  // const [schedulesOff, setScheduleOff] = useState<ScheduleType[]>([]);
  // const { data: DataScheduleOff } = useGetScheduleByDateStatus(date, "off");
  // useEffect(() => {
  //   if (DataScheduleOff) {
  //     setScheduleOff(DataScheduleOff);
  //   }
  // }, [DataScheduleOff]);
  // // END FOR GET EMPLOYEE

  // SELECT EMPLOYEE
  const [schedulesOn, setSchedulesOn] = useState<ScheduleType[]>([]);
  const { data: DataSchedulesOn } = useGetScheduleByDateStatus(date, "on");
  useEffect(() => {
    if (DataSchedulesOn) {
      setSchedulesOn(DataSchedulesOn);
    }
  }, [DataSchedulesOn]);
  const selectEmployee = schedulesOn.map((data) => ({
    value: data.employee.id.toString(),
    label: data.employee.name,
  }));
  // END FOR SELECT EMPLOYEE

  // UPDATE WORKER
  const [opened, { open, close }] = useDisclosure(false);
  const handleAddPaidLeave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!employeeId) {
      console.error("Employee ID is not selected");
      return;
    }

    const removeWorkerData = {
      date: date,
      employee_id: parseInt(employeeId),
      status: "off",
    };

    await mutationUpdateWorker.mutateAsync(removeWorkerData, {
      onSuccess: (data: ScheduleType) => {
        console.log("Success:", data);
        refetchSchedule();
        refetchPaidLeaveDaily();
        close();
      },
    });
  };
  // END FOR UPDATE WORKER
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
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
                  <div className="col-span-1 ml-2 mt-3">
                    <Button
                      color="red"
                      size="compact-sm"
                      onClick={() => {
                        openDelete(), setSelectedEmployee(data);
                      }}
                    >
                      <IconTrash size={22} />
                    </Button>
                  </div>
                </div>
                <Divider size={"sm"} />
              </div>
            ))}

          {/* Tombol Tambah Pegawai */}
          <div className="mt-2 px-1">
            <Button fullWidth size="sm" onClick={open}>
              Tambahkan pegawai
            </Button>
          </div>
        </>
      )}
      {schedulesOff.length == 0 && (
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
                Tidak ada pegawai yang libur
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={400} size="xs"></Text>
            </div>
          </div>
          <div className="mt-2 px-1">
            <Button fullWidth size="sm" onClick={open} color="yellow">
              Tambahkan pegawai
            </Button>
          </div>
        </div>
      )}
      <Modal opened={opened} onClose={close} title="Tambah pegawai">
        <form onSubmit={handleAddPaidLeave}>
          <div className="p-2">
            <div className="">
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
              <Button fullWidth type="submit">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        opened={modalDelete}
        onClose={closeDelete}
        title="Hapus cuti pegawai"
      >
        <div className="p-2">
          <div className="text-center">
            <Text fw={700} size="sm">
              Apakah anda yakin ingin menghapus cuti untuk pegawai ini?
            </Text>
            <Text fw={700} size="sm" c={"red"}>
              "{selectedEmployee?.employee.name} |{" "}
              {selectedEmployee &&
                format(selectedEmployee?.date, "EEEE, dd MMMM yyyy", {
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
