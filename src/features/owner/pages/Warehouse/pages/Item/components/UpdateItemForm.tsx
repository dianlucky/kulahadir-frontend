import { CategoryType, ItemType } from "@/types";
import { Button, Image, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { useUpdateItemById } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useGetAllCategory } from "../../Category";

interface UpdateItemFormSection {
  item: ItemType;
}

type FormValues = {
  name: string;
  code: string;
  category_id: string;
  image: File | string | null;
};

const DEFAULT_IMAGE = "/images/splash.png";
const BaseURL = import.meta.env.VITE_API_URL;

export const UpdateItemform: React.FC<UpdateItemFormSection> = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // GET CATEGORIES
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { data: DataCategories } = useGetAllCategory();
  useEffect(() => {
    if (DataCategories) {
      setCategories(DataCategories);
    }
  }, [DataCategories]);

  const selectCategory = categories
    .filter((category) => {
      if (pathname.includes("frozen")) {
        return category.name.toLowerCase() === "frozen";
      }
      return true; // kalau bukan frozen, tampilkan semua
    })
    .map((category) => ({
      value: category.id.toString(),
      label: category.name,
    }));
  // END FOR GET CATEGORIES

  // UPDATE ITEMS
  const formUpdate = useForm<FormValues>({
    validateInputOnChange: true,
    initialValues: {
      name: item?.name || "",
      code: item?.code || "",
      category_id: item?.category_id.toString() || "",
      image: item?.image || null,
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

  // IMAGE UPLOAD HANDLER
  const [preview, setPreview] = useState<string>(
    item?.image ? `${BaseURL}/uploads/items/${item.image}` : DEFAULT_IMAGE
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      formUpdate.setFieldValue("image", selectedFile);
    }
  };

  const handleRemove = () => {
    setPreview(DEFAULT_IMAGE);
  };
  // END FOR IMAGE UPLOAD HANDLER

  const mutationUpdateItem = useUpdateItemById(item.id);
  const handleUpdateItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("code", formUpdate.values.code);
    formData.append("name", formUpdate.values.name);
    formData.append("category_id", String(formUpdate.values.category_id));
    if (formUpdate.values.image != null) {
      formData.append("image", formUpdate.values.image);
    }

    await mutationUpdateItem.mutateAsync(formData, {
      onSuccess: (data: ItemType) => {
        console.log("Success:", data);
        formUpdate.reset();
        setPreview(DEFAULT_IMAGE);
        navigate(-1);
        showNotification({
          message: "Berhasil mengubah data barang",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END OF UPDATE ITEMS

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-2">
        <form onSubmit={handleUpdateItem}>
          <div className="mt-4 px-5 space-y-40">
            <Image
              radius="md"
              src={preview}
              alt="Preview"
              className="w-full max-w-sm mx-auto rounded-lg shadow"
            />
            <div className="flex gap-4 justify-center -mt-36">
              <label htmlFor="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
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
          <div className="mt-2 px-4">
            <div>
              <TextInput
                size="sm"
                label="Kode barang"
                withAsterisk
                key={formUpdate.key("code")}
                {...formUpdate.getInputProps("code")}
              />
            </div>
            <div className="mt-1">
              <TextInput
                size="sm"
                label="Nama barang"
                withAsterisk
                key={formUpdate.key("name")}
                {...formUpdate.getInputProps("name")}
              />
            </div>
            <div className="mt-1">
              <Select
                size="sm"
                withAsterisk
                allowDeselect={false}
                label="Kategori"
                checkIconPosition="right"
                comboboxProps={{ withinPortal: false }}
                data={selectCategory}
                {...formUpdate.getInputProps("category_id")}
              />
            </div>
            <div className="my-4 flex justify-between gap-1">
              <Button type="submit" size="sm" fullWidth>
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
