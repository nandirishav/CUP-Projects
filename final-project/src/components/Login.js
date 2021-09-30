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

const Login = () => {
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
            <h2>Log In</h2>
          </Grid>
          <TextField
            className="classes.textfield"
            label="Username"
            placeholder="Enter username"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            className="classes.textfield"
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
