import { EmployeeType } from "@/types";
import { Button, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface BiodataSectionProps {
  employee?: EmployeeType;
}

export const BiodataSection: React.FC<BiodataSectionProps> = ({ employee }) => {
  const navigate = useNavigate();
  return (
    <section className="bg-white shadow-md rounded-lg p-3">
      <div className="grid grid-cols-12  px-4">
        <div className="col-span-4 flex justify-center -ml-5">
          <Image
            radius="200"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-span-8">
          <div className="mt-2">
            <Text fw={"bold"} size="md" truncate="end">
              {employee?.name}
            </Text>
          </div>
          <div className="-mt-1">
            <Text size="sm">{employee?.account.status}</Text>
          </div>
        </div>
      </div>
      <div className="px-3 p-3">
        <Divider />
      </div>
      <div className="grid grid-cols-12 p-2 -mt-2 px-5 gap-1 pl-10">
        <div className="col-span-6 mt-2">
          <Text size="sm">Username:</Text>
          <Text size="sm" mt={-1} fw={"bold"} truncate="end">
            {employee?.account.username}
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">No Whatsapp :</Text>
          <Text size="sm" mt={-1} fw={"bold"}>
            {employee?.phone}
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Tanggal lahir :</Text>
          <Text size="sm" mt={-1} fw={"bold"}>
            {employee?.birth_date &&
              format(employee?.birth_date, "dd MMM yyyy", { locale: id })}
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Tanggal masuk:</Text>
          <Text size="sm" mt={-1} fw={"bold"}>
            {employee?.created_at &&
              format(employee?.created_at, "dd MMM yyyy", { locale: id })}
          </Text>
        </div>
      </div>
      <div className="mt-4 px-4 mb-2">
        <Button
          color="yellow"
          size="sm"
          fullWidth
          radius={"md"}
          onClick={() => {
            navigate("/profile/edit", { state: { employee } });
          }}
        >
          Edit Biodata
        </Button>
      </div>
    </section>
  );
};
