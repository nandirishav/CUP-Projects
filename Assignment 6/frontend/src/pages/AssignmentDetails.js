import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Input } from "@mui/material";
import AssignmentNav from "../components/AssignmentNav";
import axios from "axios";

const AssignmentDetails = (props) => {
  // const { state } = this.props.location;

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleCapture = ({ target }) => {
    console.log(target);
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:8001/api/v1/assignments/uploadFile",
      data: selectedFile,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cardStyle = {
    borderRadius: "0.5rem",
    border: "1px solid gray",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
  };

  const btnstyle = {
    margin: "8px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // console.log(props);
  return (
    <AssignmentNav>
      <>
        <div className="container">
          <div className="left">
            <h1 className="as-title">Assignment 1</h1>
            <p className="as-time-up">
              Teacher 1 <span className={"dropdown-item-dot"}>• </span> 23 Aug
              2020 (Edited 23 Aug 2020)
            </p>
            <h5 className="as-points">100 points</h5>
            <br />
            <div className="as-info">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
                velit vero reprehenderit eveniet eius minus numquam tenetur est
                ducimus reiciendis.
              </p>
              <p className="as-desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                veniam doloribus molestiae quibusdam est dolor.
              </p>
            </div>
          </div>
          <div className="right">
            <Card style={cardStyle} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Your Work
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Input
                  name="myFile"
                  // accept="doc/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleCapture}
                />
              </CardActions>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                onClick={handleSubmit}
              >
                Submit Work
              </Button>
            </Card>
          </div>
        </div>
      </>
    </AssignmentNav>
  );
};

export default AssignmentDetails;
