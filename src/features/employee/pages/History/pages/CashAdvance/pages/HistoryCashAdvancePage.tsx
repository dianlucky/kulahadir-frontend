import {
  Button,
  Divider,
  Popover,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconAdjustments, IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryCashAdvanceList } from "../components";
import { CashAdvanceType } from "@/types";
import { useGetCashAdvanceByEmployeeId } from "@/features/employee/pages/CashAdvance";
import { useAuth } from "@/features/auth";

export const HistoryCashAdvancePage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [opened, setOpened] = useState<boolean>(false);
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances } = useGetCashAdvanceByEmployeeId(
    creds?.employee_id
  );
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);

  const [status, setStatus] = useState<string | null>("accepted");
  const [activeStatus, setActiveStatus] = useState<string | null>("accepted");

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
            <h2 className="font-semibold">Riwayat kasbon</h2>
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
                    <Select
                      label="Status"
                      size="xs"
                      value={status}
                      onChange={setStatus}
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
                      onClick={() => {
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
      <div className="mt-2 mx-6">
        <HistoryCashAdvanceList
          status={activeStatus}
          cashAdvances={cashAdvances}
        />
      </div>
    </main>
  );
};
