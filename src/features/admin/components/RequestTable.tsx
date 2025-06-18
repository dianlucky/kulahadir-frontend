import { LeaveRequestType } from "@/types";
import { Badge, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAllLeave } from "../pages/Request";

interface RequestTableAdminProps {
  status: string | null;
}

export const RequestTable: React.FC<RequestTableAdminProps> = ({ status }) => {
  const [requests, setRequest] = useState<LeaveRequestType[]>([]);
  const { data: DataRequests } = useGetAllLeave();
  useEffect(() => {
    if (DataRequests) {
      setRequest(DataRequests);
    }
  }, [DataRequests]);

  const rows = requests
    .filter(
      (data) =>
        data.status === status &&
        new Date(data.date).getMonth() === new Date()?.getMonth() &&
        new Date(data.date).getFullYear() === new Date()?.getFullYear()
    )
    .map((data, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{data.employee.name}</Table.Td>
        <Table.Td>
          {" "}
          {format(new Date(data.date), "EEEE, dd MMMM yyyy", {
            locale: id,
          })}{" "}
        </Table.Td>
        <Table.Td>
          <Badge
            radius={"sm"}
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
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <>
      <section>
        <div className="mt-3">
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            className="text-dark text-xs table-auto max-w-full"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-semibold px-2 py-1">No</Table.Th>
                <Table.Th className="font-semibold px-2 py-1">Nama</Table.Th>
                <Table.Th className="font-semibold px-2 py-1">
                  Tanggal pengajuan
                </Table.Th>
                <Table.Th className="font-semibold px-2 py-1">Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {requests && requests.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center py-2">
                    Data tidak ditemukan
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
