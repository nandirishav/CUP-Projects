import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "3rem auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    var data = {
      email: email,
      password: password,
    };
    // console.log(data);
    var config = {
      method: "post",
      url: "http://localhost:8001/api/v1/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    axios(config)
      .then(function (response) {
        console.log("Response : ", response);
        if (response.status === 200) {
          console.log("login successful");
          history.push({
            pathname: "/viewAssignments",
            state: { userData: response.data },
          });
        }
      })
      .catch(function (error) {
        console.log("Error while redirecting", error);
      });
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <TextField
            className="classes.textfield"
            label="Email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            className="classes.textfield"
            label="Password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do not have an account ?<Link href="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
