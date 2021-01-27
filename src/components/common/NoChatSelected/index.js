import React, { Fragment } from 'react';
import ChatIcon from '@material-ui/icons/Chat';

const NoChatSelected = (props) => {
    return (
        <Fragment>
            <div className="flex-column justify-center items-center h-full">
                <div className="h-220 w-220 rounded elevation-z6 bg-chat flex justify-center items-center">
                    <ChatIcon style={{ fontSize: "4rem" }} />
                </div>
                <p>No conversation selected</p>
            </div>
        </Fragment>
    )
}
export default NoChatSelected;