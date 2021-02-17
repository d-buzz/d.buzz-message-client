import React, { Fragment } from "react";
import {
    TextField,
    MenuItem
} from "@material-ui/core";

const SelectTextField = (props) => {
    const {
        value,
        label,
        options,
    } = props

    return (
        <Fragment>
            <TextField
                select
                label={label}
                value={value}
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Fragment>
    );
};
export default SelectTextField