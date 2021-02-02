import React, { Fragment } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatContainer = ({ children }) => {
    return (
        <Fragment>
            <PerfectScrollbar id="chat-message-list"
                options={{ suppressScrollX: false }}
                className="chat-message-list flex-grow-1 relative"
            >
                {children}
            </PerfectScrollbar>
            {/* <ScrollToBottom
                className="chat-scroll flex-grow-1 relative"
                option={{ behavior: "smooth" }}>
                {children}
            </ScrollToBottom> */}
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;