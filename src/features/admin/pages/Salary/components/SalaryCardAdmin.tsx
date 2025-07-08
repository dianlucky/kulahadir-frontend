import { useDeleteSalary } from "@/features/owner/pages/Salaries";
import { SalaryType, ScheduleType } from "@/types";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
interface SalaryCardAdminProps {
  salary: SalaryType;
  schedules?: ScheduleType[];
  refetchSalary: () => void;
}

export const SalaryCardAdmin: React.FC<SalaryCardAdminProps> = ({
  salary,
  schedules,
  refetchSalary,
}) => {
  // DELETE SALARY
  const [opened, { open, close }] = useDisclosure(false);
  const deleteSalaryMutation = useDeleteSalary();
  const handleDeleteSalary = async (id: number | undefined) => {
    deleteSalaryMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        showNotification({
          message: "Berhasil menghapus data gaji pegawai",
          color: "green",
          position: "bottom-right",
        });
        refetchSalary();
        close();
      },
    });
  };
  // END FOR DELETE SALARY
  return (
    <>
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-1">
          <div className="text-dark font-semibold cursor-pointer text-sm">
            Slip gaji pegawai
          </div>
          <div className="flex justify-between gap-1 -mt-1">
            <Button size="compact-xs" color="red" onClick={open}>
              <IconTrash size={18} />
            </Button>
          </div>
        </div>
        <Divider />
        <div className="text-center mt-2 mb-3">
          <div>
            <Text fw={"bold"} size="md">
              ANGKRINGAN KULAKITA
            </Text>
          </div>
          <div>
            <Text size="10px">
              Jl. Ahmad Yani, Angsau, Kec. Pelaihari, Kab. Tanah Laut,
              Kalimantan Selatan 70815
            </Text>
          </div>
        </div>
        <Divider />
        <div className="px-2 mt-1 mb-2">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <Text size="sm" fw={"bold"}>
                Nama{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-8 mt-1">
              <Text size="13px">{salary.employee.name}</Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <Text size="sm" fw={"bold"}>
                Jabatan{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-8 mt-1">
              <Text size="13px">{salary.employee.account.level}</Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <Text size="sm" fw={"bold"}>
                Status{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-8 mt-1">
              <Text size="13px">{salary.employee.account.status}</Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <Text size="sm" fw={"bold"}>
                Bulan{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-8 mt-1">
              <Text size="13px">
                {salary.date &&
                  format(salary.date, "MMMM yyyy", { locale: id })}
              </Text>
            </div>
          </div>
        </div>
        <Divider />
        <div className="px-2 mt-1 mb-2">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <Text size="sm" fw={"bold"}>
                Gaji pokok{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-7 mt-1 text-end">
              <Text size="13px">
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  (schedules
                    ? schedules?.filter(
                        (data) =>
                          data.attendance_status == "Present" ||
                          data.attendance_status == "Late"
                      ).length
                    : 0) * 40000
                )}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <Text size="sm" fw={"bold"}>
                Bonus{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-7 mt-1 text-end">
              <Text size="13px">
                Rp. {new Intl.NumberFormat("id-ID").format(salary.bonus)}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-7">
              <Text size="sm" fw={"bold"}>
                Total pendapatan :{" "}
              </Text>
            </div>
            <div className="col-span-5 mt-1 text-end">
              <Text size="13px">
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  (schedules
                    ? schedules?.filter(
                        (data) =>
                          data.attendance_status == "Present" ||
                          data.attendance_status == "Late"
                      ).length
                    : 0) *
                    40000 +
                    salary.bonus
                )}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3">
            <div className="col-span-4">
              <Text size="sm" fw={"bold"}>
                Potongan{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-7 mt-1 text-end">
              <Text size="13px">
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(salary.salary_deduction)}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <Text size="sm" fw={"bold"}>
                Kasbon{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-7 mt-1 text-end">
              <Text size="13px">
                Rp. {new Intl.NumberFormat("id-ID").format(salary.cash_advance)}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-7">
              <Text size="sm" fw={"bold"}>
                Total potongan :{" "}
              </Text>
            </div>
            <div className="col-span-5 mt-1 text-end">
              <Text size="13px">
                Rp.{" "}
                {new Intl.NumberFormat("id-ID").format(
                  salary.salary_deduction - salary.cash_advance
                )}
              </Text>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 mb-1">
            <div className="col-span-5">
              <Text size="sm" fw={"bold"}>
                Gaji diterima{" "}
              </Text>
            </div>
            <div className="col-span-1">
              <Text size="sm" fw={"bold"}>
                :
              </Text>
            </div>
            <div className="col-span-6 mt-1 text-end">
              <Text size="13px">
                Rp. {new Intl.NumberFormat("id-ID").format(salary.amount)}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-12 mt-4 mb-2">
            <div className="col-span-3" />
            <div className="col-span-9 text-center">
              <Text size="xs">
                Tanah Laut,{" "}
                {format(salary.created_at, "dd MMMM yyyy", { locale: id })}{" "}
              </Text>
              <Text size="xs" m={6} fs={"italic"}>
                Hafiz Anshari{" "}
              </Text>
              <Text size="xs">(Owner Kulakita)</Text>
            </div>
          </div>
        </div>
        {/* DELETE SALARY MODAL */}
        <Modal opened={opened} onClose={close} withCloseButton={false}>
          <div className="px-1">
            <div className="text-center">
              <Text fw={500} size="md">
                Apakah anda yakin ingin menghapus data gaji
              </Text>
              <Text fw={700} size="md" c={"red"}>
                {salary.employee.name} ||{" "}
                {format(salary.date, "MMMM yyyy", { locale: id })}
              </Text>
            </div>
            <div className="flex gap-2 mt-4">
              <Button fullWidth color="grey" onClick={() => close()}>
                Tidak
              </Button>
              <Button
                fullWidth
                color="blue"
                onClick={() => handleDeleteSalary(salary.id)}
              >
                Ya
              </Button>
            </div>
          </div>
        </Modal>
        {/* END FOR DELETE SALARY MODAL */}
      </div>
    </>
  );
};
