import React, { Fragment } from 'react';
import Scrollbar from "react-perfect-scrollbar";
import { Message, NoChatSelected } from "./../../../components";

const ChatMessageContent = (props) => {
    return (
        <Fragment>
            <Scrollbar id="chat-message-list"
                className="chat-message-list flex-grow-1 relative"
                option={{ suppressScrollX: true }}
            >
                {/* <NoChatSelected /> */}
                <Message />
            </Scrollbar>
        </Fragment>
    )
}
export default ChatMessageContent;