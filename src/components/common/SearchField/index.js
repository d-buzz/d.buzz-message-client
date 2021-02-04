import React, { Fragment } from 'react';
import { Icon, TextField } from "@material-ui/core";

const SearchField = (props) => {
    const {
        value,
        handleInputChange,
    } = props
    return (
        <Fragment>
            <TextField
                id="message"
                variant="outlined"
                margin="normal"
                placeholder="Search users"
                value={value}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <Icon>search</Icon>
                }}
                fullWidth
                focused
            />
        </Fragment>
    )
}

export default SearchField;