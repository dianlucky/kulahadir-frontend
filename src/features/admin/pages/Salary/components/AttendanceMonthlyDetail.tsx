import { useCreateSalary } from "@/features/owner/pages/Salaries";
import {
  CashAdvanceType,
  EmployeeType,
  SalaryType,
  ScheduleType,
} from "@/types";
import {
  Button,
  Divider,
  Modal,
  NumberInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCalendarCheck } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

interface AttendanceMonthlyDetailProps {
  salary?: SalaryType;
  selectedEmployee?: EmployeeType;
  month?: string;
  schedules?: ScheduleType[];
  cashAdvances?: CashAdvanceType[];
  RefetchSalary: () => void;
}

export const AttendanceMonthlyDetail: React.FC<
  AttendanceMonthlyDetailProps
> = ({
  month,
  schedules,
  cashAdvances,
  selectedEmployee,
  RefetchSalary,
  salary,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  // console.log(selectedEmployee);

  // INFO MODAL
  const [totalCashAdvance, setTotalCashAdvance] = useState<number>(0);
  const [totalSalary, setTotalSalary] = useState<number>(0);

  useEffect(() => {
    setTotalCashAdvance(
      cashAdvances
        ? cashAdvances
            .filter((data) => data.status === "accepted")
            .reduce((total, data) => total + data.amount, 0)
        : 0
    );
    setTotalSalary(
      (schedules
        ? schedules.filter(
            (data) =>
              data.attendance_status == "Present" ||
              (data.attendance_status == "Late" && data.status == "on")
          ).length
        : 0) * 40000
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
        formCreate.values.salary_deduction +
        totalCashAdvance,
      employee_id: selectedEmployee?.id,
    };

    await mutationCreateSalary.mutateAsync(salaryDataRequest, {
      onSuccess: (data: CashAdvanceType) => {
        console.log("Success:", data);
        formCreate.reset();
        showNotification({
          message: "Berhasil menambahkan slip gaji pegawai",
          color: "green",
          position: "bottom-right",
        });
        RefetchSalary();
        close();
      },
    });
  };
  // END FOR HANDLE CREATE SALARY

  return (
    <>
      <div className="bg-white shadow-sm p-4 mt-2">
        <div className="flex justify-between mb-1">
          <div className="text-dark font-semibold cursor-pointer text-sm">
            Detail Kehadiran & bon
          </div>
          <div>
            <IconCalendarCheck size={20} />
          </div>
        </div>
        <Divider />
        <div className="mt-2 grid grid-cols-12 px-2">
          <div className="col-span-12">
            <div className="flex">
              <div>
                <Text size="sm">Bulan : </Text>
              </div>
              <div className="ml-2">
                <Text size="sm" fw={"bold"}>
                  {month && format(month, "MMMM yyyy", { locale: id })}
                </Text>
              </div>
            </div>
            <Divider />
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Kehadiran :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {
                  schedules?.filter(
                    (data) =>
                      data.attendance_status == "Present" ||
                      data.attendance_status == "Late"
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
                  schedules?.filter((data) => data.attendance_status == "Late")
                    .length
                }{" "}
                hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Absen :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {
                  schedules?.filter(
                    (data) => data.attendance_status == "belum hadir"
                  ).length
                }{" "}
                hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Izin :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                {schedules?.filter((data) => data.status == "Leave").length}{" "}
                hari
              </Text>
            </div>
          </div>
          <div className="col-span-12 mt-2 mb-1">
            <div>
              <Text size="sm">Total kasbon :</Text>
              <Text size="sm" fw="bold" mt={-3}>
                Rp. {new Intl.NumberFormat("id-ID").format(totalCashAdvance)}
              </Text>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-2">
          <Button onClick={open} fullWidth disabled={salary ? true : false}>
            {salary ? "Slip gaji sudah dibuat" : "Buat slip gaji"}
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size={"lg"}
        >
          <div>
            <div className="w-full text-center mb-2">
              <Text fw={"bold"} size="md">
                Terbitkan gaji pegawai
              </Text>
            </div>
            <Divider />
            <div className="grid grid-cols-12 mt-2 gap-2">
              <div className="col-span-7">
                <div className="bg-white shadow-sm grid grid-cols-12 p-5">
                  <div className="col-span-12 -mt-2">
                    <div className="flex">
                      <div>
                        <Text size="sm">Nama : </Text>
                      </div>
                      <div className="ml-2">
                        <Text size="sm" fw={"bold"}>
                          {selectedEmployee?.name}
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
                          {format(month ? month : new Date(), "MMMM yyyy", {
                            locale: id,
                          })}
                        </Text>
                      </div>
                    </div>
                    <Divider />
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Kehadiran :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        {
                          schedules?.filter(
                            (data) =>
                              data.attendance_status == "Present" ||
                              data.attendance_status == "Late"
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
                          schedules?.filter(
                            (data) => data.attendance_status == "Late"
                          ).length
                        }{" "}
                        hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Absen :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        {
                          schedules?.filter(
                            (data) => data.attendance_status == "belum hadir"
                          ).length
                        }{" "}
                        hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Izin :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        {
                          schedules?.filter((data) => data.status == "Leave")
                            .length
                        }{" "}
                        hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2 mb-1">
                    <div>
                      <Text size="sm">Total kasbon :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          totalCashAdvance
                        )}
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
              </div>
              <div className="col-span-5">
                <form onSubmit={handleCreateSalary}>
                  <div className="bg-white shadow-sm p-2">
                    <div>
                      <NumberInput
                        label="Potongan gaji"
                        placeholder="Tidak wajib diisi"
                        size="xs"
                        prefix="Rp."
                        decimalSeparator=","
                        allowDecimal={false}
                        thousandSeparator="."
                        hideControls
                        key={formCreate.key("salary_deduction")}
                        {...formCreate.getInputProps("salary_deduction")}
                      />
                    </div>
                    <div>
                      <NumberInput
                        label="Bonus pegawai"
                        placeholder="Tidak wajib diisi"
                        size="xs"
                        prefix="Rp."
                        decimalSeparator=","
                        allowDecimal={false}
                        thousandSeparator="."
                        hideControls
                        key={formCreate.key("bonus")}
                        {...formCreate.getInputProps("bonus")}
                      />
                    </div>
                    <div>
                      <Textarea
                        size="xs"
                        radius="xs"
                        label="Catatan"
                        placeholder="Tambahkan catatan untuk pegawai"
                        key={formCreate.key("note")}
                        {...formCreate.getInputProps("note")}
                      />
                    </div>
                    <div className="mt-2">
                      <Text
                        size="10px"
                        c={"red"}
                        fs={"italic"}
                        className="text-justify"
                      >
                        *Cek kembali data sebelum menerbitkan gaji pegawai, Slip
                        gaji yang telah diterbitkan tidak dapat diedit dan
                        dihapus
                      </Text>
                    </div>
                    <div className="w-full flex gap-1 mt-3">
                      <Button fullWidth size="xs" color="gray" onClick={close}>
                        Kembali
                      </Button>
                      <Button fullWidth size="xs" type="submit">
                        Terbitkan
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
