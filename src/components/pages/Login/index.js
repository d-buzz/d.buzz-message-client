import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  CssBaseline,
  Paper,
  Grid,
  Box,
  Typography,
  Link
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../../images/dbuzz_logo.png";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import { TextFieldWithIcon, ContainedButton } from "../../elements";
import { authenticateUserRequest } from "../../../store/auth/actions"
import { broadcastNotification } from "../../../store/interfaces/actions"

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© 2021 "}
      <Link color="inherit" href="#">
        Dataloft, LLC
      </Link>{"."}
    </Typography>
  );
}
const SignUp = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Don't have an account? "}
      <Link href="https://hiveonboard.com/create-account?ref=dbuzz&redirect_url=https://d.buzz/login"
        variant="body2" target="_blank">
        {"Signup now"}
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    borderRadius: ".25rem",
    padding: "2rem",
    maxWidth: "500px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo: {
    height: "40px",
    marginBottom: "-7px",
    alignItems: "center",
  },
  logoWrapper: {
    paddingBottom: "1rem",
  },
  hivePMfont: {
    fontSize: "32px",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const { authenticateUserRequest, broadcastNotification } = props
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isUsernameTouched, setIsIUsernameTouched] = useState(false)
  const [isPasswordTouched, setIsIPasswordTouched] = useState(false)

  const onChangeInput = (e) => {
    const { target } = e;
    const { id, value } = target;

    if (id === "username") {
      setUsername(value)
      if (!value) {
        setIsIUsernameTouched(true)
      }
    } else if (id === "postingKey") {
      setPassword(value)
      if (!value) {
        setIsIPasswordTouched(true)
      }
    }
  }

  const handLogin = () => {
    if (username && password) {
      setLoading(true);
      authenticateUserRequest(username, password).then(
        ({ is_authenticated }) => {
          setLoading(false);
          console.log(is_authenticated)
          if (!is_authenticated) {
            broadcastNotification(
              "error",
              "Authentication failed, please check your credentials."
            );
          } else {
            handleClearInput();
            broadcastNotification("success", "Authenticated successfully.");
          }
        }
      );
    } else {
      setIsIUsernameTouched(true)
      setIsIPasswordTouched(true)
    }
  }

  const handleClearInput = () => {
    setUsername("")
    setPassword("")
    setIsIUsernameTouched(false)
    setIsIPasswordTouched(false)
  }

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
        <Grid item align="center">
          <div className={classes.logoWrapper}>
            <img src={logo} className={classes.logo} alt="hivepm logo" />
          </div>
          <Typography variant="h5">
            Sign in
          </Typography>
          <Typography variant="subtitle2">
            Sign in to continue to HivePM
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextFieldWithIcon
                id="username"
                label="Username"
                placeholder="Enter your username"
                value={username}
                icon={<AccountCircle />}
                onChange={onChangeInput}
                required
                fullWidth
                autoFocus
                error={isUsernameTouched && !username}
                helperText={isUsernameTouched && !username ? "Username is required" : ""}
              />
              <TextFieldWithIcon
                id="postingKey"
                label="Posting Key"
                placeholder="Enter your posting key"
                value={password}
                icon={<VpnKey />}
                onChange={onChangeInput}
                type="password"
                required
                fullWidth
                error={isPasswordTouched && !password}
                helperText={isPasswordTouched && !password ? "Posting key is required" : ""}
              />
              <ContainedButton
                type="button"
                color="secondary"
                label="Sign In"
                onClick={handLogin}
                className={classes.submitBtn}
                fullWidth
                disabled={loading}
                loading={loading}
                loadType="circular"
              />
            </form>
          </Paper>
          <Box mt={6}>
            <SignUp />
          </Box>
        </Grid>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Grid>
    </div >
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      authenticateUserRequest,
      broadcastNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

