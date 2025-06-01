import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AttachmentDescriptionCard, DateDetailCard } from "../components";
import { LeaveRequestType } from "@/types";
import { useAuth } from "@/features/auth";

export const DetailLeaveRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveRequestData = location.state.data as LeaveRequestType;
  console.log("data izin :", leaveRequestData);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Detail {leaveRequestData?.type}</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <DateDetailCard leaveRequestData={leaveRequestData} />

      <AttachmentDescriptionCard leaveRequestData={leaveRequestData} />
    </main>
  );
};
