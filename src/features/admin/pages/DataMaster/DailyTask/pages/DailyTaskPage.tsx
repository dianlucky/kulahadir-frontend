import { DailyTaskType } from "@/types";
import {
  Button,
  CloseButton,
  Divider,
  Notification,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  useCreateDailyTask,
  useDeleteDailyTask,
  useGetAllDailyTask,
} from "../api";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";

export const DailyTaskPage: React.FC = () => {
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [task, setTask] = useState<DailyTaskType>();
  // console.log("Task yang dihapus : ", task);

  // GET DATA DAILY TASK
  const [tasks, setTasks] = useState<DailyTaskType[]>([]);
  const { data: DataTasks, refetch: RefectchDailyTask } = useGetAllDailyTask();
  useEffect(() => {
    if (DataTasks) {
      setTasks(DataTasks);
    }
  }, [DataTasks]);
  // console.log(tasks)
  const rows = tasks.map((task, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{task.task}</Table.Td>
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
      task: "",
    },
    validate: {
      task: (value) => (value.length < 10 ? "Minimal 10 karakter" : null),
    },
  });
  const mutationAddLateRequest = useCreateDailyTask();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.isValid()) return;
    const educationData = {
      id: null,
      task: form.values.task,
    };

    await mutationAddLateRequest.mutateAsync(educationData, {
      onSuccess: (data: DailyTaskType) => {
        console.log("Success:", data);
        setSuccessAdd(true);
        form.values.task = "";
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
  return (
    <>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="col-span-8">
          <section className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex">
              <div>
                <div className="text-dark font-semibold cursor-pointer text-lg">
                  Tugas harian
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Table className="text-dark font-semibold cursor-pointer text-sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="font-semibold">No</Table.Th>
                    <Table.Th className="font-semibold">Tugas</Table.Th>
                    <Table.Th className="font-semibold">Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </div>
          </section>
        </div>
        <div className="col-span-4">
          <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg">
            <div>
              <div className="text-dark font-semibold cursor-pointer text-lg mb-2">
                Tambah tugas harian
              </div>
              <Divider />
              <div className="mt-2">
                <form onSubmit={handleSubmitForm}>
                  <TextInput
                    label="Nama tugas"
                    className="mb-4"
                    placeholder="Tugas"
                    key={form.key("task")}
                    {...form.getInputProps("task")}
                  />
                  <div className="flex justify-center">
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
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
                    "{task?.task}"
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
