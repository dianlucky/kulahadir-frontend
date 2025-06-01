import {
  Button,
  Divider,
  Popover,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconAdjustments, IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaveRequestType } from "@/types";
import { useAuth } from "@/features/auth";
import { useGetAllLeave } from "@/features/admin/pages/Request";
import { HistoryRequestList } from "../components";

export const HistoryRequestPageOwner: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [opened, setOpened] = useState<boolean>(false);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestType[]>([]);
  const { data: DataLeaveRequest, refetch: RefetchLeaveRequest } =
    useGetAllLeave();
  useEffect(() => {
    if (DataLeaveRequest) {
      setLeaveRequests(DataLeaveRequest);
    } else {
      setLeaveRequests([]);
    }
  }, [DataLeaveRequest]);

  // FILTER STATE
  const [type, setType] = useState<string | null>("sakit");
  const [status, setStatus] = useState<string | null>("accepted");

  const [activeType, setActiveType] = useState<string | null>("sakit");
  const [activeStatus, setActiveStatus] = useState<string | null>("accepted");
  // END FOR FILTER STATE
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
            <h2 className="font-semibold">Riwayat izin / sakit pegawai</h2>
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
                      value={type}
                      onChange={setType}
                      data={[
                        { label: "izin", value: "izin" },
                        { label: "sakit", value: "sakit" },
                        { label: "semua", value: "all" },
                      ]}
                      allowDeselect={false}
                    />
                    <Select
                      label="Status"
                      size="xs"
                      value={status}
                      onChange={setStatus}
                      data={[
                        { label: "disetujui", value: "accepted" },
                        { label: "ditolak", value: "rejected" },
                      ]}
                      allowDeselect={false}
                    />
                  </div>
                  <Divider />
                  <div>
                    <Button
                      fullWidth
                      size="xs"
                      onClick={() => {
                        setActiveType(type);
                        setActiveStatus(status);
                        setOpened(false);
                      }}
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
      <div className=" mx-6">
        <HistoryRequestList
          leaveRequests={leaveRequests}
          type={activeType}
          status={activeStatus}
        />
      </div>
    </main>
  );
};
