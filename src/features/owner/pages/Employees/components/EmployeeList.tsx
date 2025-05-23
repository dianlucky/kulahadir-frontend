import { Badge, Divider, Image, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export const EmployeeList: React.FC = () => {
  return (
    <>
      <Divider my="xs" label="Pegawai tetap" labelPosition="left" />
      <Link to={"/employee-data/detail"}>
        <div className="bg-white shadow-md rounded-2xl p-3">
          <div className="grid grid-cols-12 pl-2">
            <div className="col-span-1 my-auto">
              <Image
                radius="30px"
                h={26}
                w={26}
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
              />
            </div>
            <div className="col-span-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-10 ml-2">
              {/* <div className="flex justify-end">
              <Badge size="xs" radius={"xs"} color="blue">
                Pegawai tetap
              </Badge>
            </div> */}
              <Text fw={700} size="md" mt={-3}>
                Dian Lucky Prayogi
              </Text>
            </div>
          </div>
          <div className="my-1">
            <Divider />
          </div>
          <div className="flex justify-between">
            <Text fw={300} size="11px">
              Awal bekerja : Jumat, 23 September 2025
            </Text>
          </div>
        </div>
      </Link>
    </>
  );
};
