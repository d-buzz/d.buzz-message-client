import React, { Fragment } from 'react';
import { IconButton, Icon } from "@material-ui/core";

const ChatMessageTopBar = (props) => {
    const { username } = props
    return (
        <Fragment>
            <div className="flex flex-space-between flex-middle p-1 bg-secondary">
                <div className="flex items-center">
                    <IconButton>
                        <Icon>people</Icon>
                    </IconButton>
                    <h5 className="ml-2 white-space-pre mb-0 font-medium text-18 text-white">
                        {username}
                    </h5>
                </div>
                {/* <div className="flex flex-middle">
                    <IconButton>
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div> */}
            </div>
        </Fragment>
    )
}

export default ChatMessageTopBar;