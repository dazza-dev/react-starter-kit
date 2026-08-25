import { IconHome, IconPoint, IconSettings, IconUsers } from "@tabler/icons-react";
import type { MenuitemsType } from "./sidebar.type";

/**
 * Each item declares the permission needed to see it; SidebarItems drops the ones the user lacks and any groups left empty.
 */
const Menuitems: MenuitemsType[] = [
  {
    id: "menu-dashboard",
    title: "sidebar:dashboard",
    icon: IconHome,
    href: "/app/dashboard",
    permission: "read-dashboard",
  },
  {
    id: "menu-users",
    title: "sidebar:users",
    icon: IconUsers,
    href: "/app/users",
    permission: "read-users",
  },
  {
    id: "menu-configs",
    title: "sidebar:configs",
    icon: IconSettings,
    href: "#",
    permission: ["read-roles", "read-groups", "read-config"],
    children: [
      {
        id: "menu-roles",
        title: "sidebar:roles",
        icon: IconPoint,
        href: "/configs/roles",
        permission: "read-roles",
      },
      {
        id: "menu-groups",
        title: "sidebar:groups",
        icon: IconPoint,
        href: "/configs/groups",
        permission: "read-groups",
      },
      {
        id: "menu-settings",
        title: "sidebar:settings",
        icon: IconPoint,
        href: "/configs/settings",
        permission: "read-config",
      },
    ],
  },
];

export default Menuitems;
