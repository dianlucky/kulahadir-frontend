import { EmployeeType } from "@/types";
import { Divider, Image, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const BaseURL = import.meta.env.VITE_API_URL;
interface EmployeeDetailCardProps {
  employee?: EmployeeType;
}

export const EmployeeDetailCard: React.FC<EmployeeDetailCardProps> = ({
  employee,
}) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Detail pegawai
        </div>
        <div>
          <IconUser />
        </div>
      </div>
      <Divider />
      <div className="mt-4 ">
        <div className="grid grid-cols-12  px-4">
          <div className="col-span-4 flex justify-center -ml-5">
            <Image
              radius="200"
              src={
                employee?.profile_pic
                  ? `${BaseURL}/uploads/employees/${employee?.profile_pic}`
                  : "/images/profile-default.png"
              }
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-span-8">
            <div className="mt-2">
              <Text fw={"bold"} size="md" truncate="end">
                {employee?.name}
              </Text>
            </div>
            <div className="-mt-2">
              <Text size="sm">{employee?.account.status}</Text>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-2 ml-4 gap-2">
          <div className="col-span-6">
            <div className="mt-2">
              <Text size="sm">Username:</Text>
              <Text fw={"bold"} size="md" mt={-5}>
                {employee?.account.username}
              </Text>
            </div>
          </div>
          <div className="col-span-6">
            <div className="mt-2">
              <Text size="sm">Role:</Text>
              <Text fw={"bold"} size="md" mt={-5}>
                {employee?.account.level}
              </Text>
            </div>
          </div>

          <div className="col-span-6">
            <div className="mt-2">
              <Text size="sm">No Whatsapp:</Text>
              <Text fw={"bold"} size="md" mt={-5} truncate="end">
                {employee?.phone}
              </Text>
            </div>
          </div>
          <div className="col-span-6">
            <div className="mt-2">
              <Text size="sm">Tanggal lahir:</Text>
              <Text fw={"bold"} size="md" mt={-5}>
                {employee?.birth_date
                  ? format(new Date(employee?.birth_date), " dd MMMM yyyy", {
                      locale: id,
                    })
                  : ""}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
