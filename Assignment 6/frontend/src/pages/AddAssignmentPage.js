import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

const toolbarStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
};

const toolItemStyle = {
  cursor: "pointer",
  fontSize: "1.15rem",
};

const btnstyle = {
  margin: "8px 0",
  borderRadius: "25px",
  padding: "10px 16px",
  backgroundColor: "#202124",
};
const addAsStyle = {
  margin: "4% 20%",
  display: "block",
};
const iconStyle = {
  height: "1.0rem",
  marginRight: "1rem",
  paddingTop: "0.28rem",
  fontSize: "1.5rem",
};

const AddAssignmentPage = () => {
  const history = useHistory();
  const handleCreate = () => {
    history.push("/assignmentCreate");
  };
  return (
    <div>
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar style={toolbarStyle}>
          <Typography
            style={toolItemStyle}
            mr="2rem"
            variant="h6"
            noWrap
            component="div"
          >
            ClassWork
          </Typography>
          <Typography
            style={toolItemStyle}
            mr="2rem"
            variant="h6"
            noWrap
            component="div"
          >
            People
          </Typography>
          <Typography
            style={toolItemStyle}
            mr="2rem"
            variant="h6"
            noWrap
            component="div"
          >
            Marks
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={addAsStyle} className="container">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleCreate}
        >
          <i className="fas fa-plus"></i>
          <span style={{ padding: "0 12px" }}>Create</span>
        </Button>
        <div className="assignCard">
          <div className="as-details">
            <div className="assign-title">Assign work to your class here</div>
            <div className="points">
              <i style={iconStyle} className="fas fa-clipboard-list"></i>
              <span className="assign-desc">
                Create Assignments and questions{" "}
              </span>{" "}
            </div>
            <div className="points">
              <i style={iconStyle} className="fas fa-tasks"></i>
              <span className="assign-desc">
                Use topics to organise classwork into modules or units{" "}
              </span>
            </div>
            <div className="points">
              <i style={iconStyle} className="fas fa-sort"></i>
              <span className="assign-desc">
                {" "}
                Order work the way you want students to see it
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignmentPage;
