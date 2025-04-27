import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from "@mui/material/Link";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Login from "./Login";
import { Link } from 'react-router-dom';
import { useState } from "react";
// import { InputRoundedIcon } from '@mui/icons-material';
import { MenuItem } from "@mui/material";
const theme = createTheme();
const occupations = [
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Professional",
    label: "Professional",
  },
];
export default function Signup() {
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    occupation: ""
  });
  const [error, seterror] = useState("");

  // const handleChange = ({ currentTarget: input }) => {
  //   setdata({ ...data, [input.name]: input.value });
  // };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/Login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        seterror(error.response.data.message);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={data.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={handleChange}
                  label="Last Name"
                  name="lastName"
                  value={data.lastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={data.email}
                  label="Email Address"
                  onChange={handleChange}
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="occupation"
                  select
                  label="Select Occupation"
                  defaultValue=""
                  fullWidth
                  name="occupation" 
                  onChange={handleChange} 
                >
                  {occupations.map((option) => (
                      <MenuItem key={option.value} value={option.value} onChange={handleChange}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
            <br />
            <Grid>{error && <Alert severity="error">{error}</Alert>}</Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="nav-link" to="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
