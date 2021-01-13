import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { InputWithIcon } from "../../../components/elements"

const useStyles = createUseStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        alignItems: "center",
        margin: "auto",
        borderRadius: ".25rem",
        display: "flex",
        flexDirection: "column",
        padding: "3rem",
        maxWidth: "500px"
    },
    formControl: {
        width: "350px",
    },
    inputDiv: {
        padding: ".5rem",
    }
}));

const Login = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item>
                                    <form className={classes.loginForm}>
                                        <div className={classes.inputDiv}>
                                            <InputWithIcon
                                                className={classes.formControl}
                                                label="Username"
                                                icon={<AccountCircle />} />
                                        </div>
                                        <div className={classes.inputDiv}>
                                            <InputWithIcon
                                                className={classes.formControl}
                                                label="Posting Key"
                                                icon={<VpnKeyIcon />} />
                                        </div>
                                    </form>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default Login;