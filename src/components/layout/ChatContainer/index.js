import React, { createRef, Fragment, useEffect } from 'react';
// import PerfectScrollbar from "react-perfect-scrollbar";
import { ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";


const ChatContainer = (props) => {
    const { children } = props
    const messageContainer = createRef()

    useEffect(() => {
        if (children) {
            scrollChatBottom()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children])

    const scrollChatBottom = () => {
        if (messageContainer.current !== null) {
            try {
                messageContainer.current.scrollTop = messageContainer.current.scrollHeight
            } catch (error) {
                console.warn(error)
            }
        }
    }

    return (
        <Fragment>
            <div id="chat-message-list"
                ref={messageContainer}
                className="scrollable-content">
                <div className="content">
                    {children}
                </div>
            </div>
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;