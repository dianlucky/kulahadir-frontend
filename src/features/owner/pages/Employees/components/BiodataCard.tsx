import { Button, Divider, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const BiodataCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white shadow-md rounded-lg p-2 px-5">
      <div className="flex justify-between mb-1 px-1 mt-1">
        <Text fw={700} c="#654433">
          Biodata
        </Text>
        <IconUser size={20} />
      </div>
      <Divider />
      <div className="grid grid-cols-12 p-2 -mt-2 px-2 gap-1 pl-3 mt-2 mb-3">
        <div className="col-span-12">
          <Text size="sm">Nama lengkap:</Text>
          <Text size="sm" mt={-2} fw={"bold"} truncate="end">
            Dian Lucky Prayogi
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Username:</Text>
          <Text size="sm" mt={-2} fw={"bold"} truncate="end">
            dianlucky13
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">No Whatsapp :</Text>
          <Text size="sm" mt={-2} fw={"bold"}>
            081349445267
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Tanggal lahir :</Text>
          <Text size="sm" mt={-2} fw={"bold"}>
            23 Mei 2003
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Tanggal masuk:</Text>
          <Text size="sm" mt={-2} fw={"bold"}>
            23 Mei 2003
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Role :</Text>
          <Text size="sm" mt={-2} fw={"bold"}>
            Pegawai
          </Text>
        </div>
        <div className="col-span-6 mt-2">
          <Text size="sm">Status pegawai:</Text>
          <Text size="sm" mt={-2} fw={"bold"}>
            Pegawai tetap
          </Text>
        </div>
      </div>
      <div className="my-1">
        <Divider />
      </div>
      <div className="mt-4 px-4 mb-2">
        <Button
          color="yellow"
          size="sm"
          fullWidth
          radius={"md"}
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          Edit Biodata pegawai
        </Button>
      </div>
    </section>
  );
};
