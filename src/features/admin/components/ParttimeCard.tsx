import { IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// import { useGetEmployees } from "@/admin_features/employees/api";
import { useAuth } from "@/features/auth";

import { EmployeeCard } from "./EmployeeCard";
import { EmployeeType } from "@/types";

interface ParttimeCardProps {
  employees?: EmployeeType[];
}

export const ParttimeCard: React.FC<ParttimeCardProps> = ({ employees }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate("/login");

  return (
    <div className={`rounded-lg flex px-5 text-white shadow-md bg-purple-500`}>
      <EmployeeCard
        title="Total Pegawai Part time"
        employee_total={
          employees?.filter(
            (data) =>
              data.account.status == "Part time" &&
              data.account.level == "Pegawai"
          ).length
        }
        IconProps={IconUsers}
      ></EmployeeCard>
    </div>
  );
};
