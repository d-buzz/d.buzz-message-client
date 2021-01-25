import React, { Fragment, useState } from 'react';
import { Icon, IconButton, withStyles } from "@material-ui/core";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main
    }
});


const SearchBox = (props) => {
    const { classes } = props
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <Fragment>
            {!open && (
                <IconButton onClick={toggle}>
                    <Icon>search</Icon>
                </IconButton>
            )}
            {open && (
                <div
                    className={`flex flex-middle matx-search-box ${classes.root}`}
                >
                    <input
                        className={`px-16 search-box w-100 ${classes.root}`}
                        type="text"
                        placeholder="Search users"
                        autoFocus
                    />
                    <IconButton onClick={toggle} className="text-middle mx-4">
                        <Icon>close</Icon>
                    </IconButton>
                </div>
            )}
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(SearchBox);