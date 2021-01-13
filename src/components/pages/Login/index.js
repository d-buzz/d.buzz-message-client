import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

import logo from "../../../images/dbuzz_logo.png";
import { Input, InputAdornment } from "@material-ui/core";
import AccountCircle  from '@material-ui/icons/AccountCircle';
import VpnKey  from '@material-ui/icons/VpnKey';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        DataLoft LLC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  //   paper: {
  //     marginTop: theme.spacing(8),
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //   },
  paper: {
    alignItems: "center",
    margin: "auto",
    borderRadius: ".25rem",
    display: "flex",
    flexDirection: "column",
    padding: "3rem",
    maxWidth: "500px",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#e51c34",
    color:"white",
  },
  logo: {
    height: "50px",
    marginBottom: "-14px",
    alignItems: "center",

  },
  logoWrapper:{
      position: "absolute",
     
  },
  hivePMfont:{
      fontSize:"32px",
  }
}));

export default function LogIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <div class>
              <img src={logo} className={classes.logo} /> 
              <label className={classes.hivePMfont}>Hive PM</label>
            </div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
    
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label = "Username"
                placeholder="Please enter your Username"
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{
                    startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>,
                  }}
               
                
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="posting"
                label="Posting Key"
                placeholder="Please enter your Posting Key"
                type="posting"
                id="posting"
                autoComplete="current-posting"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><VpnKey/></InputAdornment>,
                  }}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color ="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
