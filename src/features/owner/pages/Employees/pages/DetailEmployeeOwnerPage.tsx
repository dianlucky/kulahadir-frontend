import { Image, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiodataCard } from "../components";
import { EmployeeType } from "@/types";

const BaseURL = import.meta.env.VITE_API_URL;

export const DetailEmployeeOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state.data as EmployeeType;
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Detail pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <section className="bg-white shadow-md rounded-xl mx-6 py-5 mt-2">
        <div className="flex justify-center px-2 my-auto -ml-8">
          <div className="">
            <Image
              radius="30px"
              h={40}
              w={40}
              src={employee.profile_pic ? `${BaseURL}/uploads/employees/${employee.profile_pic}` : '/images/profile-default.png'}
            />
          </div>
          <div className="ml-3 my-auto">
            <Text fw={700} size="md">
              {employee?.name}
            </Text>
            <Text fw={300} size="xs" mt={-4}>
              {employee.account.status}
            </Text>
          </div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <BiodataCard employee={employee} />
        </div>
      </div>
      ;
    </main>
  );
};
