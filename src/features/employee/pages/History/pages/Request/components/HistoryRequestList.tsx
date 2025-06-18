import { LeaveRequestType } from "@/types";
import { Badge, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import {  useNavigate } from "react-router-dom";
interface HistoryRequestListProps {
  leaveRequests: LeaveRequestType[];
  type: string | null;
  status: string | null;
}

export const HistoryRequestList: React.FC<HistoryRequestListProps> = ({
  leaveRequests,
  type,
  status,
}) => {
  const navigate = useNavigate();
  console.log("Tipe :", type);
  console.log("Status :", status);
  return (
    <>
      {leaveRequests.length != 0 &&
        leaveRequests
          .filter(
            (leave) =>
              (status === null || leave.status === status) &&
              (type === "all" || leave.type === type)
          )
          .map((data, index) => (
            <button
              onClick={() =>
                navigate("/leave-request/detail", { state: { data } })
              }
              key={index}
            >
              <section className="bg-white shadow-md rounded-2xl p-3 mt-2">
                <div className="grid grid-cols-12 px-2 mb-2">
                  <div className="col-span-1 text-center">
                    <Text fw={"bold"} size="30px">
                      1
                    </Text>
                    <Text size="12px">Hari</Text>
                  </div>
                  <div className="col-span-1">
                    <div className="w-px h-full bg-gray-300 mx-4" />
                  </div>
                  <div className="col-span-10">
                    <div className="flex justify-end gap-1">
                      <Badge
                        radius={"xs"}
                        size="xs"
                        color={data.type == "sakit" ? "yellow" : "blue"}
                      >
                        {data.type}
                      </Badge>
                      <Badge
                        radius={"xs"}
                        size="xs"
                        color={
                          data.status == "pending"
                            ? "grey"
                            : data.status == "accepted"
                            ? "green"
                            : "red"
                        }
                      >
                        {data.status}
                      </Badge>
                    </div>
                    <div className="text-center mt-1 mb-1">
                      <Text fw={"bold"} size="18px">
                        {data.date &&
                          format(data.date, "EEEE, dd MMMM yyyy", {
                            locale: id,
                          })}
                      </Text>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="w-full px-2 mt-1 text-start">
                  <Text size="xs">
                    Tanggal pengajuan :{" "}
                    {data.created_at &&
                      format(data.created_at, "EEEE, dd MMMM yyyy", {
                        locale: id,
                      })}
                  </Text>
                </div>
              </section>
            </button>
          ))}

      {leaveRequests.filter(
        (leave) => leave.status === "accepted" || leave.status === "rejected"
      ).length == 0 && (
        <div className="bg-white shadow-sm p-4 rounded-xl">
          <div className="mt-2 px-3 py-2">
            <div className="flex justify-center">
              <Image
                src="/images/not-found.svg"
                style={{
                  width: "120px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Text fw={700} size="md">
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="sm">
                Belum ada yang disetujui
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={400} size="xs">
                Yang sabar yaa....
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
