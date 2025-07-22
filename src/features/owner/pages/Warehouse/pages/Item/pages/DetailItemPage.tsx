import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailItemSection } from "../components";
import { ItemType } from "@/types";
import { useGetItemById } from "../api";

export const DetailItemPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.state.data.id as number;

  // GET ITEM
  const [item, setItem] = useState<ItemType>();
  const { data: DataItem, isLoading: LoadingItem } = useGetItemById(itemId);
  useEffect(() => {
    if (DataItem) {
      setItem(DataItem);
    } else {
      setItem(undefined);
    }
  }, [DataItem]);
  // END FOR GET ITEM
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
            <h2 className="font-semibold">Detail barang</h2>
          </div>
          <div></div>
        </div>
      </section>
      <section className="mt-1 px-6">
        <DetailItemSection item={item} LoadingItem={LoadingItem} />
      </section>
    </>
  );
};
