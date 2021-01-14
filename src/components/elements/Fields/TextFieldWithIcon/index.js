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
        iconPosition = "start"
    } = props;
    return (
        <React.Fragment>
            <TextField
                variant="outlined"
                margin="normal"
                label={label}
                className={className}
                InputProps={{
                    startAdornment: <InputAdornment position={iconPosition}>{icon}</InputAdornment>,
                }}
                {...props}
            />
        </React.Fragment>
    );
};
export default TextFieldWithIcon;
