import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailOutgoingType, OutgoingDataType } from "@/types";
import { useGetDetailByOutgoingId } from "../api";
import { DetailOutgoingSection } from "../components";

export const DetailOutgoingStock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const outgoingData = location.state.data as OutgoingDataType;
  console.log("Outgoing data : ", outgoingData);
  //   GET INCOMING DETAILS BY ID
  const [details, setDetails] = useState<DetailOutgoingType[]>([]);
  const { data: DataDetails, refetch: RefetchDetails } =
    useGetDetailByOutgoingId(outgoingData.id);
  useEffect(() => {
    if (DataDetails) {
      setDetails(DataDetails);
    } else {
      setDetails([]);
    }
  }, [DataDetails]);
  //   END FOR GET INCOMING DETAILS BY ID
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
            <h2 className="font-semibold">Detail Barang Keluar</h2>
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
          <DetailOutgoingSection
            outgoingData={outgoingData}
            details={details}
            RefetchDetails={RefetchDetails}
          />
        </div>
      </section>
    </>
  );
};
