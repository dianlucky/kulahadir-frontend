import { Image, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { BiodataCard } from "../components";

export const DetailEmployeeOwnerPage: React.FC = () => {
  const navigate = useNavigate();
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
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="ml-3 my-auto">
            <Text fw={700} size="md">
              Dian Lucky Prayogi
            </Text>
            <Text fw={300} size="xs" mt={-4}>
              Pegawai tetap
            </Text>
          </div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <BiodataCard />
        </div>
      </div>
      ;
    </main>
  );
};
