import type { ElementType, MouseEvent } from "react";

export type NavGroup = {
  navLabel?: boolean;
  subheader?: string;
};

export type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type ChipVariant = "filled" | "outlined";

export type NavItemCommonType = NavGroup & {
  id?: string;
  title?: string;
  subtitle?: string;
  icon?: ElementType;
  href?: string;
  disabled?: boolean;
  chip?: string;
  chipColor?: ChipColor;
  variant?: ChipVariant;
  external?: boolean;
};

export type MenuitemsType = NavItemCommonType & {
  children?: MenuitemsType[];
};

export type NavGroupItem = MenuitemsType & {
  level?: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type NavItemType = {
  item: NavGroupItem;
  hideMenu?: boolean | string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  level?: number;
  pathDirect: string;
};
