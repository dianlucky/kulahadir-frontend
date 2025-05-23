import {
  Button,
  Divider,
  Modal,
  NumberInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarCheck } from "@tabler/icons-react";

export const AttendanceMonthlyDetail: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="bg-white shadow-sm p-4 mt-2">
        <div className="flex justify-between mb-1">
          <div className="text-dark font-semibold cursor-pointer text-sm">
            Detail Kehadiran & bon
          </div>
          <div>
            <IconCalendarCheck size={20} />
          </div>
        </div>
        <Divider />
        <div className="mt-2 grid grid-cols-12 px-2">
          <div className="col-span-12">
            <div className="flex">
              <div>
                <Text size="sm">Bulan : </Text>
              </div>
              <div className="ml-2">
                <Text size="sm" fw={"bold"}>
                  Mei 2025{" "}
                </Text>
              </div>
            </div>
            <Divider />
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Kehadiran :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                27 hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Terlambat :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                5 kali
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Absen :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                1 hari
              </Text>
            </div>
          </div>
          <div className="col-span-6 mt-2">
            <div>
              <Text size="sm">Izin :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                2 hari
              </Text>
            </div>
          </div>
          <div className="col-span-12 mt-2 mb-1">
            <div>
              <Text size="sm">Total kasbon :</Text>
              <Text size="sm" fw={"bold"} mt={-3}>
                Rp. 250.000
              </Text>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-2">
          <Button onClick={open} fullWidth>
            Buat slip gaji bulan ini
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size={"lg"}
        >
          <div>
            <div className="w-full text-center mb-2">
              <Text fw={"bold"} size="md">
                Terbitkan gaji pegawai
              </Text>
            </div>
            <Divider />
            <div className="grid grid-cols-12 mt-2 gap-2">
              <div className="col-span-7">
                <div className="bg-white shadow-sm grid grid-cols-12 p-5">
                  <div className="col-span-12 -mt-2">
                    <div className="flex">
                      <div>
                        <Text size="sm">Nama : </Text>
                      </div>
                      <div className="ml-2">
                        <Text size="sm" fw={"bold"}>
                          Dian Lucky Prayogi
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex">
                      <div>
                        <Text size="sm">Bulan : </Text>
                      </div>
                      <div className="ml-2">
                        <Text size="sm" fw={"bold"}>
                          Mei 2025{" "}
                        </Text>
                      </div>
                    </div>
                    <Divider />
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Kehadiran :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        27 hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Terlambat :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        5 kali
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Absen :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        1 hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2">
                    <div>
                      <Text size="sm">Izin :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        2 hari
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2 mb-1">
                    <div>
                      <Text size="sm">Total kasbon :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        Rp. 250.000
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-6 mt-2 mb-1">
                    <div>
                      <Text size="sm">Total gaji :</Text>
                      <Text size="sm" fw={"bold"} mt={-3}>
                        Rp. 1.250.000
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5">
                <div className="bg-white shadow-sm p-2">
                  <div>
                    <NumberInput
                      label="Bonus pegawai"
                      placeholder="Tidak wajib diisi"
                      size="xs"
                      prefix="Rp."
                      decimalSeparator=","
                      allowDecimal={false}
                      thousandSeparator="."
                      hideControls
                    />
                  </div>
                  <div>
                    <Textarea
                      size="xs"
                      radius="xs"
                      label="Catatan"
                      placeholder="Tambahkan catatan untuk pegawai"
                    />
                  </div>
                  <div className="mt-2">
                    <Text size="10px" c={"red"} fs={"italic"} className="text-justify">
                      *Cek kembali data sebelum menerbitkan gaji pegawai, Slip
                      gaji yang telah diterbitkan tidak dapat diedit
                    </Text>
                  </div>
                  <div className="w-full flex gap-1 mt-3">
                    <Button fullWidth size="xs" color="gray" onClick={close}>
                      Kembali
                    </Button>
                    <Button fullWidth size="xs">
                      Terbitkan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
