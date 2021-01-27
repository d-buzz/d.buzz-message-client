import React, { Fragment } from 'react';
import Scrollbar from "react-perfect-scrollbar";
import { Message, NoChatSelected, ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";

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
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatMessageContent;