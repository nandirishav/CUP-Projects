import React from "react";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Toolbar,
} from "@mui/material";
// assets
import StudentImg from "../assets/students.svg";
import TeacherImg from "../assets/teacher.svg";

const cardsContainer = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  margin: "2rem 0",
};

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Appbar />
      <Box
        component="main"
        sx={{
          width: "70%",
          margin: "0 25%",
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <div style={cardsContainer} className="cards">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="190"
                image={StudentImg}
                alt="student"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Student
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add assignments , view all the Students and their performances
                  and much more
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                View More
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="190"
                position="contain"
                image={TeacherImg}
                alt="teacher"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Teacher
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assign assignments to Teaching Assitants , view all the
                  Teachers and their performances and much more
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                View More
              </Button>
            </CardActions>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
