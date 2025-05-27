import {
  Button,
  Divider,
  Popover,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconAdjustments, IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryRequestList } from "../components";
import { LeaveRequestType } from "@/types";
import { useGetLeaveRequestByEmployeeId } from "@/features/employee/pages/LeaveRequest";

export const HistoryRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState<boolean>(false);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestType[]>([]);
  const { data: DataLeaveRequest, refetch: RefetchLeaveRequest } =
    useGetLeaveRequestByEmployeeId(1);
  useEffect(() => {
    if (DataLeaveRequest) {
      setLeaveRequests(DataLeaveRequest);
    } else {
      setLeaveRequests([]);
    }
  }, [DataLeaveRequest]);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown ">
            <h2 className="font-semibold">Riwayat izin / sakit</h2>
          </div>
          <div>
            <Popover
              width={200}
              position="bottom"
              withArrow
              shadow="md"
              opened={opened}
              closeOnClickOutside={true}
            >
              <Popover.Target>
                <UnstyledButton
                  size="xs"
                  onClick={() => setOpened((prev) => !prev)}
                >
                  <IconAdjustments color="#4E71FF" />
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">
                  <div className="mb-3">
                    <Text size="sm" fw={"bolder"}>
                      Filter data
                    </Text>
                    <Divider className="mb-1" />
                    <Select
                      label="Tipe"
                      size="xs"
                      // value={status}
                      // onChange={setStatus}
                      data={[
                        { label: "izin", value: "leave" },
                        { label: "sakit", value: "sick" },
                        { label: "semua", value: "all" },
                      ]}
                    />

                    <MonthPickerInput
                      label="Bulan"
                      size="xs"
                      // value={month}
                      // onChange={setMonth}
                    />
                    <Select
                      label="Status"
                      size="xs"
                      // value={status}
                      // onChange={setStatus}
                      data={[
                        { label: "disetujui", value: "accepted" },
                        { label: "ditolak", value: "rejected" },
                      ]}
                    />
                  </div>
                  <Divider />
                  <div>
                    <Button
                      fullWidth
                      size="xs"
                      onClick={() => setOpened(false)}
                    >
                      Simpan
                    </Button>
                  </div>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </section>
      <div className="mt-2 mx-6">
        <HistoryRequestList leaveRequests={leaveRequests} />
      </div>
    </main>
  );
};
