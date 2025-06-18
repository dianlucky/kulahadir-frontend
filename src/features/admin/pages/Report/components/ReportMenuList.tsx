import { Button, Divider, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconCashRegister,
  IconCategory,
  IconInfoCircle,
  IconUsers,
} from "@tabler/icons-react";

interface ReportMenuListProps {
  setMenu: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ReportMenuList: React.FC<ReportMenuListProps> = ({ setMenu }) => {
  const listMenu = [
    {
      key: "Pegawai",
      title: "Data Pegawai",
      description: "Data pegawai kulakita",
      icon: <IconUsers size={40} />,
    },
    {
      key: "Kehadiran",
      title: "Data Kehadiran",
      description: "Data kehadiran pegawai kulakita",
      icon: <IconCalendarCheck size={40} />,
    },
    {
      key: "Gaji",
      title: "Data Gaji ",
      description: "Data gaji bulanan pegawai kulakita",
      icon: <IconCashRegister size={40} />,
    },
  ];
  return (
    <section className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          List Laporan
        </div>
        <div>
          <IconCategory />
        </div>
      </div>
      <Divider />
      {listMenu.map((item, index) => (
        <div key={index} className="mt-4">
          <div className="bg-slate-50 shadow-xs grid grid-cols-12 rounded-xl p-3">
            <div className="col-span-1 flex justify-center">{item.icon}</div>

            <div className="col-span-1 text-center">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>

            <div className="col-span-8 my-auto">
              <div>
                <Text fw="bold" size="sm" truncate="end">
                  {item.title}
                </Text>
              </div>
              <div className="-mt-1">
                <Text size="xs" fs="italic" truncate="end">
                  {item.description}
                </Text>
              </div>
            </div>

            <div className="col-span-2 flex justify-end my-auto">
              <Button
                size="xs"
                variant="subtle"
                color="gray"
                onClick={() => setMenu(item.key)}
              >
                <IconInfoCircle color="#4E71FF" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
