import { LeaveRequestType } from "@/types";
import { Badge, Divider, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface RequestListProps {
  leaveRequests?: LeaveRequestType[];
}

export const RequestList: React.FC<RequestListProps> = ({ leaveRequests }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {leaveRequests && leaveRequests.length > 0 ? (
        leaveRequests.map((data, index) => (
          <button
            key={index}
            onClick={() =>
              navigate("/leave-request/detail", { state: { data } })
            }
            className="bg-white max-w-xs w-full shadow-md rounded-2xl z-50 text-slate-700 mb-4"
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
                <div className="text-center my-auto">
                  <Text size="md" fw={700}>
                    {data?.date
                      ? format(data?.date, "EEEE, dd MMM yyyy", { locale: id })
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
        <Text size="sm" color="dimmed">
          Tidak ada permintaan cuti.
        </Text>
      )}
    </div>
  );
};
