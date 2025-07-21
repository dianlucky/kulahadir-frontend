import { CategoryType } from "@/types";
import {
  Button,
  Divider,
  Menu,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCategory,
  IconChevronDown,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDeleteCategory, useUpdateCategory } from "../api";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useForm } from "@mantine/form";

interface CategoryDataProps {
  categories: CategoryType[];
  RefetchCategories: () => void;
}

type UpdateCategoryRequest = {
  code?: string;
  name?: string;
};

export const CategoryData: React.FC<CategoryDataProps> = ({
  categories,
  RefetchCategories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  // DELETE CATEGORY
  const deleteCategoryMutation = useDeleteCategory();
  const deleteCategory = async (id: number | undefined) => {
    deleteCategoryMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Sukses :", data);
        setSelectedCategory(undefined);
        RefetchCategories();
        showNotification({
          message: "Kategori berhasil dihapus",
          color: "green",
          position: "top-center",
        });
        close();
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal menghapus kategori. Silakan coba lagi.";
        close();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };
  // END FOR DELETE CATEGORY

  // HANDLE EDIT CATEGORY
  const formUpdate = useForm({
    validateInputOnChange: true,
    initialValues: {
      code: selectedCategory ? selectedCategory.code : "",
      name: selectedCategory ? selectedCategory.name : "",
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

  const mutationUpdateCategory = useUpdateCategory(selectedCategory?.id);
  const handleUpdateCategory = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // if (!form.isValid()) return;

    const updateAccountData: UpdateCategoryRequest = {
      code: formUpdate.values.code,
      name: formUpdate.values.name,
    };
    await mutationUpdateCategory.mutateAsync(updateAccountData, {
      onSuccess: () => {
        RefetchCategories();
        closeEdit();
        showNotification({
          message: `Kategori berhasil diubah`,
          color: "green",
          position: "top-center",
        });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal mengubah kategori. Silakan coba lagi.";
        closeEdit();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };

  useEffect(() => {
    if (selectedCategory) {
      formUpdate.setValues({
        code: selectedCategory.code,
        name: selectedCategory.name,
      });
    }
  }, [selectedCategory]);
  // END FOR HANDLE EDIT CATEGORY
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          <span className="text-sm font-bold text-brown">Daftar Kategori</span>
          <IconCategory size={20} />
        </div>
        <Divider size="xs" className="mb-2" />
        {categories.map((data, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 px-2">
              <div className="col-span-1 m-auto">
                <Text fw={700} size="md">
                  {data.code}
                </Text>
              </div>
              <div className="col-span-1 ml-1">
                <div className="w-px h-full bg-gray-300 mx-4" />
              </div>
              <div className="col-span-8 ml-1 my-auto">
                <Text size="xs" lineClamp={2} truncate="end">
                  {data.name}
                </Text>
              </div>
              <div className="col-span-2 ml-4 flex gap-1">
                <Menu shadow="xs" position="bottom-end" width={100} withArrow>
                  <Menu.Target>
                    <Button color="gray" size={"compact-xs"}>
                      <IconChevronDown size={18} />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        openEdit();
                        setSelectedCategory(data);
                      }}
                      leftSection={<IconPencil size={14} />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={14} />}
                      onClick={() => {
                        open();
                        setSelectedCategory(data);
                      }}
                    >
                      Hapus
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <Divider />
            </div>
          </div>
        ))}
      </section>

      <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
        <div className="px-1">
          <div className=" text-center px-2">
            <Text size="sm" fw={500}>
              Apakah anda yakin ingin menghapus kategori dengan kode
            </Text>
            <Text size="sm" c={"red"} fw={700}>
              "{selectedCategory?.code} || {selectedCategory?.name}"
            </Text>
          </div>
          <div className="flex justify-betwen gap-2 mt-2 mb-2">
            <Button color="grey" size="xs" fullWidth onClick={close}>
              Kembali
            </Button>
            <Button
              color="yellow"
              size="xs"
              fullWidth
              onClick={() => {
                deleteCategory(selectedCategory?.id);
              }}
            >
              Ya! Hapus kategori
            </Button>
          </div>
        </div>
      </Modal>

      <Modal opened={openedEdit} onClose={closeEdit} title="Edit kategori">
        <div className="px-2 -mt-2">
          <form onSubmit={handleUpdateCategory}>
            <div className="mt-2">
              <TextInput
                label="Kode Kategori"
                size="sm"
                key={formUpdate.key("code")}
                {...formUpdate.getInputProps("code")}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Nama Kategori"
                placeholder="Masukkan nama kategori"
                size="sm"
                key={formUpdate.key("name")}
                {...formUpdate.getInputProps("name")}
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
