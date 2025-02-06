import { Badge, Divider, Image, Text } from "@mantine/core";
import { IconChevronLeft, IconClipboardText } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const DetailPaidLeaveRequest: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="grid grid-cols-12">
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
            <h2 className="font-semibold">Detail cuti</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span
            style={{ fontSize: "14px" }}
            className="font-bold text-brown capitalize"
          >
            Cuti
          </span>
          <div className="-mt-2">
            <Badge
              size="xs"
              style={{
                marginLeft: "4px",
                borderRadius: "2px",
              }}
              color="red"
            >
              Belum disetujui
            </Badge>
          </div>
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="w-full grid grid-cols-12 p-1 -mb-2">
            <div className="col-span-2 text-center my-auto -ml-2">
              <Text size="50px" fw={700}>
                1
              </Text>
              <Text style={{ marginTop: "-5px" }} size="md">
                Hari
              </Text>
            </div>
            <Divider orientation="vertical" className="col-span-1 ml-3" />
            <div className="col-span-9 ms-2 text-left mb-2 -ml-2">
              <div className="ms-2 -mb-2">
                <Text size="sm" fw={700}>
                  Tanggal mulai :
                </Text>
                <Text size="sm">Kamis, 17 April 2025</Text>
              </div>

              <Divider my="sm" />
              <div className="ms-2 -mt-2">
                <Text size="sm" fw={700}>
                  Tanggal selesai :
                </Text>
                <Text size="sm">Kamis, 17 April 2025</Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
          <span
            style={{ fontSize: "14px" }}
            className="font-bold text-brown"
          >
            Lampiran dan keterangan
          </span>
          <IconClipboardText className="opacity-100" size={20} />
        </div>
        <Divider my="sm" />
        <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
          <div className="gap-2 mt-0">
            <Text size="sm" fw={700}>
              Lampiran :
            </Text>
            <Image
              radius="md"
              h={200}
              style={{
                justifyContent: "center",
                padding: "10",
                marginTop: "-20px",
                width: "90% ",
              }}
              fit="contain"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
          </div>
          <div className="gap-2 -mt-2 mb-5">
            <Text size="sm" fw={700}>
              Keterangan :{" "}
            </Text>
            <Text size="sm"></Text>
          </div>
        </div>
      </section>
    </main>
  );
};
 