import React, { Fragment } from 'react';
import { ChatForm } from "./../../../components";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatContainer = (props) => {
    const { children } = props
    return (
        <Fragment>
            <div className="message_hold">
                <ScrollToBottom className="chat-scroll flex-grow-1 relative"
                    option={{ behavior: "smooth" }}>
                    {children}
                </ScrollToBottom>
                <ChatForm />
            </div>

        </Fragment>
    )
}
export default ChatContainer;