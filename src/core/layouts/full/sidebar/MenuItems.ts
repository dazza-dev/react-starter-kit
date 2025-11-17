import { uniqueId } from "lodash";
import type { MenuitemsType } from "./sidebar.type";
import { IconPoint, IconSettings, IconAperture } from "@tabler/icons-react";

/**
 * Menu items for the sidebar.
 */
const Menuitems: MenuitemsType[] = [
  {
    navLabel: true,
    subheader: "common:home",
  },
  {
    id: uniqueId(),
    title: "sidebar:dashboard",
    icon: IconAperture,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "sidebar:configuration",
    icon: IconSettings,
    href: "#",
    children: [
      {
        id: uniqueId(),
        title: "sidebar:users",
        icon: IconPoint,
        href: "/users",
      },
      {
        id: uniqueId(),
        title: "sidebar:roles",
        icon: IconPoint,
        href: "/roles",
      },
    ],
  },
];

export default Menuitems;
