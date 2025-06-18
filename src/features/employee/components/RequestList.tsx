import { LeaveRequestType } from "@/types";
import { Badge, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface RequestListProps {
  leaveRequests?: LeaveRequestType[];
}

export const RequestList: React.FC<RequestListProps> = ({ leaveRequests }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      {leaveRequests && leaveRequests.length > 0 ? (
        leaveRequests
          .filter((data) => data.status == "pending")
          .map((data, index) => (
            <button
              key={index}
              onClick={() =>
                navigate("/leave-request/detail", { state: { data } })
              }
              style={{ marginTop: "5px" }}
              className="bg-white max-w-sm w-full shadow-md rounded-xl z-50 text-slate-700"
            >
              <div className="grid grid-cols-12 p-3">
                <div className="col-span-2 text-center -mb-2">
                  <Text size="35px" fw={700}>
                    1
                  </Text>
                  <Text size="xs" mt={-6}>
                    Hari
                  </Text>
                </div>
                <Divider className="col-span-1" orientation="vertical" />
                <div className="col-span-9">
                  <div className="flex justify-end mb-1">
                    <Badge
                      size="xs"
                      color={data?.type == "sakit" ? "yellow" : "blue"}
                      style={{ borderRadius: "2px", marginRight: "4px" }}
                    >
                      {data?.type}
                    </Badge>
                    <Badge
                      size="xs"
                      color={
                        data?.status == "pending"
                          ? "grey"
                          : data?.status == "accepted"
                          ? "green"
                          : "red"
                      }
                      style={{ borderRadius: "2px" }}
                    >
                      {data?.status}
                    </Badge>
                  </div>
                  <div className="my-auto -ml-8">
                    <Text size="md" fw={700}>
                      {data?.date
                        ? format(data?.date, "EEEE, dd MMMM yyyy", {
                            locale: id,
                          })
                        : "-"}
                    </Text>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="text-left p-2">
                <Text size="xs" fw={500}>
                  Tanggal pengajuan:{" "}
                  {data?.created_at
                    ? format(data?.created_at, "EEEE, dd MMM yyyy", {
                        locale: id,
                      })
                    : "-"}
                </Text>
              </div>
            </button>
          ))
      ) : (
        <div className="p-4 mt-28">
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
              <Text fw={700} size="xl" c={"gray"}>
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="sm" c={"gray"}>
                Notifikasi anda kosong
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
