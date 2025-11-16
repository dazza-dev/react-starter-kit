import React from "react";

export type NavGroup = {
  navLabel?: boolean;
  subheader?: string;
};

export type NavItemCommonType = NavGroup & {
  [x: string]: any;
  id?: string;
  title?: string;
  icon?: any;
  href?: string;
  chip?: string;
  chipColor?: string;
  variant?: string | any;
  external?: boolean;
};

export type MenuitemsType = NavItemCommonType & {
  children?: MenuitemsType[];
};

export type NavGroupItem = NavItemCommonType & {
  children?: NavGroup[];
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

export type NavItemType = {
  item: NavGroupItem;
  hideMenu?: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  level?: number | any;
  pathDirect: string;
};
