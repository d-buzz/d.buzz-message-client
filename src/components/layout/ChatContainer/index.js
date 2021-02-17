import React, { Fragment } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatForm } from "./../../../components";

const ChatContainer = (props) => {
    const { children } = props

    return (
        <Fragment>
            <ScrollToBottom className="main-content"
                option={{ behavior: "smooth" }}>
                <div className="content">
                    {children}
                </div>
                <div className="pb-80" />
            </ScrollToBottom>
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;