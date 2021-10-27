import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const drawerWidth = 240;

const Appbar = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
