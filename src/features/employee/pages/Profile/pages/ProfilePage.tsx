import { IconBriefcase } from "@tabler/icons-react";
import { ProfileMenu } from "../components";
import { useEffect, useState } from "react";
import { EmployeeType } from "@/types";
import { usegetEmployeeByAccountId } from "../api";
import { Image } from "@mantine/core";
import { useAuth } from "@/features/auth";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE = "/images/profile-default.png";

export const ProfilePage: React.FC = () => {
  const { creds } = useAuth();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = usegetEmployeeByAccountId(creds?.id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  console.log("Data pegawai : ", employee);
  return (
    <main>
      <section className="flex m-3 shadow-md rounded-xl gap-4 justify-center p-4 bg-white mt-15 ">
        <div className="bg-slate-500 rounded-full w-16 h-16 overflow-hidden">
          <Image
            src={
              employee?.profile_pic
                ? `${BaseURL}/uploads/employees/${employee?.profile_pic}`
                : DEFAULT_IMAGE
            }
            alt="Foto Profil"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="font-bold text-lg mt-2">
          {employee?.name}
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <IconBriefcase className="-mt-1" size={20} />{" "}
            <span className="font-semibold -mt-1">
              {employee?.account.status}
            </span>
          </div>
        </div>
      </section>

      <ProfileMenu employee={employee} />
    </main>
  );
};
