import React from "react";

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
