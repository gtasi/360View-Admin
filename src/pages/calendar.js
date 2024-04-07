import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import db from "../backend/firebaseConfig";

const localizer = momentLocalizer(moment);

//Mock Data
const myEventsList = [
  {
    title: "Maria Test - Room 1",
    start: new Date(2024, 1, 1, 10, 0, 0), // February 1st, 2023, 10:00 AM
    end: new Date(2024, 1, 1, 11, 30, 0), // February 1st, 2023, 11:30 AM
  },
  {
    title: "George Tasioulis - Room 2",
    start: new Date(2024, 1, 5, 12, 0, 0), // February 5th, 2023, 12:00 PM
    end: new Date(2024, 1, 8, 13, 0, 0), // February 5th, 2023, 1:00 PM
  },
];

const Page = () => {
  const [books, setBooks] = useState([]);

  const colors = ["#ff8000", "#008000", "#00ffff"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryCustomers = await getDocs(collection(db, "customers"));
        const totalBooks = queryCustomers.docs.flatMap((doc, index) => {
          const bookData = doc.data();
          const color = colors[index % colors.length];
          const eventList = bookData.bookedRooms.map((room) => ({
            title: `${bookData.firstName} ${bookData.lastName} - ${room}`,
            start: bookData.bookStart.toDate(), // Convert Firestore timestamp to JavaScript Date object
            end: bookData.bookEnd.toDate(), // Convert Firestore timestamp to JavaScript Date object
            color: color,
          }));
          return eventList; // Return the eventList directly
        });

        setBooks(totalBooks); // Update the books state with the array of event objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Books state:", books);
  }, [books]);
  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Calendar
                localizer={localizer}
                events={books}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 900 }}
                showMultiDayTimes
                eventPropGetter={(event, start, end, isSelected) => ({
                  style: {
                    backgroundColor: event.color,
                  },
                })}
              />
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
