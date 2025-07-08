import { CashAdvanceType, EmployeeType, ScheduleType } from "@/types";
import {
  Button,
  Divider,
  Image,
  Modal,
  NumberInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useCreateSalary } from "../api";
import { showNotification } from "@mantine/notifications";

interface CreateSalarySectionProps {
  cashAdvances: CashAdvanceType[];
  employee: EmployeeType;
  month: string;
  RefetchSalary: () => void;
  schedules: ScheduleType[];
}

// GAJI PERHARI
const SALARY_PER_DAY = 40000;
// END FOR GAJI PERHARI

export const CreateSalarySection: React.FC<CreateSalarySectionProps> = ({
  cashAdvances,
  employee,
  month,
  RefetchSalary,
  schedules,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const navigate = useNavigate();

  // INFO MODAL
  const [totalCashAdvance, setTotalCashAdvance] = useState<number>(0);
  const [totalSalary, setTotalSalary] = useState<number>(0);

  useEffect(() => {
    setTotalCashAdvance(
      cashAdvances
        .filter((data) => data.status === "accepted")
        .reduce((total, data) => total + data.amount, 0)
    );
    setTotalSalary(
      schedules.filter(
        (data) =>
          data.attendance_status == "Present" ||
          data.attendance_status == "Late" ||
          (data.attendance_status == "Working" && data.status == "on")
      ).length * SALARY_PER_DAY
    );
  }, [cashAdvances, schedules]);
  // END FOR INFO MODAL

  // HANDLE CREATE SALARY
  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      salary_deduction: 0,
      bonus: 0,
      note: "",
    },
  });
  const mutationCreateSalary = useCreateSalary();
  const handleCreateSalary = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const salaryDataRequest = {
      bonus: formCreate.values.bonus,
      salary_deduction: formCreate.values.salary_deduction,
      cash_advance: totalCashAdvance,
      note: formCreate.values.note,
      date: month,
      amount:
        totalSalary +
        formCreate.values.bonus -
        (formCreate.values.salary_deduction + totalCashAdvance),
      employee_id: employee.id,
    };

    await mutationCreateSalary.mutateAsync(salaryDataRequest, {
      onSuccess: (data: CashAdvanceType) => {
        console.log("Success:", data);
        formCreate.reset();
        showNotification({
          message: "Berhasil menambahkan slip gaji pegawai",
          color: "green",
          position: "top-center",
        });
        RefetchSalary();
        close();
      },
    });
  };
  // END FOR HANDLE CREATE SALARY

  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-30 -mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={600} c="#654433">
            Slip gaji
          </Text>
        </div>
        <div className="flex mb-1 mr-1 gap-1"></div>
      </div>
      <Divider size={"sm"} />
      <div className="text-center mt-10">
        <div className="ml-10">
          <Image
            className="ml-15"
            src="/images/not-found.svg"
            style={{
              width: "120px",
            }}
          />
        </div>
        <div className="px-10">
          <Text fw={700} c="#343a40">
            Ups!
          </Text>
          <Text fw={700} mt={-5} size="sm" c="#343a40">
            Slip gaji belum dibuat ..
          </Text>
        </div>
        <div className="mt-2 mb-20 px-10">
          <Button color="yellow" fullWidth onClick={open}>
            Buat slip gaji
          </Button>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Buat slip gaji">
        <div className="bg-slate-200 rounded-xl shadow-sm grid grid-cols-12 p-5">
          <div className="col-span-12 -mt-2">
            <div className="flex">
              <div>
                <Text size="sm">Nama : </Text>
              </div>
              <div className="ml-2">
                <Text size="sm" fw={"bold"}>
                  {employee.name}
                </Text>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex">
              <div>
                <Text size="sm">Bulan : </Text>
              </div>
              <div className="ml-2">
                <Text size="sm" fw={"bold"}>
                  {format(month, "MMMM yyyy", { locale: id })}
                </Text>
              </div>
            </div>
            <Divider color="black" />
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Kehadiran :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {
                  schedules.filter(
                    (data) =>
                      data.attendance_status == "Present" ||
                      data.attendance_status == "Late" ||
                      (data.attendance_status == "Working" &&
                        data.status == "on")
                  ).length
                }{" "}
                hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Terlambat :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {
                  schedules.filter(
                    (data) =>
                      data.attendance_status == "Late" && data.status == "on"
                  ).length
                }{" "}
                kali
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Cuti :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {schedules.filter((data) => data.status == "off").length} hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Izin :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {schedules.filter((data) => data.status == "Leave").length} hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2 mb-1">
            <div>
              <Text size="sm">Total kasbon :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                Rp. {new Intl.NumberFormat("id-ID").format(totalCashAdvance)}
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2 mb-1">
            <div>
              <Text size="sm">Total gaji :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                Rp. {new Intl.NumberFormat("id-ID").format(totalSalary)}
              </Text>
            </div>
          </div>
        </div>
        <form onSubmit={handleCreateSalary}>
          <div className="px-2">
            <div>
              <NumberInput
                label="Potongan gaji"
                leftSection={"Rp."}
                size="sm"
                placeholder="Opsional"
                allowDecimal={false}
                decimalSeparator=","
                thousandSeparator="."
                hideControls
                key={formCreate.key("salary_deduction")}
                {...formCreate.getInputProps("salary_deduction")}
              />
            </div>
            <div>
              <NumberInput
                label="Bonus pegawai"
                leftSection={"Rp."}
                size="sm"
                placeholder="Opsional"
                allowDecimal={false}
                decimalSeparator=","
                thousandSeparator="."
                hideControls
                key={formCreate.key("bonus")}
                {...formCreate.getInputProps("bonus")}
              />
            </div>
            <div>
              <Textarea
                label="Catatan"
                placeholder="Catatan untuk pegawai"
                size="sm"
                key={formCreate.key("note")}
                {...formCreate.getInputProps("note")}
              />
            </div>
            <div className=" mt-2 mb-2">
              <Text size="10px" c={"red"}>
                *Harap periksa kembali data rekap dan inputan Anda sebelum
                menekan tombol Simpan. Setelah gaji diterbitkan, data tidak
                dapat dihapus!
              </Text>
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" color="grey" onClick={() => close()} fullWidth>
                Kembali
              </Button>
              <Button size="sm" color="blue" type="submit" fullWidth>
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </section>
  );
};
