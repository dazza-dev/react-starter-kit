import type { NavGroup } from "./sidebar.type";

export type NavGroupProps = NavGroup & {
  [x: string]: any;
  title?: string;
  icon?: any;
  href?: any;
};

export interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface NavGroupItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}
