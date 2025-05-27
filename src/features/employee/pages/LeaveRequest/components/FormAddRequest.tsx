import {
  Button,
  Divider,
  FileInput,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconNotes } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateLeaveRequest } from "../api";
import { LeaveRequestType } from "@/types";

export const FormAddRequest: React.FC = () => {
  const [status, setStatus] = useState<string | null>("sakit");
  const [value, setValue] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      type: "",
      date: new Date(),
      reason: "",
    },
    validate: {
      date: (value) =>
        value instanceof Date && !isNaN(value.getTime())
          ? null
          : "Tanggal tidak valid",
      reason: (value) => (value.length < 5 ? "Minimal 5 karakter" : null),
    },
  });
  const mutationCreateLeaveRequest = useCreateLeaveRequest();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formCreate.isValid()) return;

    const leaveRequestData = {
      type: formCreate.values.type,
      date: formCreate.values.date,
      reason: formCreate.values.reason,
      employee_id: 1,
    };

    await mutationCreateLeaveRequest.mutateAsync(leaveRequestData, {
      onSuccess: (data: LeaveRequestType) => {
        console.log("Success:", data);
        // setSuccessAdd(true);
        formCreate.reset();
        close();

        // setTimeout(() => {
        //   setSuccessAdd(false);
        // }, 4500);
      },
    });
  };

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
      <form onSubmit={handleSubmitForm}>
        <div className="mt-2">
          <Select
            label="Tipe pengajuan"
            size="sm"
            data={[
              { label: "sakit", value: "sakit" },
              { label: "izin", value: "izin" },
            ]}
            {...formCreate.getInputProps("type")}
          />
        </div>
        <div className="mt-1">
          <DatePickerInput
            label="Tanggal izin"
            size="sm"
            placeholder="Pick date"
            key={formCreate.key("date")}
            {...formCreate.getInputProps("date")}
            onChange={(value) => {
              if (value) formCreate.setFieldValue("date", value);
            }}
          />
        </div>
        {/* <div className="mt-1">
          <FileInput label="Lampiran" placeholder="Masukkan gambar" />
        </div> */}
        <div className="mt-1">
          <Textarea
            label="Keterangan"
            placeholder="Masukkan alasan pengajuan"
            key={formCreate.key("reason")}
            {...formCreate.getInputProps("reason")}
          />
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
      </form>
    </div>
  );
};
