"use client";
import PageContainer from "@/components/container/PageContainer";
import { Box, Grid } from "@mui/material";
// components
import InsumosAbaixoMinimo from "@/components/dashboard/InsumosAbaixoMinimo";
import MonthlyEarnings from "@/components/dashboard/MonthlyEarnings";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SalesOverview from "@/components/dashboard/SalesOverview";
import YearlyBreakup from "@/components/dashboard/YearlyBreakup";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <InsumosAbaixoMinimo />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
