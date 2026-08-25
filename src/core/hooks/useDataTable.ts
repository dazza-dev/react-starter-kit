import { useCallback, useState } from "react";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { SortCriterion, TableParams } from "@/core/types/common.type";

interface UseDataTableOptions {
  perPage?: number;
  sortBy?: SortCriterion[];
}

/**
 * Pagination, sort and search state for a table, already shaped as the backends expect:
 * `page` starts at 1 and sorting travels as `sort_by[0][key]` / `sort_by[0][order]`.
 */
export function useDataTable({ perPage = 10, sortBy = [] }: UseDataTableOptions = {}) {
  const [params, setParams] = useState<TableParams>({ page: 1, perPage, search: "", sortBy });

  const onPaginationModelChange = useCallback((model: GridPaginationModel) => {
    setParams((prev) => ({
      ...prev,
      // Changing the page size resets to the first page; DataGrid counts from 0.
      page: prev.perPage !== model.pageSize ? 1 : model.page + 1,
      perPage: model.pageSize,
    }));
  }, []);

  const onSortModelChange = useCallback((model: GridSortModel) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: model.map((item) => ({ key: item.field, order: item.sort ?? "asc" })),
    }));
  }, []);

  const onSearch = useCallback((search: string) => {
    setParams((prev) => ({ ...prev, page: 1, search }));
  }, []);

  const paginationModel: GridPaginationModel = {
    page: params.page - 1,
    pageSize: params.perPage,
  };

  return { params, paginationModel, onPaginationModelChange, onSortModelChange, onSearch };
}
