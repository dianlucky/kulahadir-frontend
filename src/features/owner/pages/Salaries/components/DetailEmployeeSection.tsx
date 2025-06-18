import { EmployeeType } from "@/types";
import { Divider, Image, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

const BaseURL = import.meta.env.VITE_API_URL;

interface DetailEmployeeSectionProps {
  employee: EmployeeType;
}

export const DetailEmployeeSection: React.FC<DetailEmployeeSectionProps> = ({
  employee,
}) => {
  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-sm rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={600} c="#654433">
            Detail pegawai
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-1">
          <IconUser />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="grid grid-cols-12 mt-3 mb-2 px-1 ml-3">
        <div className="col-span-2 m-auto">
          <Image
            radius="30px"
            h={50}
            w={50}
            src={
              employee.profile_pic
                ? `${BaseURL}/uploads/employees/${employee.profile_pic}`
                : "/images/profile-default.png"
            }
          />
        </div>
        <div className="col-span-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-2">
          <div>
            <Text fw={400} size="xs">
              Nama pegawai :
            </Text>
            <Text fw={700} size="sm" truncate="end">
              {employee.name}
            </Text>
          </div>
          <div>
            <Divider />
          </div>
          <div>
            <Text fw={400} size="xs">
              Status pegawai :
            </Text>
            <Text fw={700} size="sm">
              {employee.account.status}
            </Text>
          </div>
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="flex mt-1 mb-1 px-2">
        <Text fw={600} size="xs">
          Awal bekerja :{" "}
          {employee.created_at &&
            format(employee.created_at, "EEEE, dd MMMM yyyy", { locale: id })}
        </Text>
      </div>
    </section>
  );
};
