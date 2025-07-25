import {
  Button,
  Image,
  Modal,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemData } from "../components";
import { useForm } from "@mantine/form";
import { useCreateItem, useGetByCategory } from "../api";
import { showNotification } from "@mantine/notifications";
import { CategoryType, ItemType } from "@/types";
import { CategorySkeleton, useGetAllCategory } from "../../Category";
import { AxiosError } from "axios";

const DEFAULT_IMAGE = "/images/splash.png";

export const ItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  let category: string = "";
  // GET URL DATA
  const location = useLocation();
  if (location.pathname.includes("frozen")) {
    category = "Frozen";
  } else {
    category = "!Frozen";
  }
  // END FOR GET URL DATA

  // GET ITEM DATA
  const [items, setItems] = useState<ItemType[]>([]);
  const {
    data: DataItems,
    isLoading: LoadingItems,
    refetch: RefetchItems,
  } = useGetByCategory(category);
  useEffect(() => {
    if (DataItems) {
      setItems(DataItems);
    } else {
      setItems([]);
    }
  }, [DataItems]);
  // END FOR GET ITEM DATA

  // IMAGE UPLOAD HANDLER
  // const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    formCreate.setFieldValue("image", selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = () => {
    setPreview(DEFAULT_IMAGE);
  };
  // END FOR IMAGE UPLOAD HANDLER

  // GET CATEGORIES
  const [frozenCategoryId, setFrozenCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { data: DataCategories } = useGetAllCategory();
  useEffect(() => {
    if (DataCategories) {
      setCategories(DataCategories);

      if (location.pathname.includes("frozen")) {
        const frozenCategory = DataCategories.find(
          (category: any) => category.name.toLowerCase() === "frozen"
        );
        if (frozenCategory) {
          setFrozenCategoryId(frozenCategory.id.toString());
          formCreate.setFieldValue("category_id", frozenCategoryId);
        }
      }
    }
  }, [DataCategories]);
  const selectCategory = categories
    .filter((category) => {
      if (location.pathname.includes("frozen")) {
        return category.name.toLowerCase() === "frozen";
      }
      return true; // kalau bukan frozen, tampilkan semua
    })
    .map((category) => ({
      value: category.id.toString(),
      label: category.name,
    }));
  // END FOR GET CATEGORIES

  // CREATE ITEM
  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      code: "",
      name: "",
      category_id: frozenCategoryId ?? "",
      stock: 0 as number,
      image: null as File | null,
    },
    validate: {
      name: (value: string) => (value.length < 5 ? "Minimal 5 Karakter" : null),
      code: (value: string) => {
        if (value.length < 2) {
          return "Minimal 2 karakter";
        }
        if (value.length > 4) {
          return "Kode Barang tidak boleh lebih dari 4 karakter";
        }
        return null;
      },
    },
  });
  const mutationCreateItem = useCreateItem();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formCreate.isValid()) return;

    const formData = new FormData();
    formData.append("code", formCreate.values.code);
    formData.append("name", formCreate.values.name);
    formData.append("stock", String(formCreate.values.stock));
    formData.append("category_id", formCreate.values.category_id);
    if (formCreate.values.image != null) {
      formData.append("image", formCreate.values.image);
    }

    await mutationCreateItem.mutateAsync(formData, {
      onSuccess: (data: ItemType) => {
        console.log("Success:", data);
        formCreate.reset();
        close();
        handleRemove();
        RefetchItems();
        showNotification({
          message: "Berhasil menambah data barang",
          color: "green",
          position: "top-center",
        });
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
  // END FOR CREATE ITEM

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
            <h2 className="font-semibold">Kelola Barang</h2>
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
        <div className="mt-2 px-5">
          {LoadingItems ? <CategorySkeleton /> : <ItemData items={items} />}
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Tambah data barang">
        <div className="px-2 -mt-2">
          <form onSubmit={handleSubmitForm}>
            <div className="mt-4 px-1  grid grid-cols-12">
              <div className="col-span-6">
                <Image
                  radius="md"
                  src={preview}
                  alt="Preview"
                  className="w-full max-w- mx-auto rounded-lg shadow"
                />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5 my-auto">
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    mb={8}
                    component="span"
                    variant="filled"
                    color="blue"
                    fullWidth
                  >
                    Upload Foto
                  </Button>
                </label>

                <Button
                  variant="outline"
                  color="red"
                  onClick={handleRemove}
                  disabled={preview === DEFAULT_IMAGE}
                  fullWidth
                >
                  Hapus Foto
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <TextInput
                label="Kode Barang"
                size="sm"
                withAsterisk
                key={formCreate.key("code")}
                {...formCreate.getInputProps("code")}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Nama Barang"
                withAsterisk
                placeholder="Masukkan nama barang"
                size="sm"
                key={formCreate.key("name")}
                {...formCreate.getInputProps("name")}
              />
            </div>
            <div className="mt-2">
              <NumberInput
                label="Stok awal"
                size="sm"
                placeholder=""
                allowDecimal={false}
                hideControls
                key={formCreate.key("stock")}
                {...formCreate.getInputProps("stock")}
              />
            </div>
            <div className="mt-2">
              <Select
                withAsterisk
                label="Kategori barang"
                placeholder="Kategori"
                data={selectCategory}
                {...formCreate.getInputProps("category_id")}
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
