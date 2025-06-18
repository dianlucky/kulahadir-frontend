import { LeaveRequestType } from "@/types";
import { Badge, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface RequestListProps {
  requests: LeaveRequestType[];
}

export const RequestList: React.FC<RequestListProps> = ({ requests }) => {
  const navigate = useNavigate();
  return (
    <>
      {requests.length != 0 &&
        requests
          .filter((data) => data.status == "pending")
          .map((data, index) => (
            <button
              onClick={() =>
                navigate("/employee-request/detail", { state: { data } })
              }
              style={{ marginTop: "4px" }}
              key={index}
            >
              <section className="bg-white shadow-md rounded-lg p-3">
                <div className="grid grid-cols-12 px-2 mb-2">
                  <div className="col-span-2 text-center">
                    <Text fw={"bold"} size="30px">
                      1
                    </Text>
                    <Text size="12px">Hari</Text>
                  </div>
                  <div className="col-span-1">
                    <div className="w-px h-full bg-gray-300 mx-4" />
                  </div>
                  <div className="col-span-9">
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
                          data?.status == "pending"
                            ? "grey"
                            : data?.status == "accepted"
                            ? "green"
                            : "red"
                        }
                      >
                        {data.status}
                      </Badge>
                    </div>
                    <div className="text-start ml-2 mt-1 mb-1">
                      <Text fw={"bold"} size="17px">
                        {data.date &&
                          format(data.date, "EEEE, dd MMMM yyyy", {
                            locale: id,
                          })}
                      </Text>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-start ml-2">
                  <Text size="xs">Pegawai :{data.employee.name}</Text>
                </div>
              </section>
            </button>
          ))}
      {requests.filter((data) => data.status == "pending").length == 0 && (
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
                Tidak ada pengajuan
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
