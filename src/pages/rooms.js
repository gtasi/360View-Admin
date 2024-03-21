import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../backend/firebaseConfig";
import { useEffect, useState } from "react";

const Page = () => {
  const [rooms, setRooms] = useState([]);
  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const totalRooms = [];

    querySnapshot.forEach((doc) => {
      totalRooms.push({ totalRooms, ...doc.data() });
      setRooms(totalRooms);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Rooms: ", rooms);
  });
  const handleAddOpen = () => {
    setAddRoomOpen(true);
  };

  const handleAddClose = () => {
    setAddRoomOpen(false);
  };

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
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Rooms</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAddOpen}
                >
                  Add Room
                </Button>
              </div>
            </Stack>
            {rooms === null ? (
              <div>Loading...</div>
            ) : (
              <>
                {/* Your main content here */}
                <Grid container spacing={3}>
                  {rooms.map((room) => (
                    <Grid xs={12} md={6} lg={4} key={room.id}>
                      <CompanyCard key={room.id} room={room} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Modal open={addRoomOpen} onClose={handleAddOpen} aria-labelledby="add-room-modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-room-modal-title" variant="h5" component="h2" gutterBottom>
            Add Room
          </Typography>
          {/* Add your form or content for adding a room here */}
          {/* For example: */}
          {/* <YourAddRoomFormComponent /> */}
          <Button variant="outlined" onClick={handleAddClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
