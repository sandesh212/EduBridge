import * as React from "react";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from '@mui/material/Alert'
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./signup";
import { Link, useNavigate } from "react-router-dom";
// import { Dashboard } from "@mui/icons-material";
import { useState,useContext,useEffect } from "react";
import Dashboard from "./Dashboard";
import UserContext from "./context/User/UserContext";
const theme = createTheme();

export default function Login({onLogin,occupation}) {

  const context = useContext(UserContext);
  const {getUser} = context;

  useEffect(() => {
    getUser();
  }, )
  

  let navigate = useNavigate();
  
  const [data, setdata] = useState({
    email : "",
    password : "",
  })
  const [error, seterror] = useState("")
  const handleChange = ({currentTarget :input})=>{
    setdata({...data,[input.name]:input.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const {data : res} = await axios.post(url,data);
      //Redirect user to Different Screen 
      const occupation = res.occupation;
      if(occupation ===  "Professional"){
        navigate("/SupervisorDashboard");
      }else{
        navigate('/Dashboard')
      }
      //Save token  particular user in Local Storage 
      localStorage.setItem('token',res.Token);
      localStorage.setItem('occupation',occupation)
      onLogin();

    } catch (error) {
      if(
        error.response && 
        error.response.status >= 400 &&
        error.response.status <= 500
        ){
           seterror(error.response.data.message)
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
          <Avatar sx={{ m: 1, bgcolor: "#47a4f2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              required
              label="Email Address"
              onChange={handleChange}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              onChange={handleChange}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br />
            <Grid>
            {error && <Alert severity="error">{error}</Alert>}
            </Grid>      
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            {/* </Link> */}
            <Grid container>
              <Grid item xs={10}>
                <Link className="nav-link" to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
