import {
  IconCashRegister,
  IconChartCandle,
  IconChevronRight,
  IconClipboardHeart,
  IconClipboardText,
  IconLuggage,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const HistoryMenu: React.FC = () => {
  return (
    <section className="p-2 flex flex-col gap-3 text-slate-600 mx-3 mt-4">
      <h4
        className="text-brown"
        style={{ fontWeight: "bold", fontSize: "15px" }}
      >
        Data Riwayat :
      </h4>
      {/* Data Absensi */}

      <Link
        to="/history/attendance"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconChartCandle size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Absensi</span>
            <p className="text-xs text-slate-400">Riwayat Absensi</p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>

      <Link
        to="/history/paid-leave"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconLuggage size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Cuti</span>
            <p className="text-xs text-slate-400">
              Riwayat cuti yang disetujui
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>

      <Link
        to="/history/sick"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconClipboardHeart size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Sakit</span>
            <p className="text-xs text-slate-400">
              Riwayat sakit yang disetujui
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>

      {/* Data Izin */}
      <Link
        to="/history/data-absence"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconClipboardText size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Izin</span>
            <p className="text-xs text-slate-400">
              Riwayat izin yang disetujui
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>

      {/* Data Cuti */}

      {/* Data Lembur */}
      <Link
        to="/history/data-overtime"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconCashRegister size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Kasbon</span>
            <p className="text-xs text-slate-400">
              Riwayat kasbon yang sudah disetujui
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>
    </section>
  );
};
