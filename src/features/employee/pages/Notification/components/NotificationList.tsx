import { Text, UnstyledButton } from "@mantine/core";
import { IconBell, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const NotificationList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-sm">
      <div className="grid grid-cols-12 py-5 px-4">
        <div className="col-span-1">
          <IconBell size={27} />
        </div>
        <div className="col-span-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 mx-auto">
          <Text fw={"bold"} size="14px" lineClamp={2} c={"#222831"}>
            Slip gaji untuk bulan Mei 2025 sudah diterbitkan, silahkan cek di
            menu lokasi anda
          </Text>
        </div>
        <div className="col-span-1">
          <UnstyledButton
            onClick={() => {
              navigate("/notification/detail");
            }}
          >
            <IconChevronRight color="#654433" />
          </UnstyledButton>
        </div>
      </div>
    </div>
  );
};
