import DashboardCard from "@/modules/dashboard/components/DashboardCard";
import { Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Box sx={{ py: 4 }}>
        <DashboardCard title="Dashboard">
          <Typography>Dashboard</Typography>
        </DashboardCard>
      </Box>
    </>
  );
}
