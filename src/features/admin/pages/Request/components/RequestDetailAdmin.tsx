import { Button, Divider, Text } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";
import React from "react";

export const RequestDetailAdmin: React.FC = () => {
    
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Detail pengajuan
        </div>
        <div>
          <IconClipboardText />
        </div>
      </div>
      <Divider />
      <div className="mt-2">
        <div className="grid grid-cols-12 mt-2 ml-4">
          <div className="col-span-12">
            <div className="mt-2">
              <Text fw={"bold"} size="sm">
                Hari & Tanggal:
              </Text>
              <Text size="sm" mt={-5}>
                {/* {employee?.birth_date
                  ? format(
                      new Date(employee.birth_date),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )
                  : ""} */}
                Jum'at, 23 Mei 2003
              </Text>
            </div>
          </div>
          <div className="col-span-12">
            <div className="mt-2">
              <Text fw={"bold"} size="sm">
                Alasan:
              </Text>
              <Text size="sm" mt={-5}>
                Saya izin sakit pak soalnya lorem ipsum sit dolor amet
              </Text>
            </div>
          </div>
          <div className="col-span-12 mt-3">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Button color="red" fullWidth>
                  Tolak
                </Button>
              </div>
              <div className="col-span-6">
                <Button color="blue" fullWidth>
                  Terima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
