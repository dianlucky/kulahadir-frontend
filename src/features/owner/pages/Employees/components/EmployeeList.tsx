import { EmployeeType } from "@/types";
import {  Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import {  useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "/images/profile-default.png";
const BaseURL = import.meta.env.VITE_API_URL;
interface EmployeeListProps {
  employees: EmployeeType[];
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const navigate = useNavigate();

  // const goToDetail = () => {
  //   navigate("/employee-data/detail", { state: { data } });
  // };
  return (
    <>
      {employees && (
        <div className="mb-30">
          <Divider my="xs" label="Pegawai tetap" labelPosition="left" />
          {employees
            .filter((data) => data.account.status == "Pegawai tetap")
            .map((data, index) => (
              <section
                onClick={() =>
                  navigate("/employee-data/detail", { state: { data } })
                }
                key={index}
              >
                <div
                  className="bg-white shadow-md rounded-2xl p-3"
                  style={{ marginTop: "5px" }}
                >
                  <div className="grid grid-cols-12 pl-2">
                    <div className="col-span-1 my-auto">
                      <Image
                        radius="30px"
                        h={28}
                        w={28}
                        src={
                          data.profile_pic
                            ? `${BaseURL}/uploads/employees/${data.profile_pic}`
                            : DEFAULT_IMAGE
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-10 ml-2">
                      <Text fw={700} size="md" mt={-3}>
                        {data.name}
                      </Text>
                    </div>
                  </div>
                  <div className="my-1">
                    <Divider />
                  </div>
                  <div className="flex justify-between">
                    <Text fw={300} size="11px">
                      Awal bekerja :{" "}
                      {format(data.created_at, "EEEE, dd MMMM yyyy", {
                        locale: id,
                      })}
                    </Text>
                  </div>
                </div>
              </section>
            ))}
          <Divider my="xs" label="Pegawai part time" labelPosition="left" />
          {employees
            .filter((data) => data.account.status == "Part time")
            .map((data, index) => (
              <section
                onClick={() =>
                  navigate("/employee-data/detail", { state: { data } })
                }
                key={index}
              >
                <div
                  className="bg-white shadow-md rounded-2xl p-3"
                  style={{ marginTop: "5px" }}
                >
                  <div className="grid grid-cols-12 pl-2">
                    <div className="col-span-1 my-auto">
                      <Image radius="30px" h={26} w={26} src={DEFAULT_IMAGE} />
                    </div>
                    <div className="col-span-1">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-10 ml-2">
                      <Text fw={700} size="md" mt={-3}>
                        {data.name}
                      </Text>
                    </div>
                  </div>
                  <div className="my-1">
                    <Divider />
                  </div>
                  <div className="flex justify-between">
                    <Text fw={300} size="11px">
                      Awal bekerja :{" "}
                      {format(data.created_at, "EEEE, dd MM yyyy", {
                        locale: id,
                      })}
                    </Text>
                  </div>
                </div>
              </section>
            ))}
        </div>
      )}
    </>
  );
};
