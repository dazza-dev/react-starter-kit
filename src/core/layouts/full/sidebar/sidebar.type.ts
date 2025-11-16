import React from "react";

export type NavGroup = {
  navLabel?: boolean;
  subheader?: string;
};

export type NavItemCommonType = NavGroup & {
  title?: string;
};

export type MenuitemsType = NavItemCommonType & {
  [x: string]: any;
  id?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
};

export type NavGroupItem = NavItemCommonType & {
  [x: string]: any;
  id?: string;
  icon?: any;
  href?: string;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
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
