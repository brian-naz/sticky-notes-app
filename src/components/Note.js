import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const ExpandableCard = styled(Card)(({ expanded }) => ({
  width: expanded ? 400 : 250,
  height: expanded ? 300 : 180,
  transition: "all 0.3s ease-in-out",
  overflow: "hidden",
  position: "relative",
}));

const Note = ({ id, text, timestamp, onDelete, onEdit, editingNoteId, expandedProp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(id === editingNoteId);
  const noteRef = useRef(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setExpanded(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setExpanded(expandedProp);
  }, [expandedProp]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
       <Card
        ref={noteRef}
        sx={{
          width: expanded ? 400 : 250,
          transition: 'all 0.3s ease',
          boxShadow: 3,
          marginBottom: 2,
          position: 'relative',
        }}
        onClick={() => setExpanded(true)} 
      >
        
        <CardContent>
          <TextField
            multiline
            fullWidth
            variant="standard"
            value={text}
            onChange={(e) => onEdit(id, e.target.value)}
            InputProps={{ disableUnderline: true }}
          />
          <Typography variant="body2" color="textSecondary" align="right">
            {timestamp ? new Date(timestamp).toLocaleString() : ""}
          </Typography>
        </CardContent>

        <IconButton
          aria-label="options"
          onClick={(e) => {
            e.stopPropagation();
            handleMenuOpen(e);
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onDelete(id);
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
};

export default Note;
