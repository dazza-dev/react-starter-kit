import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import type { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

export default function UserTable() {
  const { data: users, isLoading } = useUsers();
  const { setSelectedUser, toggleForm, toggleDeleteConfirm } = useUserStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "avatar", headerName: "Avatar", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "username", headerName: "Nombre de Usuario", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={() => {
            setSelectedUser(params.row);
            toggleForm(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => {
            setSelectedUser(params.row);
            toggleDeleteConfirm(true);
          }}
          showInMenu={false}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            toggleForm(true);
          }}
        >
          Nuevo Usuario
        </Button>
      </Box>
      <DataGrid
        rows={users || []}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
