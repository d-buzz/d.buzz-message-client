import React, { Fragment } from 'react';
import { withStyles } from "@material-ui/core";

const styles = theme => ({});

const Contacts = (props) => {

    return (
        <Fragment>
            <span>This is Contacts page</span>
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(Contacts);