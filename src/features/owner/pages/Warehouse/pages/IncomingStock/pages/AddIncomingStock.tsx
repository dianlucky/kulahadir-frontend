import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IncomingStockSection } from "../components";
import { ItemType } from "@/types";
import { useGetByCategory } from "../../Item/api";

export const AddIncomingStock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // GET ALL ITEM
  const [items, setItems] = useState<ItemType[]>([]);
  const { data: DataItems, isLoading: LoadingItems } = useGetByCategory(
    location.pathname.includes("frozen") ? "Frozen" : "!Frozen"
  );
  useEffect(() => {
    if (DataItems) {
      setItems(DataItems);
    } else {
      setItems([]);
    }
  }, [DataItems]);
  // END FOR GET ALL ITEM
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
            <h2 className="font-semibold ">Tambah barang masuk</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div className="mx-5 mt-2">
        {/* <FormIncomingSection /> */}
        <IncomingStockSection items={items} LoadingItems={LoadingItems} />
      </div>
    </>
  );
};
