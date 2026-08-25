/**
 * Types shared by all modules.
 */

/** Generic select option: the API returns uuid + name. */
export interface NamedOption {
  uuid: string;
  name: string;
}

/** Wrapper for a response with a single item. */
export interface DataResponse<T> {
  data: T;
  message?: string;
}

/** Laravel-style paginated wrapper. */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
  };
}

/** Sort criterion as expected by the backend in `sort_by`. */
export interface SortCriterion {
  key: string;
  order: "asc" | "desc";
}

/** Parameters the table sends to the backend on each load. */
export interface TableParams {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: SortCriterion[];
}

export type EntityStatus = "active" | "inactive";
