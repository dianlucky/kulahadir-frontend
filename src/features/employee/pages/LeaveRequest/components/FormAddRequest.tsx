import {
  Button,
  Divider,
  FileInput,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconNotes } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormAddRequest: React.FC = () => {
  const [status, setStatus] = useState<string | null>("sakit");
  const [value, setValue] = useState<Date | null>(new Date());
  const navigate = useNavigate();
  return (
    <div className="mt-2 p-4">
      <div className="flex justify-between mb-2">
        <div>
          <Text fw={"bold"} size="md" c={"#222222"}>
            Ajukan izin / sakit
          </Text>
        </div>
        <div>
          <IconNotes color="#222222" />
        </div>
      </div>
      <Divider />
      <div className="mt-2">
        <Select
          label="Tipe pengajuan"
          size="sm"
          value={status}
          onChange={setStatus}
          data={[
            { label: "sakit", value: "sakit" },
            { label: "izin", value: "izin" },
          ]}
        />
      </div>
      <div className="mt-1">
        <DatePickerInput
          label="Tanggal izin"
          size="sm"
          placeholder="Pick date"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="mt-1">
        <FileInput label="Lampiran" placeholder="Masukkan gambar" />
      </div>
      <div className="mt-1">
        <Textarea label="Keterangan" placeholder="Masukkan alasan pengajuan" />
      </div>
      <div className="mt-4 flex justify-between gap-2">
        <Button
          size="sm"
          onClick={() => {
            navigate("/leave-request");
          }}
          fullWidth
          color="gray"
        >
          Kembali
        </Button>
        <Button type="submit" fullWidth>
          Ajukan
        </Button>
      </div>
    </div>
  );
};
