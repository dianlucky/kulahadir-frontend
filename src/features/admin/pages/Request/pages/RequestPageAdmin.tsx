import { Divider, Loader, Text } from "@mantine/core";
import {
  CashAdvanceDelete,
  CashAdvanceDetail,
  CashAdvanceTable,
  DeleteRequestAdmin,
  EmployeeDetailCard,
  RequestDetailAdmin,
  RequestTableAdmin,
} from "../components";
import { useEffect, useState } from "react";
import { CashAdvanceType, LeaveRequestType } from "@/types";
import { useGetAllLeave } from "../api";
import { useGetAllCashAdvance } from "@/features/employee/pages/CashAdvance";

export const RequestPageAdmin: React.FC = () => {
  // GET REQUEST
  const [isDelete, setDelete] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequestType>();

  const [request, setRequest] = useState<LeaveRequestType[] | undefined>();
  const {
    data: DataRequests,
    isLoading: LoadingRequest,
    refetch: RefetchRequest,
  } = useGetAllLeave();
  useEffect(() => {
    if (DataRequests) {
      setRequest(DataRequests);
    }
  }, [DataRequests]);
  // END FOR GET REQUEST

  // GET CASH ADVANCES
  const [isDeleteCashAdvance, deleteCashAdvance] = useState(false);
  const [isEditCashAdvance, editCashAdvance] = useState(false);
  const [selectedCashAdvance, setSelectedCashAdvance] =
    useState<CashAdvanceType>();

  const [cashAdvances, setCashAdvances] = useState<
    CashAdvanceType[] | undefined
  >();
  const {
    data: DataCashAdvances,
    isLoading: LoadingCashAdvances,
    refetch: RefetchCashAdvances,
  } = useGetAllCashAdvance();
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);
  // END FOR GET CASH ADVANCES

  if (LoadingRequest && LoadingCashAdvances) {
    return (
      <div className="flex justify-center">
        <Loader color="orange" size="lg" type="dots" />
      </div>
    );
  }

  return (
    <section>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex justify-center mb-4">
          <Text fw={"bolder"} size="lg" c="#343a40">
            Data Pengajuan
          </Text>
        </div>
        <Divider />
        <div className="grid grid-cols-12 gap-2 mt-4">
          <div className="col-span-9">
            <div className="bg-white shadow-sm p-6 rounded-lg">
              <RequestTableAdmin
                request={request}
                setDelete={setDelete}
                setEdit={setEdit}
                setSelectedRequest={setSelectedRequest}
              />
            </div>
            <div className="bg-white shadow-sm p-6 rounded-lg mt-6">
              <CashAdvanceTable
                cashAdvances={cashAdvances}
                deleteCashAdvance={deleteCashAdvance}
                editCashAdvance={editCashAdvance}
                setSelectedCashAdvance={setSelectedCashAdvance}
              />
            </div>
          </div>
          <div className="col-span-3">
            {isEdit && (
              <>
                <div className="bg-white shadow-sm p-6 rounded-lg">
                  <EmployeeDetailCard employee={selectedRequest?.employee} />
                </div>
                <div className="bg-white shadow-sm p-6 rounded-lg mt-2">
                  <RequestDetailAdmin
                    selectedRequest={selectedRequest}
                    RefetchRequest={RefetchRequest}
                  />
                </div>
              </>
            )}

            {isDelete && (
              <>
                <DeleteRequestAdmin
                  setDelete={setDelete}
                  selectedRequest={selectedRequest}
                  RefetchRequest={RefetchRequest}
                />
              </>
            )}
            {isEditCashAdvance && (
              <>
                <div className="bg-white shadow-sm p-6 rounded-lg">
                  {selectedCashAdvance && (
                    <EmployeeDetailCard
                      employee={selectedCashAdvance.employee}
                    />
                  )}
                </div>
                <div className="bg-white shadow-sm p-6 rounded-lg mt-2">
                  <CashAdvanceDetail
                    selectedCashAdvance={selectedCashAdvance}
                    RefetchCashAdvance={RefetchCashAdvances}
                  />
                </div>
              </>
            )}

            {isDeleteCashAdvance && (
              <>
                <CashAdvanceDelete
                  deleteCashAdvance={deleteCashAdvance}
                  selectedCashAdvance={selectedCashAdvance}
                  RefetchCashAdvance={RefetchCashAdvances}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
