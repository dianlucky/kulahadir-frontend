import { MenuList } from "@/components/navigation";
import {
  IconArchiveFilled,
  IconCategory,
  IconStackPop,
  IconStackPush,
} from "@tabler/icons-react";
import React from "react";

interface MenuSectionProps {
  type: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ type }) => {
  return (
    <>
      <MenuList
        navigations={[
          {
            title: "Kelola Kategori",
            href: `/${type}/category`,
            icon: IconCategory,
            color: "bg-brown",
          },
          {
            title: "Kelola Barang",
            href: `/${type}/item`,
            icon: IconArchiveFilled,
            color: "bg-brown",
          },
          {
            title: "Kelola Stok Masuk",
            href: `/${type}/incoming`,
            icon: IconStackPush,
            color: "bg-brown",
          },
          {
            title: "Kelola Stok Keluar",
            href: `/${type}/outgoing`,
            icon: IconStackPop,
            color: "bg-brown",
          },
        ]}
      />
    </>
  );
};
