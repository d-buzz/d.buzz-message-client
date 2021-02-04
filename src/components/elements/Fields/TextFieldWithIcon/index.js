import React from "react";
import {
    TextField,
    InputAdornment
} from "@material-ui/core";

const TextFieldWithIcon = (props) => {
    const {
        label,
        className,
        icon,
        iconPosition = "start",
        otherInputProps = {},
        variant = "outlined"
    } = props;
    return (
        <React.Fragment>
            <TextField
                variant={variant}
                margin="normal"
                label={label}
                className={className}
                InputProps={{
                    startAdornment: <InputAdornment position={iconPosition}>{icon}</InputAdornment>,
                    ...otherInputProps
                }}
                {...props}
            />
        </React.Fragment>
    );
};
export default TextFieldWithIcon;
