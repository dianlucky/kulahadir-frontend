import { IconBriefcase, IconChevronLeft, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "../components";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="flex m-3 shadow-md rounded-xl gap-4 items-center p-4 bg-white mt-15">
        <div className="bg-slate-500 text-white rounded-full p-4">
          <IconUser className="w-10 h-10" />
        </div>
        <div className="font-bold text-lg">
          Pegawai 1
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <IconBriefcase size={20} />{" "}
            <span className="font-semibold">Pegawai tetap</span>
          </div>
        </div>
      </section>

      <ProfileMenu />
    </main>
  );
};
