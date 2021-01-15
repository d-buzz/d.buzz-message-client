import React, { useState, useEffect } from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { AlertTitle, Alert } from "@material-ui/lab";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        wordBreak: "break-word",
    },
    alertWrapper: {
        ...theme.message.color,
    },
}));

const NotificationBox = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const { notificationBoxData } = props;

    let snackBarStyle = { maxWidth: 300 };
    let anchorOrigin = { vertical: "top", horizontal: "right" };

    useEffect(() => {
        if (
            notificationBoxData.hasOwnProperty("open") &&
            typeof notificationBoxData === "object"
        ) {
            const { open } = notificationBoxData;
            if (open) {
                const { message, severity } = notificationBoxData;
                setMessage(message);
                setSeverity(severity);
            } else {
                setMessage("");
                setSeverity("");
            }
            setOpen(open);
        }
    }, [notificationBoxData]);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={anchorOrigin}
                style={snackBarStyle}
                open={open}
                autoHideDuration={3000}
                onClose={onClose}
                className={classes.wrapper}
            >
                <Alert
                    variant="outlined"
                    onClose={onClose}
                    severity={severity}
                    classes={{ root: classes.alertWrapper }}
                >
                    <AlertTitle>
                        {`${severity.charAt(0).toUpperCase()}${severity.slice(1)}`}
                    </AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    notificationBoxData: state.interfaces.get("notificationBoxData"),
});

export default connect(mapStateToProps)(NotificationBox);
