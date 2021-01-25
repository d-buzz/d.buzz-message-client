import React, { Fragment } from 'react';
import { withStyles } from "@material-ui/core";

const styles = theme => ({});

const Chats = (props) => {

    return (
        <Fragment>
            <span>This is chats page</span>
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(Chats);