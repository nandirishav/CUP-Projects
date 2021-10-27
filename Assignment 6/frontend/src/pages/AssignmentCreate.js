import React from "react";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography,
  Box,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { useHistory } from "react-router";

const toolbarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const toolItemStyle = {
  cursor: "pointer",
  fontSize: "1.15rem",
  color: "black",
  marginLeft: "2rem",
};

const btnstyle = {
  margin: "2rem 0.1rem",
  borderRadius: "25px",
  padding: "10px",
  backgroundColor: "#202124",
};
const addAsStyle = {
  margin: "4% 10%",
  display: "block",
  marginRight: "15%",
};
const iconStyle = {
  height: "1.0rem",
  marginRight: "1rem",
  paddingTop: "0.28rem",
  fontSize: "1.5rem",
};

const labelStyle = {
  marginBottom: "0.5rem",
  letterSpacing: ".01428571em",
  fontFamily: "Roboto,Arial,sans-serif",
  fontSize: "0.875rem",
  fontWeight: "500",
  lineHeight: "1.25rem",
  color: "#5f6368",
};

const drawerWidth = 240;

const AssignmentCreate = () => {
  const [points, setPoints] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const history = useHistory();

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleAssign = () => {
    var data = {
      name: title,
      description: desc,
      points: points,
      date: value,
    };
    var config = {
      method: "post",
      url: "http://localhost:8001/api/v1/assignments/addAssignment",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    axios(config)
      .then(function (response) {
        console.log("Response : ", response);
        if (response.status === 200) {
          console.log("assignment addition successful");
          history.push({
            pathname: "/addAssignment",
            state: { assignmentData: response.data },
          });
        }
      })
      .catch(function (error) {
        console.log("Error in assignment addition block", error);
      });
  };
  return (
    <div>
      <AppBar
        style={{ backgroundColor: "white" }}
        position="fixed"
        sx={{ width: "100%" }}
      >
        <Toolbar style={toolbarStyle}>
          <Typography
            style={toolItemStyle}
            mr="2rem"
            variant="h6"
            noWrap
            component="div"
          >
            Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={addAsStyle} className="container">
        <div className="textFields">
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            autoComplete="off"
            fullWidth
            onChange={handleTitleChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="filled-multiline-static"
            label="Instructions"
            multiline
            rows={4}
            variant="filled"
            fullWidth
            onChange={handleDescChange}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleAssign}
        >
          <span style={{ padding: "0 1.5rem" }}>Assign</span>
        </Button>
      </div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, mt: 3 }}>
          {/* <label style={labelStyle}>Points</label> */}
          <InputLabel id="demo-simple-select-standard-label">Points</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={points}
            onChange={handlePointsChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>100</MenuItem>
            <MenuItem value={20}>UnMarked</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <label style={labelStyle}>Due Date</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Drawer>
    </div>
  );
};

export default AssignmentCreate;
