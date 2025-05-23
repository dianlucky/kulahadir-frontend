import {
  Checkbox,
  Divider,
  Text,
  UnstyledButton,
  Tooltip,
  Indicator,
  Button,
} from "@mantine/core";
import { IconChecklist } from "@tabler/icons-react";

export const DailyTaskSection: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-slate-700">Tugas harian</span>
        <IconChecklist size={22} />
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 m-auto">
          <Text fw={700} size="md">
            DT01
          </Text>
        </div>
        <div className="col-span-1 ml-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-1">
          <Text size="xs" lineClamp={2}>
            Membersihkan panggangan dan membersihkan lantai dan aksdjkajs
          </Text>
        </div>
        <div className="col-span-1 m-auto ">
          <UnstyledButton>
            <Tooltip label="Checkbox with tooltip">
              <Checkbox />
            </Tooltip>
          </UnstyledButton>
        </div>
      </div>
      <div className="mt-2">
        <Divider />
      </div>
      <div className="mt-2 px-1">
        <Button fullWidth size="sm">Tandai selesai</Button>
      </div>
    </section>
  );
};
