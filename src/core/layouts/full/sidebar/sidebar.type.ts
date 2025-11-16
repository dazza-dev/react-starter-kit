import React from "react";

export type MenuitemsType = {
  [x: string]: any;
  id?: string;
  navLabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
};

export type NavGroup = {
  navLabel?: boolean;
  subheader?: string;
};

export type NavGroupItemType = {
  item: NavGroup;
  hideMenu: string | boolean;
};

export type NavGroupProps = {
  [x: string]: any;
  navLabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
};

export type NavCollapseProps = {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export type NavGroupItem = {
  [x: string]: any;
  id?: string;
  navLabel?: boolean;
  subheader?: string;
  title?: string;
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
