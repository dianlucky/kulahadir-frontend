import {
  useCreateDailyTask,
  useGetAllDailyTask,
} from "@/features/admin/pages/DataMaster/DailyTask";
import { DailyTaskType } from "@/types";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DailyTaskDataSection } from "../components";
import {
  Button,
  Modal,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

export const DailyTaskDataPage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  //   GET DAILY TASK
  const [dailyTask, setDailyTask] = useState<DailyTaskType[]>([]);
  const { data: DataDailyTask, refetch: RefetchDailyTask } =
    useGetAllDailyTask();
  useEffect(() => {
    if (DataDailyTask) {
      setDailyTask(DataDailyTask);
    }
  }, [DataDailyTask]);

  console.log(dailyTask);
  //   END FOR GET DAILY TASK

  //   CREATE DAILY TASK
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      task_code: "",
      task_name: "",
    },
    validate: {
      task_name: (value: string) =>
        value.length < 10 ? "Minimal 10 karakter" : null,
      task_code: (value: string) => {
        if (value.length < 2) {
          return "Minimal 2 karakter";
        }
        if (value.length > 4) {
          return "Kode Tugas tidak boleh lebih dari 4 karakter";
        }
        return null;
      },
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
        form.reset();
        RefetchDailyTask();
        showNotification({
          message: "Tugas harian berhasil ditambahkan",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  //   END FOR CREATE DAILY TASK
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
            <h2 className="font-semibold">Data Tugas Harian</h2>
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
      <section className="mt-2 px-7">
        <DailyTaskDataSection dailyTask={dailyTask} refetchDailyTask={RefetchDailyTask} />
      </section>

      <Modal opened={opened} onClose={close} title="Tambah tugas harian">
        <div className="px-3">
          <form onSubmit={handleSubmitForm}>
            <div className="mt-2">
              <TextInput
                label="Kode Tugas"
                size="sm"
                key={form.key("task_code")}
                {...form.getInputProps("task_code")}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Nama Tugas"
                placeholder="Masukkan nama tugas"
                size="sm"
                key={form.key("task_name")}
                {...form.getInputProps("task_name")}
              />
            </div>
            <div className="flex justify-between gap-2 mt-4 mb-5">
              <Button size="sm" onClick={close} fullWidth color="gray">
                Kembali
              </Button>
              <Button type="submit" fullWidth>
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </main>
  );
};
