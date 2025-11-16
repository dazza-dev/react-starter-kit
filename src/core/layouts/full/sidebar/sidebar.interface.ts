import type { NavGroup, MenuitemsType } from "./sidebar.type";

export type NavGroupProps = MenuitemsType;

export interface NavCollapseProps {
  menu: MenuitemsType;
  level: number;
  pathWithoutLastPart: string;
  pathDirect: string;
  hideMenu: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface NavGroupItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}

export interface ListSubheaderStyleProps {
  dark: boolean;
}
