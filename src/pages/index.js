import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import db from "../backend/firebaseConfig";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

const now = new Date();

const Page = () => {
  const [customers, setCustomers] = useState([]);

  const fetchDataCustomers = async () => {
    const queryCustomers = await getDocs(collection(db, "customers"));
    const totalCustomers = [];

    queryCustomers.forEach((doc) => {
      totalCustomers.push({ totalCustomers, ...doc.data() });

      setCustomers(totalCustomers);
    });
    console.log(totalCustomers);
  };

  const fetchDataSales = async () => {
    const queryCustomers = await getDocs(collection(db, "customers"));
    const totalCustomers = [];

    queryCustomers.forEach((doc) => {
      totalCustomers.push({ totalCustomers, ...doc.data() });

      setCustomers(totalCustomers);
    });
    console.log(totalCustomers);
  };

  const totalProfit = () => {
    let total = 0;
    customers.forEach((customer) => {
      total += customer.totalPay;
    });
    return total;
  };

  useEffect(() => {
    fetchDataCustomers();
  }, []);

  return (
    <>
      <Head>
        <title>360 View | Administration </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            <Grid xs={12} sm={6} lg={5}>
              <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="500€" />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalCustomers
                totalCustomers={customers.length}
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={totalProfit() + "€"} />
            </Grid>
            {/* TODO: fix chart dynamically */}
            <Grid xs={12} lg={5}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={7}>
              <OverviewLatestOrders orders={customers} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
