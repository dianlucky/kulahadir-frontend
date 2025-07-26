import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEditBiodata } from "../components";
import { EmployeeType } from "@/types";
import { useEffect, useState } from "react";
import { usegetEmployeeByAccountId } from "../api";

export const BiodataEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.employee as EmployeeType;

  // GET EMPLOYEE
  const [employee, setEmployee] = useState<EmployeeType>();
  const {
    data: DataEmployee,
    refetch: RefetchEmployee,
    // isLoading: LoadingEmployee,
  } = usegetEmployeeByAccountId(data.account_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    } else {
      setEmployee(undefined);
    }
  }, [DataEmployee]);
  // END FOR GET EMPLOYEE
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
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
            <h2 className="font-semibold">Edit Biodata</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <div className="mt-2 mx-6">
        {employee && (
          <FormEditBiodata
            employee={employee}
            RefetchEmployee={RefetchEmployee}
          />
        )}
      </div>
    </main>
  );
};
