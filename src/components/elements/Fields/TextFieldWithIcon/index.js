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
        otherinputprops = {},
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
                    ...otherinputprops
                }}
                {...props}
            />
        </React.Fragment>
    );
};
export default TextFieldWithIcon;
