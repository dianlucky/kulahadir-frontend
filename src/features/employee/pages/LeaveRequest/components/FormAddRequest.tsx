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
import { useNavigate } from "react-router-dom";
import { useCreateLeaveRequest } from "../api";
import { LeaveRequestType } from "@/types";
import { useAuth } from "@/features/auth";
import { format } from "date-fns";
import { showNotification } from "@mantine/notifications";

export const FormAddRequest: React.FC = () => {
  const { creds } = useAuth();
  // const [status, setStatus] = useState<string | null>("sakit");
  // const [value, setValue] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      type: "",
      date: new Date(),
      reason: "",
      attachment: null as File | null,
    },
    validate: {
      reason: (value: string) =>
        value.length < 5 ? "Minimal 5 karakter" : null,
    },
  });
  const mutationCreateLeaveRequest = useCreateLeaveRequest();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formCreate.isValid()) return;

    const formData = new FormData();
    formData.append("type", formCreate.values.type);
    formData.append("date", format(formCreate.values.date, "yyyy-MM-dd"));
    formData.append("reason", formCreate.values.reason);
    if (creds?.employee_id !== undefined) {
      formData.append("employee_id", creds.employee_id.toString());
    }
    if (formCreate.values.attachment != null) {
      formData.append("profile_pic", formCreate.values.attachment);
    }

    await mutationCreateLeaveRequest.mutateAsync(formData, {
      onSuccess: (data: LeaveRequestType) => {
        console.log("Success:", data);
        formCreate.reset();
        navigate(-1);
        showNotification({
          message: "Berhasil menambah pengajuan",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };

  return (
    <div className="mt-2 p-4">
      <div className="flex justify-between mb-2">
        <div>
          <Text fw={700} size="md" c={"#222222"}>
            Ajukan izin / sakit
          </Text>
        </div>
        <div>
          <IconNotes color="#222222" />
        </div>
      </div>
      <Divider />
      <form onSubmit={handleSubmitForm}>
        <div className="mt-1">
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
        <div className="mt-1">
          <FileInput
            label="Lampiran"
            placeholder="Masukkan gambar"
            accept="image/*"
            {...formCreate.getInputProps("attachment")}
          />
        </div>
        <div className="mt-1">
          <Textarea
            size="sm"
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
