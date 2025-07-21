import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryData, CategorySkeleton } from "../components";
import {
  Button,
  Modal,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CategoryType } from "@/types";
import { useCreateCategory, useGetAllCategory } from "../api";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

export const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  // GET ALL CATEGORY
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const {
    data: DataCategories,
    refetch: RefetchCategories,
    isLoading: LoadingCategories,
  } = useGetAllCategory();

  useEffect(() => {
    if (DataCategories) {
      setCategories(DataCategories);
    } else {
      setCategories([]);
    }
  }, [DataCategories]);
  // END FOR GET ALL CATEGORY

  // CREATE CATEGORY
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      code: "",
      name: "",
    },
    validate: {
      name: (value: string) => (value.length < 5 ? "Minimal 5 Karakter" : null),
      code: (value: string) => {
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
  const mutationCreateCategory = useCreateCategory();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.isValid()) return;
    const createRequest = {
      code: form.values.code,
      name: form.values.name,
    };

    await mutationCreateCategory.mutateAsync(createRequest, {
      onSuccess: (data: CategoryType) => {
        console.log("Success:", data);
        form.reset();
        RefetchCategories();
        showNotification({
          message: "Berhasil menambahkan kategori baru",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END FOR CREATE CATEGORY
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
          {LoadingCategories ? (
            <CategorySkeleton />
          ) : (
            <CategoryData
              categories={categories}
              RefetchCategories={RefetchCategories}
            />
          )}
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Tambah kategori">
        <div className="px-2 -mt-2">
          <form onSubmit={handleSubmitForm}>
            <div className="mt-2">
              <TextInput
                label="Kode Kategori"
                size="sm"
                key={form.key("code")}
                {...form.getInputProps("code")}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Nama Kategori"
                placeholder="Masukkan nama kategori"
                size="sm"
                key={form.key("name")}
                {...form.getInputProps("name")}
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
