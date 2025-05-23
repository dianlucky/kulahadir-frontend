import { Divider, Image, Text, UnstyledButton } from "@mantine/core";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeSalaryList: React.FC = () => {
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
      <div className="mt-2 px-3">
        <div className="grid grid-cols-12 py-1">
          <div className="col-span-2 text-center">
            <Image
              radius="30px"
              h={32}
              w={32}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="col-span-1 -ml-3">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-7 -ml-2">
            <Text fw={700} size="sm">
              Dian Lucky Prayogi
            </Text>
            <Divider my={2} />
            <Text fw={500} size="xs">
              Pegawai tetap
            </Text>
          </div>
          <div className="col-span-2 m-auto -mr-1">
            <UnstyledButton
              onClick={() => {
                navigate("/employee-salary/detail");
              }}
              size="xs"
            >
              <IconInfoCircle color="#4E71FF" />
            </UnstyledButton>
          </div>
        </div>
        <Divider />
      </div>
    </section>
  );
};
