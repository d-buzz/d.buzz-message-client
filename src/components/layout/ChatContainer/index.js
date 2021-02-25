import React, { Fragment } from 'react';
import { ChatForm } from "./../../../components";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatContainer = (props) => {
    const { children } = props
    return (
        <Fragment>
            <ScrollToBottom className="message_hold"
                option={{ behavior: "smooth" }}>
                {children}
            </ScrollToBottom>
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;