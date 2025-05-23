import { Button, Divider, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const DetailNotificationPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="grid grid-cols-12 mb-1">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Detail Notifikasi</h2>
          </div>
        </div>
      </section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 mt-2 mb-2">
        <div className="flex justify-between px-4">
          <Text size="md" fw={"bold"}>
            Gaji
          </Text>
          <Text size="sm" my={"auto"}>
            18 Mei 2025, 17.45
          </Text>
        </div>
        <Divider />
        <div className="px-4 mb-5">
          <Text size="md">
            Gaji anda bulan Mei 2025 sudah diterbitkan, terimakasih atas kerja
            keras yang sudah anda berikan untuk Angkringan Kulakita, terimakasih
            dan tetap semangat.
          </Text>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            size="sm"
            color="grey"
            fullWidth
            onClick={() => {
              navigate("/notification");
            }}
          >
            Kembali
          </Button>
          <Button size="sm" color="blue" fullWidth>
            Tandai dibaca
          </Button>
        </div>
      </section>
    </main>
  );
};
