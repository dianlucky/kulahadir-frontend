import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateItemform } from "../components";
import { ItemType } from "@/types";

export const UpdateItemPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item as ItemType;
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
            <h2 className="font-semibold">Edit Barang</h2>
          </div>
          <div></div>
        </div>
      </section>
      <section className="mt-1 px-6">
        <UpdateItemform item={item} />
      </section>
    </>
  );
};
