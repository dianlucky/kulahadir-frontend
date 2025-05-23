import { Button, Divider, Image, Text, UnstyledButton } from "@mantine/core";
import { IconEye, IconInfoCircle, IconUsers } from "@tabler/icons-react";

export const EmployeeCardSalary: React.FC = () => {
  return (
    <>
      <section className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <div className="text-dark font-semibold cursor-pointer text-md">
            Daftar pegawai
          </div>
          <div>
            <IconUsers />
          </div>
        </div>
        <Divider />
        <div className="mt-4">
          <div className="bg-slate-50 shadow-xs grid grid-cols-12 rounded-xl p-3">
            <div className="col-span-1 flex justify-center">
              <Image
                radius="200"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                style={{
                  width: "35px",
                  height: "35px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-span-1 text-center">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-6">
              <div>
                <Text fw={"bold"} size="sm" truncate="end">
                  Dian Lucky Prayogi
                </Text>
              </div>
              <div>
                <Text size="xs">Pegawai tetap</Text>
              </div>
            </div>
            <div className="col-span-4 flex justify-end">
              <div>
                <Button size="xs" variant="subtle" color="gray">
                  <IconInfoCircle color="#4E71FF" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
