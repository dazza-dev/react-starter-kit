import type { TableParams } from "@/core/types/common.type";

export interface Role {
  uuid: string;
  name: string;
  displayName: string;
  description: string | null;
  deletedAt?: string | null;
}

export interface RoleForm {
  displayName: string;
  description: string;
}

/** A single permission: each cell in the matrix. Selection is done by uuid. */
export interface Permission {
  uuid: string;
  name: string;
  label: string;
}

/** A permission group: each row in the matrix. */
export interface PermissionGroup {
  group: string;
  label: string;
  permissions: Permission[];
}

/** A module with its groups: each tab. `module` is null if it doesn't belong to one. */
export interface PermissionModule {
  module: string | null;
  label: string;
  icon: string | null;
  groups: PermissionGroup[];
}

export interface RolePermissionsResponse {
  data: PermissionModule[];
  // UUIDs of the permissions the role already has.
  assigned: string[];
}

export type RoleTableParams = TableParams;
