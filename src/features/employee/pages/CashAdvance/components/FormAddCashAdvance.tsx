import { Button, Divider, NumberInput, Text, TextInput } from "@mantine/core";
import { IconCoins } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export const FormAddCashAdvance: React.FC = () => {
  const navigate = useNavigate();
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
        <div className="mt-2">
          <TextInput
            label="Tanggal"
            placeholder={`${format(new Date(), "EEEE, dd MMMM yyyy", {
              locale: id,
            })}`}
            disabled
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
      </div>
    </div>
  );
};
