import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { RequestList } from "../components";
import { LeaveRequestType } from "@/types";
import { useGetAllLeave } from "@/features/admin/pages/Request";
import { useEffect, useState } from "react";

export const RequestOwnerPage: React.FC = () => {
  const navigate = useNavigate();

  // GET REQUEST
  const [requests, setRequests] = useState<LeaveRequestType[]>([]);
  const { data: DataRequests, isLoading: LoadingRequest } = useGetAllLeave();
  useEffect(() => {
    if (DataRequests) {
      setRequests(DataRequests);
    }
  }, [DataRequests]);
  // END FOR GET REQUEST
  console.log("Data request :", requests);
  return (
    <main>
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
          <div className="font-semibold text-brown -ml-3">
            <h2 className="font-semibold">Data pengajuan izin / sakit</h2>
          </div>
          <div>
            
          </div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          {!LoadingRequest && <RequestList requests={requests} />}
        </div>
      </div>
    </main>
  );
};
