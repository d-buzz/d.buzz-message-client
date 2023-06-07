import React, { Fragment, useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  CssBaseline,
  Paper,
  Grid,
  Box,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../../images/logo.png";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import { TextFieldWithIcon, ContainedButton } from "../../elements";
import { Copyright, HiveKeychainInstall } from "../../../components";
import { authenticateUserRequest, setFromLogin } from "../../../store/auth/actions"
import { broadcastNotification } from "../../../store/interfaces/actions"
import { hasCompatibleKeychain } from "./../../../services/helper"
import { isMobile } from 'react-device-detect'

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
    maxWidth: "450px",
    backgroundColor: theme.palette.background.paper
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logo: {
    height: "50px",
    marginBottom: "-7px",
    alignItems: "center",
  },
  logoWrapper: {
    paddingBottom: "1rem",
  },
  hivePMfont: {
    fontSize: "32px",
  },
  signupLink: {
    color: theme.palette.secondary.main
  },
  signinPaper: {
    paddingLeft: "1rem",
    paddingRight: "1rem"
  },
  isHiveKeychain: {
    "& .MuiFormControlLabel-label": {
      fontSize: "13px"
    }
  },
  browserExtension: {
    borderColor: 'red !important',
    '&:hover': {
      color: '#e61b33 !important',
      backgroundColor: 'pink !important',
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const {
    authenticateUserRequest,
    broadcastNotification,
    setFromLogin
  } = props

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isUsernameTouched, setIsIUsernameTouched] = useState(false)
  const [isPasswordTouched, setIsIPasswordTouched] = useState(false)
  const [useHiveKeychain] = useState(true)
  const [hasKeyChain, setHasKeyChain] = useState(false)

  useEffect(() => {
    const isCompatible = hasCompatibleKeychain() ? true : false
    setHasKeyChain(isCompatible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FormSpacer = () => {
    return (
      <div style={{ height: 15, width: '100%' }}></div>
    )
  }


  const onChangeInput = (e) => {
    const { target } = e;
    const { id, value } = target;

    if (id === "username") {
      setUsername(value)
      if (!value) {
        setIsIUsernameTouched(true)
      }
    } else if (id === "password") {
      setPassword(value)
      if (!value) {
        setIsIPasswordTouched(true)
      }
    }
  }

  const handLogin = () => {
    let valid = false
    if (!useHiveKeychain) {
      if (username && password) {
        valid = true;
      } else {
        setIsIUsernameTouched(true)
        setIsIPasswordTouched(true)
      }
    } else {
      if (username) {
        valid = true;
      } else {
        setIsIUsernameTouched(true)
      }
    }

    if (valid) {
      setLoading(true);
      authenticateUserRequest(username, password, useHiveKeychain).then(
        ({ is_authenticated }) => {
          setLoading(false);
          if (!is_authenticated) {
            broadcastNotification(
              "error",
              "Authentication failed, please check your credentials."
            );
          } else {
            handleClearInput();
            setFromLogin(true)
          }
        }
      );
    }

  }

  const handleClearInput = () => {
    setUsername("")
    setPassword("")
    setIsIUsernameTouched(false)
    setIsIPasswordTouched(false)
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      e.preventDefault()
      handLogin();
    }
  }

//   const handleClickCheckbox = (e) => {
//     const { target } = e
//     const { name, checked } = target
//     if (name === 'keychain') {
//       if (checked) {
//         const isCompatible = hasCompatibleKeychain() ? true : false
//         setHasKeyChain(isCompatible)
//         setPassword('')
//       }
//       setUseHiveKeychain(checked)
//     }
//   }

  const isDisabled = () => {
    return (loading || (useHiveKeychain && !hasKeyChain))
  }

  return (
    <React.Fragment>
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
            <Typography variant="subtitle1">
              Sign in to continue to HivePM
          </Typography>
          </Grid>
          <Grid item xs={12} className={classes.signinPaper}>
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
                  onKeyPress={handleKeypress}
                  error={isUsernameTouched && !username}
                  helperText={isUsernameTouched && !username ? "Username is required" : ""}
                />
                {!useHiveKeychain &&
                  <TextFieldWithIcon
                    id="password"
                    label="Master Password"
                    placeholder="Enter your master password"
                    value={password}
                    icon={<VpnKey />}
                    onChange={onChangeInput}
                    type="password"
                    required
                    fullWidth
                    onKeyPress={handleKeypress}
                    error={isPasswordTouched && !password}
                    helperText={isPasswordTouched && !password ? "Master password is required" : ""}
                  />}
                {!isMobile &&
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={useHiveKeychain}
                        name="keychain"
                      />}
                    label="Login with Hive Keychain"
                    className={classes.isHiveKeychain}
                  />
                }
                {useHiveKeychain && !hasKeyChain && !isMobile &&
                  <Fragment>
                    <FormSpacer />
                    <HiveKeychainInstall />
                    <FormSpacer />
                    <FormSpacer />
                  </Fragment>
                }
                <ContainedButton
                  type="button"
                  color="secondary"
                  label="Sign In"
                  onClick={handLogin}
                  className={classes.submitBtn}
                  fullWidth
                  disabled={isDisabled()}
                  loading={loading}
                  loadType="circular"
                />
              </form>
            </Paper>
            <Box mt={6}>
              <Typography variant="body2" align="center">
                {"Don't have an account? "}
                <Link href="https://hiveonboard.com/create-account?ref=dbuzz&redirect_url=https://d.buzz/login"
                  variant="body2" target="_blank" className={classes.signupLink}>
                  {"Signup now"}
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Box mt={1}>
            <Copyright />
          </Box>
        </Grid>
      </div >
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      authenticateUserRequest,
      broadcastNotification,
      setFromLogin
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

