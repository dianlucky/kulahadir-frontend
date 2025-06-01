import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiodataSection } from "../components";
import { EmployeeType } from "@/types";
import { usegetEmployeeByAccountId } from "../api";
import { useAuth } from "@/features/auth";

export const BiodataPage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = usegetEmployeeByAccountId(creds?.id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
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
            <h2 className="font-semibold">Biodata</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <div className="mt-2 mx-6">
        <BiodataSection employee={employee} />
      </div>
    </main>
  );
};
