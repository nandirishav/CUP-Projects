import React from "react";
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

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "3rem auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
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
          >
            Sign Up
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Already have an account ?<Link href="signin">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default SignUp;
