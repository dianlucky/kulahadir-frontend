import { Divider, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CashAdvanceType, LeaveRequestType } from "@/types";
interface OwnerRecapProps {
  requests: LeaveRequestType[];
  cashAdvances: CashAdvanceType[];
}

export const OwnerRecap: React.FC<OwnerRecapProps> = ({
  requests,
  cashAdvances,
}) => {
  // const { creds } = useAuth();

  return (
    <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
      <div className="divide-y divide-gray-300">
        <div className="flex justify-between text-xs items-center p-2">
          <Text fw={700} c="#654433">
            Rekap absensi bulan ini
          </Text>
          <IconCalendar size={22} color="#654433" />
        </div>
        <Divider></Divider>
        <div className="w-full grid grid-cols-5 pb-2 pt-2">
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center ml-3"
          >
            <div className="p-2 bg-transparent text-green-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {cashAdvances.filter((data) => data.status == "Accepted").length}
            </div>
            <div className="text-xs -mt-1 ml-6 text-center">
              Pengajuan kasbon
            </div>
          </Link>
          <Divider
            className="flex flex-col mx-auto"
            orientation="vertical"
          ></Divider>
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center"
          >
            <div className="p-2 text-yellow-600 text-2xl  rounded-xl font-bold w-full h-full text-center ">
              {
                requests.filter(
                  (data) => data.type == "izin" && data.status == "Accepted"
                ).length
              }
            </div>
            <div className="text-xs -mt-1 text-center">Pengajuan izin</div>
          </Link>
          <Divider
            className="flex flex-col mx-auto"
            orientation="vertical"
          ></Divider>
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center mr-15 -ml-2"
          >
            <div className="p-2 text-sky-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {
                requests.filter(
                  (data) => data.type == "sakit" && data.status == "Accepted"
                ).length
              }
            </div>
            <div className="text-xs -mt-1 ml-4 text-center">Pengajuan sakit</div>
          </Link>
        </div>
        <Divider className="mb-4"></Divider>
      </div>
    </section>
  );
};
