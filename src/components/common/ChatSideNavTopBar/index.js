import React, { Fragment } from 'react';
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const ChatSideNavTopBar = (props) => {
    return (
        <Fragment>
            <div className="chat-sidenav__topbar flex flex-space-between px-4 py-1 flex-middle">
                <div className="flex items-center">
                    <h5 className="pr-45 white-space-pre mb-0 font-medium text-18 text-white">Conversations</h5>
                </div>
                <div className="flex flex-middle">
                    <div className="relative">
                        <IconButton component="button">
                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ChatSideNavTopBar;