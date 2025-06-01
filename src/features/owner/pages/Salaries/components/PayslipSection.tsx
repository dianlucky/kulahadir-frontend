import { SalaryType, ScheduleType } from "@/types";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconPencil } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

interface PayslipSectionProps {
  salary: SalaryType;
  schedules: ScheduleType[];
}

export const PayslipSection: React.FC<PayslipSectionProps> = ({
  salary,
  schedules,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [totalAttendanceSalary, setTotalAttendanceSalary] = useState<number>(0);

  useEffect(() => {
    setTotalAttendanceSalary(
      schedules.filter(
        (data) =>
          data.attendance_status == "Present" ||
          data.attendance_status == "Late"
      ).length * 40000
    );
  }, [salary, schedules]);
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 -mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={600} c="#654433">
            Slip gaji
          </Text>
        </div>
        <div className="flex mb-1 mr-1 gap-1">
          {/* <Button size="compact-xs" color="yellow" onClick={open}>
            <IconPencil size={20} />
          </Button> */}
          <Button size="compact-xs" color="#4E71FF">
            <IconDownload size={20} />
          </Button>
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="text-center mt-2 mb-3">
        <div>
          <Text fw={"bold"} size="md">
            ANGKRINGAN KULAKITA
          </Text>
        </div>
        <div>
          <Text size="10px">
            Jl. Ahmad Yani, Angsau, Kec. Pelaihari, Kab. Tanah Laut, Kalimantan
            Selatan 70815
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
              {salary.date && format(salary.date, "MMMM yyyy", { locale: id })}
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
              Rp. {new Intl.NumberFormat("id-ID").format(totalAttendanceSalary)}
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
                totalAttendanceSalary + salary.bonus
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
              Rp. Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(salary.cash_advance)}
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
                salary.cash_advance + salary.salary_deduction
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
              {salary.created_at &&
                format(salary.created_at, "dd MMM yyyy", { locale: id })}
            </Text>
            <Text size="xs" m={6} fs={"italic"}>
              Hafiz Anshari{" "}
            </Text>
            <Text size="xs">(Owner Kulakita)</Text>
          </div>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Edit gaji pegawai"></Modal>
    </section>
  );
};
