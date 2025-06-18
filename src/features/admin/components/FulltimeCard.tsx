import { IconUsers } from "@tabler/icons-react";

// import { useGetEmployees } from "@/admin_features/employees/api";

import { EmployeeCard } from "./EmployeeCard";
import { EmployeeType } from "@/types";

interface FulltimeCardProps {
  employees?: EmployeeType[];
}

export const FulltimeCard: React.FC<FulltimeCardProps> = ({ employees }) => {
  // const navigate = useNavigate();
  // const { creds } = useAuth();

  return (
    <div
      className={`rounded-lg flex px-5 h-20 text-white shadow-md bg-blue-500`}
    >
      <EmployeeCard
        title="Total Pegawai tetap"
        employee_total={
          employees?.filter(
            (data) =>
              data.account.status == "Pegawai tetap" &&
              data.account.level == "Pegawai"
          ).length
        }
        IconProps={IconUsers}
      ></EmployeeCard>
    </div>
  );
};
