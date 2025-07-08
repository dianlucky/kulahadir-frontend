import { MenuList } from "@/components/navigation";
import {
  IconArchiveFilled,
  IconCategory,
  IconStackPop,
  IconStackPush,
} from "@tabler/icons-react";
import React from "react";

export const MenuSection: React.FC = () => {
  return (
    <>
      <MenuList
        navigations={[
          {
            title: "Kelola Kategori",
            href: "/warehouse-inventory/category",
            icon: IconCategory,
            color: "bg-brown",
          },
          {
            title: "Kelola Barang",
            href: "/warehouse-inventory/item",
            icon: IconArchiveFilled,
            color: "bg-brown",
          },
          {
            title: "Kelola Stok Masuk",
            href: "/warehouse-inventory/stock-in",
            icon: IconStackPush,
            color: "bg-brown",
          },
          {
            title: "Kelola Stok Keluar",
            href: "/warehouse-inventory/stock-out",
            icon: IconStackPop,
            color: "bg-brown",
          },
        ]}
      />
    </>
  );
};
