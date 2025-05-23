import { Badge, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const RequestList: React.FC = () => {
  return (
    <Link to={"/leave-request/detail"}>
      <section className="bg-white shadow-md rounded-lg p-3">
        <div className="grid grid-cols-12 px-2 mb-2">
          <div className="col-span-1 text-center">
            <Text fw={"bold"} size="30px">
              2
            </Text>
            <Text size="12px">Hari</Text>
          </div>
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-10">
            <div className="flex justify-end gap-1">
              <Badge radius={"xs"} size="xs" color="grey">
                Izin
              </Badge>
              <Badge radius={"xs"} size="xs" color="green">
                Disetujui
              </Badge>
            </div>
            <div className="text-center mt-1 mb-1">
              <Text fw={"bold"} size="16px">
                Jumat, 23 Mei 2025
              </Text>
            </div>
          </div>
        </div>
        <Divider />
        <div className="w-full px-2 mt-1">
          <Text size="xs">Tanggal pengajuan : Rabu, 21 Mei 2025</Text>
        </div>
      </section>
    </Link>
  );
};
