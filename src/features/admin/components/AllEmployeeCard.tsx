import { IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// import { useGetEmployees } from "@/admin_features/employees/api";
import { useAuth } from "@/features/auth";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeeType } from "@/types";

interface AllEmployeeCardProps {
  employees?: EmployeeType[];
}

export const AllEmployeeCard: React.FC<AllEmployeeCardProps> = ({
  employees,
}) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate("/login");

  return (
    <div
      className={`rounded-lg flex px-5 h-20 text-white shadow-md bg-slate-500`}
    >
      <EmployeeCard
        title="Total Seluruh Pegawai"
        employee_total={
          employees?.filter((data) => data.account.level == "Pegawai").length
        }
        IconProps={IconUsers}
      ></EmployeeCard>
    </div>
  );
};
