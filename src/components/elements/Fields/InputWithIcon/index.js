import React from "react";
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment
} from "@material-ui/core";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
    label: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    }
}));

const InputWithIcon = (props) => {
    const {
        label,
        className,
        icon,
        defaultValue
    } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <FormControl className={className}>
                <InputLabel className={{ root: classes.label }} htmlFor={label}>{label}</InputLabel>
                <Input
                    className={classes.input}
                    value={defaultValue}
                    startAdornment={
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    }
                    {...props}
                />
            </FormControl>
        </React.Fragment>
    );
};
export default InputWithIcon;
