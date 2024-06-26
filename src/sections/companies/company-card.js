import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateDoc, doc, getDocs, query, collection, where } from "firebase/firestore/lite";
import db from "../../backend/firebaseConfig";

export const CompanyCard = (room) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editedRoom, setEditedRoom] = useState(room);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { bed, image, capacity, cost, reservedFrom, reservedTo, services, size, name } = room.room;

  const updateRoom = async (updatedRoomData, roomName) => {
    try {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      let docId;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name === roomName) {
          docId = doc.id;
        }
      });
      if (docId) {
        await updateDoc(doc(db, "rooms", docId), updatedRoomData);
        console.log("Room updated successfully");
      } else {
        console.error("No document found with the specified roomName:", roomName);
      }
    } catch (e) {
      console.error("Failed to update room:", e);
    }
  };

  const handleEditOpen = (room) => {
    setSelectedRoom(room);
    setEditOpen(true);
  };

  const handleEditClose = (room) => {
    setSelectedRoom(null);
    setEditOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === "capacity" || name === "cost" ? parseInt(value) : value;

    setEditedRoom((prev) => ({
      ...prev,
      room: {
        ...prev.room,
        [name]: parsedValue,
      },
    }));
  };

  const handleSaveChanges = () => {
    // Perform the query to update the room data in the database using editedRoom
    console.log("Saving changes:", editedRoom);

    //Update Firestore
    updateRoom(editedRoom, selectedRoom.room.name);
    // Reset the modal state
    setEditOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <img src={image} variant="square" style={{ width: "100%" }} />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography align="center" variant="body1">
          {services}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Cost: {cost}€
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          {/* <Button variant="outlined" onClick={() => handleEditOpen(room)}>
            Edit Room
          </Button> */}
        </Stack>
      </Stack>
      <Modal open={editOpen} onClose={handleEditClose} aria-labelledby="add-room-modal-title">
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
          <Typography id="edit-room-modal-title" variant="h5" component="h2" gutterBottom>
            Edit Room
          </Typography>
          <form>
            {/* <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} /> */}
            <TextField fullWidth label="Bed" name="bed" margin="normal" onChange={handleChange} />
            <TextField
              fullWidth
              label="Capacity"
              name="capacity"
              margin="normal"
              onChange={handleChange}
            />
            <TextField fullWidth label="Cost" name="cost" margin="normal" onChange={handleChange} />
            <TextField
              fullWidth
              label="Services"
              name="services"
              margin="normal"
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleEditClose}>
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </Card>
  );
};
