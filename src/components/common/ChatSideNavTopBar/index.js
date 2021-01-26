import React, { Fragment } from 'react';
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const ChatSideNavTopBar = (props) => {
    return (
        <Fragment>
            <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-secondary">
                <h5 className="p-2 pr-45 white-space-pre mb-0 font-medium text-18 text-white">Conversations</h5>
                <div className="relative">
                    <IconButton component="button">
                        <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </div>
            </div>
        </Fragment>
    )
}
export default ChatSideNavTopBar;