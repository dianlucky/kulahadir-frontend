import {
  Button,
  Divider,
  FileInput,
  Image,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png";

export const FormEditBiodata: React.FC = () => {
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
  return (
    <>
      <section className="bg-white shadow-sm rounded-lg">
        <div className="flex justify-between py-2 px-5">
          <div>
            <Text fw={500} size="md">
              Edit akun
            </Text>
          </div>
          <div>
            <IconUser />
          </div>
        </div>
        <div className="px-5">
          <Divider />
        </div>
        <div className="px-5 pb-5">
          <div>
            <TextInput label="username" size="sm" />
          </div>
          <div>
            <TextInput label="password" size="sm" placeholder="optional" />
          </div>
          <div className="w-full mt-4">
            <Button fullWidth size="sm">
              Simpan
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-white shadow-sm rounded-lg mt-4 mb-20">
        <div className="flex justify-between py-2 px-5">
          <div>
            <Text fw={500} size="md">
              Edit biodata
            </Text>
          </div>
          <div>
            <IconUser />
          </div>
        </div>
        <div className="px-5">
          <Divider />
        </div>
        <div className="mt-4 px-5 space-y-4">
          <Image
            radius="md"
            src={preview}
            alt="Preview"
            className="w-full max-w-sm mx-auto rounded-lg shadow"
          />

          <div className="flex gap-4 justify-center">
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
        <div className="px-5 pb-5 mt-5">
          <div>
            <TextInput label="Nama lengkap" size="sm" />
          </div>
          <div>
            <NumberInput
              hideControls
              allowNegative={false}
              label="No Whatsapp"
              size="sm"
            />
          </div>
          <div>
            <DatePickerInput label="Tanggal lahir" />
          </div>
          <div className="w-full mt-4">
            <Button fullWidth size="sm">
              Simpan
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
