import { Divider, Image, Text, UnstyledButton } from "@mantine/core";
import {
  IconCalendar,
  IconClockDown,
  IconClockUp,
  IconInfoCircle,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const EmployeeSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Data pegawai
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="">
        <div className="grid grid-cols-12 p-2 mb-2">
          <div className="col-span-2 m-auto">
            <Image
              radius="30px"
              h={40}
              w={40}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-9">
            <div className="flex justify-between pe-2">
              <Text fw={700} size="md">
                Dian Lucky Prayogi
              </Text>
              <UnstyledButton
                size={"xs"}
                onClick={() => {
                  navigate("/employee-attendances/detail");
                }}
              >
                <IconInfoCircle color="#4E71FF" />
              </UnstyledButton>
            </div>
            <div className="my-1">
              <Divider />
            </div>
            <div className="flex justify-between mt-2">
              <div className="w-full flex">
                <div>
                  <IconClockDown color="#77B254" size={16} />
                </div>
                <div className="ml-2">
                  <Text size="xs" fw={"bold"}>
                    16.03
                  </Text>
                </div>
              </div>
              <Divider orientation="vertical" />
              <div className="w-full flex ml-2">
                <div>
                  <IconClockUp color="#F72C5B" size={16} />
                </div>
                <div className="ml-2">
                  <Text size="xs" fw={"bold"}>
                    01.23
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </section>
  );
};
