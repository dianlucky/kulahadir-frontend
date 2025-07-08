import { useAuth } from "@/features/auth";
import { CashAdvanceType } from "@/types";
import { Badge, Button, Divider, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
interface DetailCashAdvanceProps {
  cashAdvance: CashAdvanceType;
}

export const DetailCashAdvanceSection: React.FC<DetailCashAdvanceProps> = ({
  cashAdvance,
}) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="mt-2 p-4">
      <div className="flex justify-between mb-1 px-1">
        <div>
          <Text fw={"bold"} size="md" c={"#222222"}>
            Detail kasbon
          </Text>
        </div>
        <div>
          <Badge
            color={
              cashAdvance.status == "accepted"
                ? "green"
                : cashAdvance.status == "pending"
                ? "grey"
                : "red"
            }
            size="xs"
            radius={"xs"}
          >
            {cashAdvance.status}
          </Badge>
        </div>
      </div>
      <Divider size={"md"} />
      <div className="grid grid-cols-12 px-2 mt-2">
        {creds?.level == "Owner" && (
          <div className="col-span-12">
            <Text fw={500} size="sm">
              Nama pegawai :
            </Text>
            <Text fw={700} size="md" mt={-4}>
              {cashAdvance.employee.name}
            </Text>
          </div>
        )}
        <div className="col-span-12">
          <Text fw={500} size="sm">
            Tanggal kasbon:
          </Text>
          <Text fw={700} size="md" mt={-4}>
            {cashAdvance &&
              format(cashAdvance.date, "EEEE, dd MMMM yyyy", { locale: id })}
          </Text>
        </div>
        <div className="col-span-12 mt-2">
          <Text fw={500} size="sm">
            Jumlah kasbon:
          </Text>
          <Text fw={700} size="md" mt={-4}>
            Rp. {new Intl.NumberFormat("id-ID").format(cashAdvance.amount)}
          </Text>
        </div>
        <div className="col-span-12 mt-2">
          <Text fw={500} size="sm">
            Alasan kasbon:
          </Text>
          <Text fw={700} size="md" mt={-4}>
            {cashAdvance.reason}
          </Text>
        </div>
      </div>
      <Divider size={"md"} mt={4} />
      <div className="col-span-12 mt-2">
        <Button
          size="sm"
          onClick={() => {
            navigate(-1);
          }}
          fullWidth
          color="grey"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};
