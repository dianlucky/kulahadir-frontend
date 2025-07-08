import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryData } from "../components";
import {
  Button,
  Modal,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
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
            <h2 className="font-semibold">Kelola Kategori</h2>
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
      <section>
        <div className="mt-2 px-7">
          <CategoryData />
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Tambah kategori">
        <div className="px-2 -mt-2">
          <form>
            <div className="mt-2">
              <TextInput
                label="Kode Kategori"
                size="sm"
                // key={form.key("task_code")}
                // {...form.getInputProps("task_code")}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Nama Kategori"
                placeholder="Masukkan nama kategori"
                size="sm"
                // key={form.key("task_name")}
                // {...form.getInputProps("task_name")}
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
    </>
  );
};
