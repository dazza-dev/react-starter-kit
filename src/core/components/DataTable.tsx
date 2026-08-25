import { DataGrid } from "@mui/x-data-grid";
import type { DataGridProps } from "@mui/x-data-grid";
import { enUS, esES, ptBR } from "@mui/x-data-grid/locales";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const GRID_LOCALES = { es: esES, en: enUS, pt: ptBR };

/** Page size selector label, by language. */
const ROWS_PER_PAGE_LABEL: Record<string, string> = {
  es: "Elementos por página:",
  en: "Items per page:",
  pt: "Itens por página:",
};

export default function DataTable({ sx, ...props }: DataGridProps) {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const gridLocale = GRID_LOCALES[lang as keyof typeof GRID_LOCALES] ?? esES;

  return (
    <DataGrid
      // The table grows with its rows instead of scrolling within a fixed height.
      autoHeight
      disableRowSelectionOnClick
      disableColumnResize
      disableColumnMenu
      sortingMode="server"
      pageSizeOptions={[10, 25, 50, 100]}
      localeText={{
        ...gridLocale.components.MuiDataGrid.defaultProps.localeText,
        paginationRowsPerPage: ROWS_PER_PAGE_LABEL[lang] ?? ROWS_PER_PAGE_LABEL.es,
      }}
      slotProps={{
        basePagination: { material: { showFirstButton: true, showLastButton: true } },
      }}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "7px",
        backgroundColor: "transparent",
        "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
          backgroundColor: "transparent",
          borderRight: "none",
        },
        // The header is separated from the body by its own rule.
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#000",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
          borderRight: "none",
          color: theme.palette.text.primary,
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
        },
        // The last row has no rule: it's separated by the footer's top border.
        "& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
          {
            outline: "none",
          },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "transparent",
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: "15px 8px",
        },
        // The page size selector is boxed.
        "& .MuiTablePagination-input": {
          border: `1px solid ${theme.palette.inputBorder}`,
          borderRadius: "7px",
          minHeight: 40,
          padding: "0 4px 0 12px",
          marginRight: 3,
          fontSize: "1rem",
        },
        "& .MuiTablePagination-select": {
          paddingRight: "24px !important",
        },
        "& .MuiTablePagination-selectIcon": {
          right: 4,
        },
        ...sx,
      }}
      {...props}
    />
  );
}
