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
  const isActive =
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);
  console.log(
    "currentPath:",
    JSON.stringify(currentPath),
    "href:",
    JSON.stringify(href),
    "isActive:",
    isActive
  );

  const Icon = icon;

  return (
    <Link
      to={href}
      className={`flex flex-col items-center justify-center w-full relative ${
        isActive ? `text-amber-950` : `text-slate-100`
      }`}
    >
      <Indicator
        inline
        disabled={!hasUnread}
        processing
        color="red"
        size={10}
        offset={-2}
      >
        <Icon
          className={clsx(
            "w-5 h-5 mb-1",
            isActive ? "text-amber-950" : "text-slate-400"
          )}
        />
      </Indicator>
      <div
        className={clsx(
          "text-sm font-medium",
          isActive ? "text-amber-950" : "text-slate-500"
        )}
      >
        {title}
      </div>
    </Link>
  );
};
