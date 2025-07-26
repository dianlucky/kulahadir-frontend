import { UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HistoryOutgoingSection } from "../components";
import { OutgoingDataType } from "@/types";
import { useGetOutgoingByDate } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const OutgoingStockPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // DATE FILTER HANDLER
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  // END FOR DATE FILTER HANDLER
  // GET INCOMING DATA
  const [outgoingData, setOutgoingData] = useState<OutgoingDataType[]>([]);
  const { data: DataOutgoing, isLoading: LoadingOutgoing } =
    useGetOutgoingByDate(
      format(selectedDate ?? new Date(), "yyyy-MM-dd", { locale: id })
    );
  useEffect(() => {
    if (DataOutgoing) {
      setOutgoingData(DataOutgoing);
    } else {
      setOutgoingData([]);
    }
  });
  // GET INCOMING DATA

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
            <h2 className="font-semibold ">Kelola stok keluar</h2>
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
                    }-inventory/outgoing/add`
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
          <HistoryOutgoingSection
            setSelectedDate={setSelectedDate}
            outgoingData={outgoingData}
            LoadingOutgoingData={LoadingOutgoing}
            selectedDate={selectedDate}
          />
        </div>
      </section>
    </>
  );
};
