import React, { Fragment } from 'react';
import { ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatContainer = (props) => {
    const { children } = props
    return (
        <Fragment>
            <ScrollToBottom className="chat-scroll flex-grow-1 relative"
                option={{ behavior: "smooth" }}>
                {children}
                <div className="pb-80" />
            </ScrollToBottom>
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;