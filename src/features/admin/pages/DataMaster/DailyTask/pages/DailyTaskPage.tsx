import { DailyTaskType, EmployeeType, TaskEmployeeType } from "@/types";
import {
  Button,
  CloseButton,
  Collapse,
  Divider,
  Loader,
  Notification,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  useCreateDailyTask,
  useCreateTaskEmployee,
  useDeleteDailyTask,
  useDeleteTaskEmployee,
  useGetAllDailyTask,
  useGetAllTaskEmployee,
  useGetTaskByDay,
} from "../api";
import { useForm } from "@mantine/form";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { WeeklyTaskSection } from "../components";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllEmployee } from "../../Employee";

export const DailyTaskPage: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [weeklyTask, { toggle: toggleWeeklyTask }] = useDisclosure(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isDeleteTask, setDeleteTask] = useState(false);
  const [taskEmployee, setTaskEmployee] = useState<TaskEmployeeType | null>();
  const [task, setTask] = useState<DailyTaskType>();
  // console.log("Task yang dihapus : ", task);

  // GET EMPLOYEES
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { data: DataEmployee, refetch: RefetchEmployee } = useGetAllEmployee();
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

  // ===========

  // GET DATA DAILY TASK
  const [tasks, setTasks] = useState<DailyTaskType[]>([]);
  const { data: DataTasks, refetch: RefectchDailyTask } = useGetAllDailyTask();
  useEffect(() => {
    if (DataTasks) {
      setTasks(DataTasks);
    }
  }, [DataTasks]);

  const selectTaskCode = tasks.map((task) => ({
    value: task.id.toString(),
    label: task.task_name,
  }));
  // console.log(tasks)
  const rows = tasks.map((task, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{task.task_code}</Table.Td>
      <Table.Td>{task.task_name}</Table.Td>
      <Table.Td className="w-40">
        <Button
          size="xs"
          color="red"
          onClick={() => {
            setDelete(true);
            setTask(task);
          }}
        >
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  // END GET DAILY TASK

  // CREATE DAILY TASK
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      task_code: "",
      task_name: "",
    },
    validate: {
      task_name: (value) => (value.length < 10 ? "Minimal 10 karakter" : null),
      task_code: (value) => (value.length < 2 ? "Minimal 2 karakter" : null),
    },
  });
  const mutationAddLateRequest = useCreateDailyTask();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.isValid()) return;
    const createRequest = {
      id: null,
      task_code: form.values.task_code,
      task_name: form.values.task_name,
    };

    await mutationAddLateRequest.mutateAsync(createRequest, {
      onSuccess: (data: DailyTaskType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        form.reset();
        RefectchDailyTask();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END CREATE DAILY TASK
  // DELETE DAILY TASK
  const deleteDailyTaskMutation = useDeleteDailyTask();
  const deleteDailyTask = async (id: number | undefined) => {
    deleteDailyTaskMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setSuccessDelete(true);
        setDelete(false);
        RefectchDailyTask();
        close();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 4500);
      },
    });
  };
  // END DELETE DAILY TASK

  // ===================================================================== //

  // GET TASK EMPLOYEE
  const [daySelect, setDaySelect] = useState<string | null>("Senin");
  const [taskEmployees, setTaskEmployees] = useState<TaskEmployeeType[]>([]);
  const {
    data: DataTaskEmployee,
    refetch: RefetchTaskEmployee,
    isLoading: LoadingTaskEmployee,
  } = useGetTaskByDay(daySelect);
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
  console.log("Data task employee :", taskEmployees);
  // END OF GET TASK EMPLOYEE

  // CREATE TASK EMPLOYEE
  const formCreateTaskEmployee = useForm({
    validateInputOnChange: true,
    initialValues: {
      day: "",
      employee_id: "",
      task_id: "",
    },
  });
  const mutationCreateEmployee = useCreateTaskEmployee();
  const handleSubmitFormTaskEmployee = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const employeeData = {
      day: formCreateTaskEmployee.values.day,
      task_id: parseInt(formCreateTaskEmployee.values.task_id),
      employee_id: parseInt(formCreateTaskEmployee.values.employee_id),
    };

    await mutationCreateEmployee.mutateAsync(employeeData, {
      onSuccess: (data: EmployeeType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        formCreateTaskEmployee.reset();
        RefetchTaskEmployee();
        close();

        setTimeout(() => {
          setSuccessAdd(false);
        }, 4500);
      },
    });
  };
  // END OF CREATE TASK EMPLOYEE

  // DELETE DAILY TASK
  const deleteTaskEmployeeMutation = useDeleteTaskEmployee();
  const deleteTaskEmployee = async (id: number | undefined) => {
    deleteTaskEmployeeMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setSuccessDelete(true);
        setDeleteTask(false);
        RefetchTaskEmployee();
        close();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 4500);
      },
    });
  };
  // END DELETE DAILY TASK

  if (LoadingTaskEmployee) {
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="col-span-9">
          <section className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex">
              <div>
                <div className="text-dark font-semibold cursor-pointer text-lg">
                  Daftar tugas
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Table
                striped
                highlightOnHover
                withTableBorder
                withColumnBorders
                className="text-dark font-semibold cursor-pointer text-sm"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="font-semibold">No</Table.Th>
                    <Table.Th className="font-semibold">Kode tugas</Table.Th>
                    <Table.Th className="font-semibold">Nama tugas</Table.Th>
                    <Table.Th className="font-semibold">Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </div>
          </section>
          {!LoadingTaskEmployee && (
            <section>
              <div className="mt-2">
                <WeeklyTaskSection
                  taskEmployees={taskEmployees}
                  daySelect={daySelect}
                  setDaySelect={setDaySelect}
                  setDeleteTask={setDeleteTask}
                  setTaskEmployee={setTaskEmployee}
                />
              </div>
            </section>
          )}
        </div>
        <div className="col-span-3">
          <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg">
            <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                  Tambah tugas
                </div>
                <div className="col-span-2 -mt-1">
                  <Button
                    color="blue"
                    className="shadow-lg"
                    size="xs"
                    onClick={toggle}
                  >
                    <IconPencil size={20} color="white" />
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="mt-2">
                <Collapse in={opened}>
                  <form onSubmit={handleSubmitForm}>
                    <TextInput
                      size="md"
                      label="Kode tugas"
                      className="mb-2"
                      placeholder="Tugas"
                      key={form.key("task_code")}
                      {...form.getInputProps("task_code")}
                    />
                    <TextInput
                      size="md"
                      label="Nama tugas"
                      className="mb-4"
                      placeholder="Tugas"
                      key={form.key("task_name")}
                      {...form.getInputProps("task_name")}
                    />
                    <div className="flex justify-center">
                      <Button type="submit" fullWidth>
                        Simpan
                      </Button>
                    </div>
                  </form>
                </Collapse>
              </div>
            </div>
          </section>
          <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
            <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                  Tambah tugas mingguan
                </div>
                <div className="col-span-2 -mt-1">
                  <Button
                    color="blue"
                    className="shadow-lg"
                    size="xs"
                    onClick={toggleWeeklyTask}
                  >
                    <IconPencil size={20} color="white" />
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="mt-2">
                <Collapse in={weeklyTask}>
                  <form onSubmit={handleSubmitFormTaskEmployee}>
                    <Select
                      label="Hari"
                      size="xs"
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
                      label="Nama tugas"
                      placeholder="Nama tugas"
                      data={selectTaskCode}
                      {...formCreateTaskEmployee.getInputProps("task_id")}
                    />
                    <Select
                      withAsterisk
                      label="Pegawai"
                      placeholder="Pegawai"
                      data={selectEmployee}
                      {...formCreateTaskEmployee.getInputProps("employee_id")}
                    />
                    <div className="flex justify-center mt-3">
                      <Button type="submit" fullWidth>
                        Simpan
                      </Button>
                    </div>
                  </form>
                </Collapse>
              </div>
            </div>
          </section>
          {isDelete ? (
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                    Hapus tugas
                  </div>
                  <CloseButton
                    onClick={() => setDelete(false)}
                    className="col-span-2 flex left-1"
                  ></CloseButton>
                </div>
                <Divider />
                <div className="mt-4 text-center">
                  <Text size="md" fw={500}>
                    Apakah anda yakin ingin menghapus data tugas ?
                  </Text>
                  <Text size="md" c={"red"} fw={600}>
                    "{task?.task_name}"
                  </Text>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={() => deleteDailyTask(task?.id)}
                    type="submit"
                    color="red"
                  >
                    Ya!
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
          {isDeleteTask ? (
            <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
                    Hapus tugas mingguan
                  </div>
                  <CloseButton
                    onClick={() => setDelete(false)}
                    className="col-span-2 flex left-1"
                  ></CloseButton>
                </div>
                <Divider />
                <div className="mt-4 text-center">
                  <Text size="md" fw={500}>
                    Apakah anda yakin ingin menghapus data tugas mingguan?
                  </Text>
                  <Text size="md" c={"red"} fw={600}>
                    "{taskEmployee?.day}" | "{taskEmployee?.employee.name}" | "
                    {taskEmployee?.task.task_name}"
                  </Text>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={() => deleteTaskEmployee(taskEmployee?.id)}
                    type="submit"
                    color="red"
                  >
                    Ya!
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50 w-100">
        {successAdd && (
          <Notification color="teal" title="Berhasil!" mt="md">
            Data berhasil ditambahkan
          </Notification>
        )}
        {successDelete && (
          <Notification color="teal" title="Berhasil!" mt="md">
            Data berhasil dihapus
          </Notification>
        )}
      </div>
    </>
  );
};
