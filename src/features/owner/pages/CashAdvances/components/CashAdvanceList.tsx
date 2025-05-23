import { Badge, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const CashAdvanceList: React.FC = () => {
  return (
    <Link to="/employee-cash-advance/detail">
      <section className="bg-white shadow-md rounded-lg p-2">
        <div className="grid grid-cols-12  px-2 py-3">
          <div className="col-span-1 text-center">
            <Text fw={700} size="27px">
              23
            </Text>
            <Text fw={400} size="xs" mt={-6} ml={3}>
              Mei
            </Text>
          </div>
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-10">
            <div className="flex justify-end -mt-2">
              <Badge size="xs" radius={"xs"}>
                belum disetujui
              </Badge>
            </div>
            <div className="ml-3">
              <Text fw={700} size="20px">
                Rp. 200.000
              </Text>
            </div>
          </div>
        </div>
        <Divider mt={-2} mb={2} />
        <div className="my-1 px-2">
          <Text fw={500} size="xs">
            Pegawai : Dian Lucky Prayogi
          </Text>
        </div>
      </section>
    </Link>
  );
};
