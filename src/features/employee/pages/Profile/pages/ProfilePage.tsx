import { IconBriefcase, IconChevronLeft, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "../components";
import { useEffect, useState } from "react";
import { EmployeeType } from "@/types";
import { usegetEmployeeByAccountId } from "../api";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = usegetEmployeeByAccountId(1);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  return (
    <main>
      <section className="flex m-3 shadow-md rounded-xl gap-4 items-center p-4 bg-white mt-15">
        <div className="bg-slate-500 text-white rounded-full p-4">
          <IconUser className="w-10 h-10" />
        </div>
        <div className="font-bold text-lg">
          {employee?.name}
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <IconBriefcase size={20} />{" "}
            <span className="font-semibold">{employee?.account.status}</span>
          </div>
        </div>
      </section>

      <ProfileMenu employee={employee} />
    </main>
  );
};
