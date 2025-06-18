import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskEmployeeDataSection } from "../components";
import { DailyTaskType, EmployeeType, TaskEmployeeType } from "@/types";
import {
  useCreateTaskEmployee,
  useGetAllDailyTask,
  useGetTaskByDay,
} from "@/features/admin/pages/DataMaster/DailyTask";
import {
  Button,
  Modal,
  MultiSelect,
  Select,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllEmployee } from "@/features/admin/pages/DataMaster/Employee";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const TaskEmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  console.log("Hari :", format(new Date(), "EEEE", { locale: id }));
  // GET TASK EMPLOYEE
  const [daySelect, setSelectedDay] = useState<string | null>(
    format(new Date(), "EEEE", { locale: id })
  );
  const [taskEmployees, setTaskEmployees] = useState<TaskEmployeeType[]>([]);
  const { data: DataTaskEmployee, refetch: RefetchTaskEmployee } =
    useGetTaskByDay(daySelect);
  useEffect(() => {
    if (DataTaskEmployee) {
      setTaskEmployees(DataTaskEmployee);
    }
  }, [DataTaskEmployee]);
  useEffect(() => {
    if (daySelect) {
      RefetchTaskEmployee();
    }
  }, [daySelect, RefetchTaskEmployee]);
  // END OF GET TASK EMPLOYEE

  //   GET EMPLOYEES
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { data: DataEmployee } = useGetAllEmployee();
  useEffect(() => {
    if (DataEmployee) {
      setEmployees(DataEmployee);
    }
  }, [DataEmployee]);

  const selectEmployee = employees
    .filter(
      (employee) => employee.account && employee.account.level === "Pegawai"
    )
    .map((employee) => ({
      value: employee.id.toString(),
      label: employee.name,
    }));
  //   END FOR GET EMPLOYEES

  // GET DATA DAILY TASK
  const [tasks, setTasks] = useState<DailyTaskType[]>([]);
  const { data: DataTasks } = useGetAllDailyTask();
  useEffect(() => {
    if (DataTasks) {
      setTasks(DataTasks);
    }
  }, [DataTasks]);

  const selectTaskCode = tasks.map((task) => ({
    value: task.id.toString(),
    label: `${task.task_code} | ${task.task_name}`,
  }));
  // END FOR GET DATA DAILY TASK

  // CREATE TASK EMPLOYEE
  const [selectedCode, setSelectedCode] = useState<string[]>([]);
  const formCreateTaskEmployee = useForm({
    validateInputOnChange: true,
    initialValues: {
      day: "",
      employee_id: "",
    },
  });
  const mutationCreateEmployee = useCreateTaskEmployee();
  const handleSubmitFormTaskEmployee = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (selectedCode.length === 0) {
      console.error("Tidak ada kode tugas yang dipilih.");
      return;
    }

    const day = formCreateTaskEmployee.values.day;
    const employee_id = parseInt(formCreateTaskEmployee.values.employee_id);

    try {
      const promises = selectedCode.map((taskIdStr) => {
        const task_id = parseInt(taskIdStr);
        const payload = { day, employee_id, task_id };
        return mutationCreateEmployee.mutateAsync(payload);
      });

      await Promise.all(promises);

      console.log("Semua data berhasil dikirim!");
      formCreateTaskEmployee.reset();
      setSelectedCode([]);
      RefetchTaskEmployee();
      showNotification({
        message: "Tugas pegawai berhasil ditambahkan",
        color: "green",
        position: "top-center",
      });
      close();
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };
  // END OF CREATE TASK EMPLOYEE

  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Data Tugas Pegawai</h2>
          </div>
          <div>
            <div className="mr-2">
              <UnstyledButton onClick={open}>
                <IconPlus size={22} />
              </UnstyledButton>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-2 px-5 mb-20">
        <TaskEmployeeDataSection
          taskEmployee={taskEmployees}
          setSelectedDay={setSelectedDay}
          RefetchTaskEmployee={RefetchTaskEmployee}
        />
      </section>

      <Modal opened={opened} onClose={close} title="Tambah tugas pegawai">
        <form onSubmit={handleSubmitFormTaskEmployee} className="-mt-1">
          <Select
            label="Hari"
            size="sm"
            withAsterisk
            data={[
              { label: "Senin", value: "Senin" },
              { label: "Selasa", value: "Selasa" },
              { label: "Rabu", value: "Rabu" },
              { label: "Kamis", value: "Kamis" },
              { label: "Jumat", value: "Jumat" },
              { label: "Sabtu", value: "Sabtu" },
              { label: "Minggu", value: "Minggu" },
            ]}
            {...formCreateTaskEmployee.getInputProps("day")}
          />
          <Select
            withAsterisk
            label="Pegawai"
            placeholder="Pegawai"
            data={selectEmployee}
            {...formCreateTaskEmployee.getInputProps("employee_id")}
          />
          <MultiSelect
            withAsterisk
            label="Kode tugas"
            placeholder="Kode tugas"
            data={selectTaskCode}
            value={selectedCode}
            onChange={setSelectedCode}
          />

          <div className="flex justify-between gap-2 mt-4 mb-5">
            <Button color="grey" fullWidth onClick={close}>
              Kembali
            </Button>
            <Button type="submit" fullWidth>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
