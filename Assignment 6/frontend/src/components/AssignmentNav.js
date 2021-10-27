import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const AssignmentNav = (props) => {
  console.log(props.data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const handleLogout = () => {
    var config = {
      method: "post",
      url: "http://localhost:8001/api/v1/user/logout",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(props.data),
    };
    axios(config)
      .then(function (response) {
        console.log("Response : ", response);
        if (response.status === 200) {
          console.log("logout successful");
          history.push({
            pathname: "/",
            // state: { userData: response.data },
          });
          props.history.replace();
        }
      })
      .catch(function (error) {
        console.log("Error while redirecting", error);
      });
  };
  return (
    <>
      <header className="navbar-container">
        <div className="wrapper">
          <Link to="/" className="navbar__title navbar__item">
            <h3>Assignments</h3>
          </Link>
        </div>
        <div className="assignment-status">
          <a className="as-items" href="#">
            Assigned
          </a>
          <a className="as-items" href="#">
            Missing{" "}
          </a>
          <a className="as-items" href="#">
            Done
          </a>
        </div>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ mr: 3 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                className="userImg"
                src="https://lh3.googleusercontent.com/ogw/ADea4I6FT5x-OlqDBk8bV3NwHW1yDn3O_RshbAAhxK9adQ=s32-c-mo"
                alt="userImg"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
        {/* <div className="userProfile">
          <a href="#">
            <img
              className="userImg"
              src="https://lh3.googleusercontent.com/ogw/ADea4I6FT5x-OlqDBk8bV3NwHW1yDn3O_RshbAAhxK9adQ=s32-c-mo"
              alt="userImg"
            />
          </a>
        </div> */}
      </header>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div>{props.children}</div>
    </>
  );
};

export default AssignmentNav;
