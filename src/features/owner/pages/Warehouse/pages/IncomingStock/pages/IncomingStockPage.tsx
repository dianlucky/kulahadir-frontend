import { UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HistoryIncomingSection } from "../components";
import { IncomingDataType } from "@/types";
import { useGetIncomingByDate } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const IncomingStockPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // DATE FILTER HANDLER
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // END FOR DATE FILTER HANDLER
  // GET INCOMING DATA
  const [incomingData, setIncomingData] = useState<IncomingDataType[]>([]);
  const { data: DataIncoming, isLoading: LoadingIncoming } =
    useGetIncomingByDate(
      format(selectedDate ?? new Date(), "yyyy-MM-dd", { locale: id })
    );
  useEffect(() => {
    if (DataIncoming) {
      setIncomingData(DataIncoming);
    } else {
      setIncomingData([]);
    }
  });
  // GET INCOMING DATA

  // console.log("Incoming data: ", incomingData);
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
            <h2 className="font-semibold ">
              Kelola Stok Masuk{" "}
              {location.pathname.includes("frozen") ? `Frozen` : `Gudang`}
            </h2>
          </div>
          <div>
            <div className="mr-2">
              <UnstyledButton
                onClick={() =>
                  navigate(
                    `/${
                      location.pathname.includes("frozen")
                        ? `frozen`
                        : `warehouse`
                    }-inventory/incoming/add`
                  )
                }
              >
                <IconPlus size={22} />
              </UnstyledButton>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-2 px-7 mb-20">
          <HistoryIncomingSection
            setSelectedDate={setSelectedDate}
            incomingData={incomingData}
            LoadingIncomingData={LoadingIncoming}
            selectedDate={selectedDate}
          />
        </div>
      </section>
    </>
  );
};
