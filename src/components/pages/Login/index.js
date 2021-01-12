import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
    card: {
        overflow: "visible !important",
        borderRadius: "1rem",
    },
    cardContent: {
        backgroundColor: "#282a2d",
        color: "#FFFFFF",
        padding: "4rem"
    },
    loginForm: {
        padding: "3rem"
    }
}));

const Login = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.loginForm}>
                                <span>Hey its me Bajoy</span>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Login;