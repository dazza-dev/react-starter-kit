import type { EntityStatus, TableParams } from "@/core/types/common.type";

export interface UserRole {
  uuid: string;
  name: string;
  slug: string;
}

export interface User {
  uuid: string;
  firstName: string;
  lastName: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  username: string;
  avatar: string | null;
  status: EntityStatus;
  roles: UserRole[];
  lastLoginAt: string | null;
  createdAt: string;
  deletedAt?: string | null;
}

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  // Empty when editing means "don't change the password".
  password: string;
  status: EntityStatus;
  roleUuids: string[];
}

export interface UserFilters {
  status?: EntityStatus | "";
  roles?: string[];
}

export type UserTableParams = TableParams & { filters?: UserFilters };
