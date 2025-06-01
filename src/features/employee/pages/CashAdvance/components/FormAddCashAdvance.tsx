import {
  Button,
  Divider,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCoins } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useCreateCashAdvance } from "../api";
import { CashAdvanceType } from "@/types";
import { useAuth } from "@/features/auth";
import { showNotification } from "@mantine/notifications";

export const FormAddCashAdvance: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();

  const formCreate = useForm({
    validateInputOnChange: true,
    initialValues: {
      date: new Date(),
      reason: "",
      amount: 0,
    },
    validate: {
      date: (value) =>
        value instanceof Date && !isNaN(value.getTime())
          ? null
          : "Tanggal tidak valid",
      amount: (value) => (value < 10000 ? "Jumalah kasbon tidak valid" : null),
      reason: (value) => (value.length < 5 ? "Minimal 5 karakter" : null),
    },
  });
  const mutationCreateLeaveRequest = useCreateCashAdvance();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formCreate.isValid()) return;

    const cashAdvanceData = {
      amount: formCreate.values.amount,
      date: formCreate.values.date,
      reason: formCreate.values.reason,
      employee_id: creds?.employee_id,
    };

    await mutationCreateLeaveRequest.mutateAsync(cashAdvanceData, {
      onSuccess: (data: CashAdvanceType) => {
        console.log("Success:", data);
        formCreate.reset();
        navigate(-1);
        showNotification({
          message: "Berhasil menambah pengajuan kasbon",
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
          <Text fw={"bold"} size="md" c={"#222222"}>
            Ajukan kasbon
          </Text>
        </div>
        <div>
          <IconCoins color="#222222" />
        </div>
      </div>
      <Divider />
      <div className="px-3">
        <form onSubmit={handleSubmitForm}>
          <div className="mt-2">
            <TextInput
              label="Tanggal"
              placeholder={`${format(new Date(), "EEEE, dd MMMM yyyy", {
                locale: id,
              })}`}
              size="md"
              disabled
              key={formCreate.key("date")}
              {...formCreate.getInputProps("date")}
            />
          </div>
          <div className="mt-2">
            <NumberInput
              label="Jumlah"
              leftSection={"Rp."}
              size="sm"
              allowDecimal={false}
              decimalSeparator=","
              thousandSeparator="."
              hideControls
              key={formCreate.key("amount")}
              {...formCreate.getInputProps("amount")}
            />
          </div>
          <div className="mt-2">
            <Textarea
              label="Alasan"
              placeholder="alasan pengajuan kasbon"
              size="md"
              key={formCreate.key("reason")}
              {...formCreate.getInputProps("reason")}
            />
          </div>
          <div className="flex justify-between gap-2 mt-4 mb-5">
            <Button
              size="sm"
              onClick={() => {
                navigate("/cash-advance-request");
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
    </div>
  );
};
