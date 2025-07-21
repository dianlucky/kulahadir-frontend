import { IconAdjustments, IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { HistoryItemSection } from "../components";
import { Button, Popover, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";

export const HistoryItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
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
                  />
                </div>
                <div>
                  <DatePickerInput
                    type="range"
                    label="Pilih tanggal"
                    placeholder="Pilih tanggal"
                    size="xs"
                    value={value}
                    onChange={setValue}
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
      <section className="mt-1 px-6">
        <HistoryItemSection />
      </section>
    </>
  );
};
