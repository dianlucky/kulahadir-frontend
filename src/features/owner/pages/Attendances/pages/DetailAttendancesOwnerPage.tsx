import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DetailAttendanceSection,
  LocationCardSection,
  PhotoSection,
  TaskEmployeeSection,
} from "../components";
import { Image, Text } from "@mantine/core";

export const DetailAttendancesOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="mb-20">
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
            <h2 className="font-semibold">Detail kehadiran pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <section className="bg-white shadow-xs rounded-2xl mx-2 py-5 mt-2">
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
                <Text fw={700} size="18px">
                  Dian Lucky Prayogi
                </Text>
                <Text fw={300} size="xs" mt={-3}>
                  Pegawai tetap
                </Text>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-2 mx-6">
          <LocationCardSection />
        </div>
        <div className="mt-2 mx-6">
          <PhotoSection />
        </div>
        <div className="mt-2 mx-9">
          <DetailAttendanceSection />
        </div>
        <div className="mt-2 mx-6">
          <TaskEmployeeSection />
        </div>
      </div>
    </main>
  );
};
