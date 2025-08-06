import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IncomingItemStatsSection,
  OutgoingItemStatsSection,
  TotalCategorySection,
  TotalItemSection,
} from "../components";

export const StatisticPage: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
            <h2 className="font-semibold">
              Grafik {pathname.includes("frozen") ? "Frozen" : "Barang Gudang"}
            </h2>
          </div>
          <div>
            <div className="mr-2">
              {/* <UnstyledButton onClick={open}>
                  <IconPlus size={22} />
                </UnstyledButton> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-2 px-5 mb-20">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <TotalCategorySection />
            </div>
            <div className="col-span-6">
              <TotalItemSection />
            </div>
          </div>
          <div className="mt-2">
            <OutgoingItemStatsSection />
          </div>
          <div className="mt-2">
            <IncomingItemStatsSection />
          </div>
        </div>
      </section>
    </>
  );
};
