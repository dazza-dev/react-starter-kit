import type { TableParams } from "@/core/types/common.type";

export interface Group {
  uuid: string;
  name: string;
  deletedAt?: string | null;
}

export interface GroupForm {
  name: string;
}

export type GroupTableParams = TableParams;
