import { LeaveRequestType } from "@/types";
import { Badge, Divider, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DateDetailCardProps {
  leaveRequestData: LeaveRequestType;
}
export const DateDetailCard: React.FC<DateDetailCardProps> = ({
  leaveRequestData,
}) => {
  return (
    <section className="bg-white mx-auto max-w-sm w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 ">
      <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
        <span
          style={{ fontSize: "14px" }}
          className="font-bold text-brown capitalize"
        >
          {leaveRequestData.type}
        </span>
        <div className="-mt-2">
          <Badge
            size="xs"
            style={{
              marginLeft: "4px",
              borderRadius: "2px",
            }}
            color={
              leaveRequestData.status == "pending"
                ? "grey"
                : leaveRequestData.status == "accepted"
                ? "green"
                : "red"
            }
          >
            {leaveRequestData.status}
          </Badge>
        </div>
      </div>
      <Divider my="sm" />
      <div className="w-full grid grid-cols-1 pb-2 pt-2 ms-4 -mt-2">
        <div className="w-full grid grid-cols-12 p-1 -mb-2">
          <div className="col-span-2 text-center my-auto -ml-2">
            <Text size="50px" fw={700}>
              1
            </Text>
            <Text style={{ marginTop: "-5px" }} size="md">
              Hari
            </Text>
          </div>
          <Divider orientation="vertical" className="col-span-1 ml-3" />
          <div className="col-span-9 ms-2 text-left mb-2 -ml-2">
            <div className="ms-2 -mb-2">
              <Text size="sm" fw={700}>
                Tanggal izin :
              </Text>
              <Text size="sm">
                {format(leaveRequestData.date, "EEEE, dd MMMM yyyy", {
                  locale: id,
                })}
              </Text>
            </div>

            <Divider my="sm" />
            <div className="ms-2 -mt-2">
              <Text size="sm" fw={700}>
                Tanggal pengajuan :
              </Text>
              <Text size="sm">
                {" "}
                {format(leaveRequestData.created_at, "EEEE, dd MMMM yyyy", {
                  locale: id,
                })}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
