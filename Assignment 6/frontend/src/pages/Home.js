import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TeachingPicture from "../assets/teaching.svg";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
};

const Home = () => {
  return (
    <Navbar>
      <div className="container-home">
        {/* <h2 style={{ textAlign: "center" }}>Home Page</h2> */}
        <div className="left-half">
          <img className="homeImg" src={TeachingPicture} alt="homeImg" />
        </div>
        <div className="right-half">
          <h1 className="title">Where teaching and Learning come together</h1>
          <p className="text-info-home">
            Cuvette Classroom is your all-in-one place for teaching and
            learning. Our easy-to-use and secure tool helps educators manage,
            measure, and enrich learning experiences.
          </p>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Link style={linkStyle} to="/signup">
              {" "}
              <Button variant="contained">Get Started for free</Button>
            </Link>
            <Link style={linkStyle} to="/signin">
              <Button variant="outlined">Go to Classroom</Button>
            </Link>
          </Stack>
        </div>
      </div>
      <Footer />
    </Navbar>
  );
};

export default Home;
