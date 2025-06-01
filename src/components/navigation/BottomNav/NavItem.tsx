import { Link } from "react-router-dom";

import { clsx } from "@/utils/format";

import type { Navigation } from "./BottomNav";
import { Indicator } from "@mantine/core";

export const NavItem: React.FC<Navigation> = ({
  title,
  href,
  icon,
  currentPath,
  hasUnread,
}) => {
  const isActive = currentPath === href;
  const Icon = icon;

  return (
    <Link
      to={href}
      className={clsx(
        "flex flex-col items-center justify-center w-full relative",
        isActive ? "text-brown-600" : "text-slate-100"
      )}
    >
      <Indicator
        inline
        disabled={!hasUnread}
        processing
        color="red"
        size={10}
        offset={-2}
      >
        <Icon className="w-5 h-5 mb-1" color="grey" />
      </Indicator>
      <div className="text-sm font-medium text-slate-500">{title}</div>
    </Link>
  );
};
