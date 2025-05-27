import { AttendanceType } from "@/types";
import { Badge, Divider, Image, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface AttendanceCardProps {
  attendance: AttendanceType | undefined;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
}) => {
  return (
    <section className="bg-white shadow-md rounded-xl p-2">
      <div className="flex justify-between p-1 px-3">
        <div>
          <Text fw={"bold"} size="md">
            Absensi
          </Text>
        </div>
        <div className="-mt-1">
          <Badge radius="xs" size="sm" color="green">
            {attendance?.schedule.attendance_status}
          </Badge>
        </div>
      </div>
      <Divider size={"md"} />
      {attendance ? (
        <div>
          <div className="grid grid-cols-12 p-3">
            <div className="col-span-2 text-center my-auto">
              <Text fw={"bold"} size="40px">
                {attendance?.schedule.shift_code}
              </Text>
              <Text size="14px" mt={-2}>
                Malam
              </Text>
            </div>
            <div className="col-span-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-9">
              <div>
                <Text size="sm">Hari & tangal :</Text>
                <Text size="sm" fw={"bold"} mt={-5}>
                  {attendance &&
                    format(attendance.schedule.date, "EEEE, dd MMM yyyy", {
                      locale: id,
                    })}
                </Text>
              </div>
              <div className="py-1">
                <Divider />
              </div>
              <div className="flex justify-between mr-5">
                <div>
                  <Text size="sm">Check-in</Text>
                  <Text size="sm" fw={"bold"} mt={-5}>
                    {attendance &&
                      format(attendance.check_in, "HH:mm", {
                        locale: id,
                      })}{" "}
                    WITA
                  </Text>
                </div>
                <div>
                  <Text size="sm">Check-out</Text>
                  <Text size="sm" fw={"bold"} mt={-5}>
                    {attendance?.check_out
                      ? `${format(attendance.check_out, "HH:mm", {
                          locale: id,
                        })} WITA`
                      : "--:--"}
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between px-7 mt-1">
            <div className="text-center">
              <Text size="sm">Jadwal masuk</Text>
              <Text size="sm" fw={"bold"} mt={-5}>
                {attendance?.schedule.start_time}WITA
              </Text>
            </div>
            <div className="mt-2">
              <div className="w-px h-8 bg-gray-300 mx-4" />
            </div>
            <div className="text-center">
              <Text size="sm">Jadwal keluar</Text>
              <Text size="sm" fw={"bold"} mt={-5}>
                {attendance?.schedule.end_time}WITA
              </Text>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 px-3 py-2 mb-5">
          <div className="flex justify-center">
            <Image
              src="/images/not-found.svg"
              style={{
                width: "120px",
              }}
            />
          </div>
          <div className="flex justify-center">
            <Text fw={700} size="md">
              Ups!
            </Text>
          </div>
          <div className="flex justify-center -mt-1">
            <Text fw={700} size="md">
             Kehadiran kosong
            </Text>
          </div>
          <div className="flex justify-center -mt-1">
            <Text fw={500} size="xs">
             Sepertinya anda belum absen..
            </Text>
          </div>
        </div>
      )}
    </section>
  );
};
