import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditRoomModal = ({ open, onClose, room }) => {
  const [editedRoom, setEditedRoom] = useState(room);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here, e.g., update room data in the database
    console.log("Edited Room:", editedRoom);
    onClose();
  };

  return (
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Bed"
          name="bed"
          value={editedRoom.bed}
          onChange={handleChange}
          margin="normal"
        />
        {/* Add more TextField components for other fields */}
        <Button variant="contained" type="submit">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

EditRoomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  room: PropTypes.shape({
    bed: PropTypes.string,
    image: PropTypes.string,
    capacity: PropTypes.number,
    cost: PropTypes.number,
    reservedFrom: PropTypes.string,
    reservedTo: PropTypes.string,
    services: PropTypes.string,
    size: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default EditRoomModal;
