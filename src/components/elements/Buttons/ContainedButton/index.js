import React from "react";
import { createUseStyles } from "react-jss";
import {
    LinearProgress,
    withStyles,
    CircularProgress,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

const useStyles = createUseStyles({
    button: {
        margin: 1,
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
});
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: "#e51c34",
        "&:hover": {
            backgroundColor: red[900],
        },
        "&:disabled": {
            color: "#D3D3D3",
        },
    },
}))(Button);

const ContainedButton = (props) => {
    const classes = useStyles();
    const {
        size,
        color,
        label,
        icon,
        loading = false,
        disabled = false,
        loadType = "linear",
        onClick = () => { },
    } = props;
    return (
        <div>
            <ColorButton
                variant="contained"
                size={size}
                color={color}
                className={classes.button}
                disabled={disabled}
                startIcon={icon}
                onClick={onClick}
                fullWidth
            >
                {label}
                {loading && loadType !== "linear" && (
                    <CircularProgress
                        size={24}
                        color="secondary"
                        className={classes.buttonProgress}
                    />
                )}
            </ColorButton>
            {loading && loadType === "linear" && <LinearProgress color="secondary" />}
        </div>
    );
};
export default ContainedButton;
