import { CashAdvanceType } from "@/types";
import { Badge, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface CashAdvanceListProps {
  cashAdvances: CashAdvanceType[];
}

export const CashAdvanceList: React.FC<CashAdvanceListProps> = ({
  cashAdvances,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {cashAdvances.length != 0 &&
        cashAdvances
          .filter((data) => data.status == "pending")
          .map((data, index) => (
            <button
              onClick={() =>
                navigate("/employee-cash-advance/detail", { state: { data } })
              }
              key={index}
              style={{ marginTop: "4px" }}
            >
              <section className="bg-white shadow-md rounded-lg p-2">
                <div className="grid grid-cols-12  px-2 py-3">
                  <div className="col-span-2 text-center">
                    <Text fw={700} size="27px">
                      {data.date && format(data.date, "dd", { locale: id })}
                    </Text>
                    <Text fw={400} size="xs" mt={-6} ml={3}>
                      {data.date && format(data.date, "MMMM", { locale: id })}
                    </Text>
                  </div>
                  <div className="col-span-1">
                    <div className="w-px h-full bg-gray-300 mx-4" />
                  </div>
                  <div className="col-span-9">
                    <div className="flex justify-end -mt-3">
                      <Badge
                        size="xs"
                        radius={"xs"}
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
                    <div className="">
                      <Text fw={700} size="20px">
                        Rp. {new Intl.NumberFormat("id-ID").format(data.amount)}
                      </Text>
                    </div>
                  </div>
                </div>
                <Divider mt={-9} mb={2} />
                <div className="my-1 px-2 text-start">
                  <Text fw={500} size="xs">
                    Pegawai : {data.employee.name}
                  </Text>
                </div>
              </section>
            </button>
          ))}
      {cashAdvances.filter((data) => data.status == "pending").length == 0 && (
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
                Tidak ada pengajuan kasbon
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
