import { CashAdvanceType } from "@/types";
import { Badge, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useGetAllCashAdvance } from "@/features/employee/pages/CashAdvance";

interface CashAdvanceTableProps {
  status: string | null;
}

export const CashAdvanceTable: React.FC<CashAdvanceTableProps> = ({
  status,
}) => {
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataRequests } = useGetAllCashAdvance();
  useEffect(() => {
    if (DataRequests) {
      setCashAdvances(DataRequests);
    }
  }, [DataRequests]);

  const rows = cashAdvances
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
          Rp. {new Intl.NumberFormat("id-ID").format(data.amount)}
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
                  Jumlah kasbon
                </Table.Th>
                <Table.Th className="font-semibold px-2 py-1">Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cashAdvances && cashAdvances.length > 0 ? (
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
