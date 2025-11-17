import { Box, Typography } from "@mui/material";
import UserTable from "@/modules/users/components/UserTable";
import UserFormDialog from "@/modules/users/components/UserFormDialog";
import ConfirmDeleteDialog from "@/modules/users/components/ConfirmDeleteDialog";

export default function UsersPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <UserTable />
      <UserFormDialog />
      <ConfirmDeleteDialog />
    </Box>
  );
}
