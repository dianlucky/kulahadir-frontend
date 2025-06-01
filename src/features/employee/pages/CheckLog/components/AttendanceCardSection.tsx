import { AttendanceType, DailyTaskEmployeeType, ScheduleType } from "@/types";
import { Badge, Button, Divider, Modal, Text } from "@mantine/core";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useCheckIn, useCheckOut } from "../api";
import { showNotification } from "@mantine/notifications";
import { IconClockHour8 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

interface AttendanceCardProps {
  schedule?: ScheduleType;
  attendance?: AttendanceType;
  statusLocation: boolean;
  long?: number;
  lat?: number;
  RefetchSchedule: () => void;
  RefetchAttendance: () => void;
  dailyTask: DailyTaskEmployeeType[];
}

type CheckOutRequest = {
  check_out: Date;
  schedule_id?: number;
};

export const AttendanceCardSection: React.FC<AttendanceCardProps> = ({
  schedule,
  attendance,
  statusLocation,
  long,
  lat,
  RefetchSchedule,
  RefetchAttendance,
  dailyTask,
}) => {
  console.log("jadwal :", schedule);
  // console.log("kehadiran :", attendance);
  const [opened, { open, close }] = useDisclosure(false);

  // HANDLE CHECK-IN
  const mutationCheckIn = useCheckIn();
  const handleCheckIn = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // hasil base64
        source: CameraSource.Camera,
      });

      if (!photo || !photo.dataUrl) {
        console.error("No photo taken");
        return;
      }

      // convert base64 to Blob
      const blob = await (await fetch(photo.dataUrl)).blob();
      const file = new File([blob], `snapshot-${Date.now()}.jpeg`, {
        type: "image/jpeg",
      });

      // buat FormData
      const formData = new FormData();
      formData.append("check_in", new Date().toISOString());
      formData.append("attendanc_lat", String(lat)); // asumsi kamu sudah ambil location
      formData.append("attendance_long", String(long));
      formData.append("schedule_id", String(schedule?.id));
      formData.append("snapshot", file); // nama field sama dengan di backend

      // kirim ke backend
      await mutationCheckIn.mutateAsync(formData, {
        onSuccess: (data) => {
          console.log("Check-in berhasil", data);
          RefetchAttendance();
          RefetchSchedule();
          showNotification({
            message: "Check-in sukses",
            color: "green",
            position: "top-center",
          });
        },
        onError: (error) => {
          console.error("Gagal check-in", error);
          showNotification({
            message: "Check-in gagal",
            color: "red",
            position: "top-center",
          });
        },
      });
    } catch (error) {
      console.error("Error taking photo or sending data", error);
    }
  };
  // END FOR CREATE ATTENDANCE (CHECK-IN)

  // HANDLE CHECK-OUT 🚨🚨🚨🚨
  // UPDATE STATUS
  const mutationCheckOut = useCheckOut(attendance?.id);
  const handleCheckOut = async () => {
    const updateStatusData: CheckOutRequest = {
      check_out: new Date(),
      schedule_id: schedule?.id,
    };

    await mutationCheckOut.mutateAsync(updateStatusData, {
      onSuccess: (data: AttendanceType) => {
        console.log("Success:", data);
        RefetchAttendance();
        RefetchSchedule();
        showNotification({
          message: "Check-out sukses, Terimakasih 😉",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END OF UPDATE LEAVE REQUEST
  // END FOR HANDLE CHECK-OUT 🚨🚨🚨🚨
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">Absensi</span>
        {attendance && attendance.status == "Working" ? (
          <Badge
            size="xs"
            color={attendance?.status == "Working" ? "yellow" : "green"}
            radius={"xs"}
            mr={5}
          >
            {attendance?.status}
          </Badge>
        ) : (
          <Badge
            size="xs"
            color={
              schedule?.attendance_status == "belum hadir"
                ? "red"
                : schedule?.attendance_status == "Working"
                ? "yellow"
                : "green"
            }
            radius={"xs"}
            mr={5}
          >
            {schedule?.attendance_status}
          </Badge>
        )}
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-2 text-center m-auto -ml-2">
          <Text fw={"bold"} size="40px">
            {schedule?.shift_code}
          </Text>
        </div>
        <div className="col-span-1 text-center">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-2">
          <div className="mt-2">
            <Text fw={600} size="15px">
              {schedule &&
                format(schedule.date, "EEEE, dd MMM yyyy", { locale: id })}
            </Text>
          </div>
          <div className="py-2">
            <Divider />
          </div>
          <div className="mt-1">
            <Text fw={600} size="15px">
              {schedule?.start_time}- {schedule?.end_time}
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Divider />
      </div>
      <div className="flex justify-between text-xs p-2">
        <div className="flex gap-2">
          <IconClockHour8 size={15} className="text-green-400" /> Masuk :{" "}
          {attendance?.check_in
            ? format(new Date(attendance.check_in), "HH:mm", { locale: id })
            : "--:--"}
        </div>
        <div>
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="ps-3 flex gap-2">
          <IconClockHour8 size={15} className="text-rose-400" /> Keluar :{" "}
          {attendance?.check_out
            ? format(new Date(attendance.check_out), "HH:mm", { locale: id })
            : "--:--"}
        </div>
      </div>
      <div className="w-full px-1 mt-1">
        {schedule?.attendance_status == "belum hadir" && (
          <Button
            size="sm"
            fullWidth
            disabled={statusLocation ? false : true}
            onClick={handleCheckIn}
          >
            {statusLocation ? `CHECK-IN` : `Anda berada diluar lokasi`}
          </Button>
        )}
        {schedule?.attendance_status == "Working" ||
          (schedule?.attendance_status == "Late" &&
            attendance?.status != "Done" && (
              <Button
                size="sm"
                fullWidth
                disabled={
                  !statusLocation ||
                  dailyTask.filter((data) => data.status == "Belum").length != 0
                    ? true
                    : false
                }
                onClick={open}
                color="red"
              >
                {!statusLocation
                  ? `Anda berada diluar lokasi`
                  : dailyTask.filter((data) => data.status == "Belum").length !=
                    0
                  ? "Ada tugas yang belum selesai"
                  : `CHECK-OUT`}
              </Button>
            ))}
      </div>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="px-3">
          <div className="text-center mb-1">
            <Text fw={500} size="md">
              Apakah anda ingin check-out?
            </Text>
          </div>
          <Divider size={"md"} />
          <div className="bg-slate-100 rounded-xl p-3 mt-2">
            <div className="text-center  mt-2">
              <Text fw={700} size="sm">
                Tanggal :{" "}
                {schedule?.date &&
                  format(schedule.date, "EEEE, dd MMMM yyyy", { locale: id })}
              </Text>
            </div>
            <div className="text-center">
              <Text fw={700} size="sm">
                Waktu masuk :{" "}
                {attendance?.check_in &&
                  format(attendance.check_in, "HH:mm", {
                    locale: id,
                  })}
              </Text>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button fullWidth color="grey" onClick={() => close()}>
              Tidak
            </Button>
            <Button fullWidth color="blue" onClick={() => handleCheckOut()}>
              Ya
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
