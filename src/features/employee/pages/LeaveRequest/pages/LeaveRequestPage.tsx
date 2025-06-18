import { RequestList } from "@/features/employee/components";
import { LeaveRequestType } from "@/types";
import { UnstyledButton } from "@mantine/core";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLeaveRequestByEmployeeId } from "../api";
import { useAuth } from "@/features/auth";

export const LeaveRequestPage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestType[]>([]);
  const { data: DataLeaveRequest } = useGetLeaveRequestByEmployeeId(
    creds?.employee_id
  );
  useEffect(() => {
    if (DataLeaveRequest) {
      setLeaveRequests(DataLeaveRequest);
    }
  }, [DataLeaveRequest]);
  console.log("data leave request : ", leaveRequests);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div className="">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Pengajuan izin</h2>
          </div>
          <div className="mr-2">
            <UnstyledButton
              onClick={() => {
                navigate("/leave-request/add");
              }}
            >
              <IconPlus size={22} />
            </UnstyledButton>
          </div>
        </div>
      </section>
      <div className="mt-1 mx-6">
        <RequestList leaveRequests={leaveRequests} />
      </div>
    </main>
  );
};
