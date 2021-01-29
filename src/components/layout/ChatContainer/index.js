import React, { Fragment } from 'react';
import Scrollbar from "react-perfect-scrollbar";
import { ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";

const ChatContainer = ({ children }) => {
    return (
        <Fragment>
            <Scrollbar id="chat-message-list"
                options={{ suppressScrollX: false }}
                className="chat-message-list flex-grow-1 relative"
            >
                {children}
            </Scrollbar>
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;