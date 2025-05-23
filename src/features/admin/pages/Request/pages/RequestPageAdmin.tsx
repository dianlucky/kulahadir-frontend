import { CloseButton, Divider, Text } from "@mantine/core";
import {
  DeleteRequestAdmin,
  EmployeeDetailCard,
  RequestDetailAdmin,
  RequestTableAdmin,
} from "../components";
import { useState } from "react";
import { RequestType } from "@/types";

export const RequestPageAdmin: React.FC = () => {
  const [isDelete, setDelete] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [request, setRequest] = useState<RequestType | undefined>();
  const [successDelete, setSuccessDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);

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
              <RequestTableAdmin setDelete={setDelete} setEdit={setEdit} />
            </div>
          </div>
          <div className="col-span-3">
            {isEdit && (
              <>
                <div className="bg-white shadow-sm p-6 rounded-lg">
                  <EmployeeDetailCard />
                </div>
                <div className="bg-white shadow-sm p-6 rounded-lg mt-2">
                  <RequestDetailAdmin />
                </div>
              </>
            )}

            {isDelete && (
              <>
                <DeleteRequestAdmin
                  setDelete={setDelete}
                  request={request}
                  setSuccessDelete={setSuccessDelete}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
