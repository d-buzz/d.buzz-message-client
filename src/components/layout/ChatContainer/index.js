import React, { Fragment } from 'react';
import { ChatForm } from "./../../../components";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatContainer = (props) => {
    const { children } = props
    return (
        <Fragment>
            <ScrollToBottom className="chat-scroll flex-grow-1 relative"
                option={{ behavior: "smooth" }}>
                {children}
                <div className="pb-50" />
            </ScrollToBottom>
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;