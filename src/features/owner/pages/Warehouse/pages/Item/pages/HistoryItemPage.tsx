import { IconAdjustments, IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { HistoryItemSection } from "../components";
import { Button, Popover, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import {
  DetailIncomingType,
  DetailOutgoingType,
  ItemType,
  TransactionType,
} from "@/types";
import { useGetIncomingDetailByItemId } from "../../IncomingStock";
import { useGetOutgoingDetailByItemId } from "../../OutgoingStock";

export const HistoryItemPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item as ItemType;
  const [transactionType, setTransactionType] = useState("Semua");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  // GET INCOMING DATA
  const { data: DataIncoming, isLoading: LoadingIncoming } =
    useGetIncomingDetailByItemId(item.id);
  // END FOR GET INCOMING DATA

  // GET OUTGOING DATA
  const { data: DataOutgoing, isLoading: LoadingOutgoing } =
    useGetOutgoingDetailByItemId(item.id);
  // END FOR GET OUTGOING DATA
  // MERGE ARRAY TO TRANSACTION DATA
  const [transactionData, setTransactionData] = useState<TransactionType[]>([]);
  useEffect(() => {
    const incomingTransformed: TransactionType[] = (DataIncoming ?? []).map(
      (data: DetailIncomingType) => ({
        id: data.id,
        amount: data.amount,
        created_at: data.created_at,
        item_id: data.item_id,
        item: data.item,
        employee_id: data.employee_id,
        employee: data.employee,
        type: "incoming",
      })
    );

    const outgoingTransformed: TransactionType[] = (DataOutgoing ?? []).map(
      (data: DetailOutgoingType) => ({
        id: data.id,
        amount: data.amount,
        created_at: data.created_at,
        item_id: data.item_id,
        item: data.item,
        employee_id: data.employee_id,
        employee: data.employee,
        type: "outgoing",
      })
    );

    const merged = [...incomingTransformed, ...outgoingTransformed];

    // (Optional) urutkan berdasarkan tanggal terbaru
    merged.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setTransactionData(merged);
  }, [DataIncoming, DataOutgoing]);

  const filteredTransactions = transactionData.filter((data) => {
    // Filter jenis transaksi
    if (transactionType === "Stok masuk" && data.type !== "incoming")
      return false;
    if (transactionType === "Stok keluar" && data.type !== "outgoing")
      return false;

    // Filter tanggal
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      const createdAt = new Date(data.created_at);
      // Reset jam jadi 00:00 agar lebih akurat
      const start = new Date(startDate.setHours(0, 0, 0, 0));
      const end = new Date(endDate.setHours(23, 59, 59, 999));
      return createdAt >= start && createdAt <= end;
    }

    return true; // Jika tidak ada filter tanggal, tampilkan semua
  });
  // END FOR MERGE ARRAY TO TRANSACTION DATA

  console.log("Data TransactionData :", transactionData);
  return (
    <>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Riwayat barang</h2>
          </div>
          <div>
            <Popover
              width={250}
              position="bottom-end"
              withArrow
              offset={5}
              closeOnClickOutside={false}
            >
              <Popover.Target>
                <Button size="compact-md" color="blue" c={"white"} mr={4}>
                  <IconAdjustments size={20} />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <div>
                  <Select
                    size="xs"
                    label="Jenis transaksi"
                    placeholder="Pilih transaksi"
                    checkIconPosition="right"
                    comboboxProps={{ withinPortal: false }}
                    data={["Semua", "Stok masuk", "Stok keluar"]}
                    value={transactionType}
                    onChange={(value) => setTransactionType(value ?? "Semua")}
                  />
                </div>
                <div>
                  <DatePickerInput
                    type="range"
                    label="Pilih tanggal"
                    placeholder="Pilih tanggal"
                    size="xs"
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <Button fullWidth size="xs">
                    Simpan
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </section>
      <section className="mt-1 px-6 mb-20">
        <HistoryItemSection
          transactionData={filteredTransactions}
          LoadingIncoming={LoadingIncoming}
          LoadingOutgoing={LoadingOutgoing}
        />
      </section>
    </>
  );
};
