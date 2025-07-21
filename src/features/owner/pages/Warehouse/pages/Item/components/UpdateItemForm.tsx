import { Button, Image, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";

const DEFAULT_IMAGE = "/images/splash.png";

export const UpdateItemform: React.FC = () => {
  // IMAGE UPLOAD HANDLER
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(DEFAULT_IMAGE);
  };
  console.log(file);
  // END FOR IMAGE UPLOAD HANDLER

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-2">
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
              <Button component="span" variant="filled" color="blue" fullWidth>
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
            <TextInput size="sm" label="Kode barang" withAsterisk />
          </div>
          <div className="mt-1">
            <TextInput size="sm" label="Nama barang" withAsterisk />
          </div>
          <div className="mt-1">
            <Select
              size="sm"
              withAsterisk
              allowDeselect={false}
              label="Kategori"
              checkIconPosition="right"
              comboboxProps={{ withinPortal: false }}
              data={["Powder", "Sirup sirupan"]}
            />
          </div>
          <div className="my-4 flex justify-between gap-1">
            <Button size="sm" fullWidth>
              {" "}
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
