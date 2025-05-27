import { CashAdvanceType } from "@/types";
import { Badge, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
interface HistoryCashAdvanceListProps {
  cashAdvances: CashAdvanceType[];
}

export const HistoryCashAdvanceList: React.FC<HistoryCashAdvanceListProps> = ({
  cashAdvances,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {cashAdvances
        .filter(
          (data) => data.status === "accepted" || data.status === "rejected"
        )
        .map((data, index) => (
          <button
            onClick={() =>
              navigate("/cash-advance-request/detail", { state: data })
            }
            key={index}
          >
            <section className="bg-white shadow-md rounded-xl p-1">
              <div className="grid grid-cols-12 p-2">
                <div className="col-span-2 text-center">
                  <Text fw={"bold"} size="25px">
                    {format(data.date, "dd")}
                  </Text>
                  <Text size="13px">
                    {format(data.date, "MMM", { locale: id })}
                  </Text>
                </div>
                <div className="col-span-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-9">
                  <div className="flex justify-end">
                    <Badge
                      radius={"xs"}
                      size="xs"
                      color={data.status == "accepted" ? "green" : "red"}
                    >
                      {data.status}
                    </Badge>
                  </div>
                  <div className="w-full -mt-2 -ml-10">
                    <Text fw={"bold"} size="lg">
                      Rp. {new Intl.NumberFormat("id-ID").format(data.amount)}
                    </Text>
                  </div>
                </div>
              </div>
            </section>
          </button>
        ))}

      {cashAdvances.filter(
        (data) => data.status === "accepted" || data.status === "rejected"
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
