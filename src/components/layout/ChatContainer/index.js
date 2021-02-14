import React, { Fragment } from 'react';
import { ChatForm } from "./../../../components";
import { Divider } from "@material-ui/core";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatContainer = (props) => {
    const { children } = props
    // const messageContainer = createRef()

    // useEffect(() => {
    //     if (children) {
    //         scrollChatBottom()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [children])

    // const scrollChatBottom = () => {
    //     if (messageContainer.current) {
    //         try {
    //             messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    //             messageContainer.current.scrollIntoView({ behaviour: "smooth" })
    //         } catch (error) {
    //             console.warn(error)
    //         }
    //     }
    // }

    return (
        <Fragment>
            <ScrollToBottom className="chat-scroll flex-grow-1 relative"
                option={{ behavior: "smooth" }}>
                {children}
            </ScrollToBottom>
            {/* <div id="chat-message-list"
                ref={messageContainer}
                className="scrollable-content">
                <div className="content">
                    {children}
                </div>
            </div> */}
            <Divider />
            <ChatForm />
        </Fragment>
    )
}
export default ChatContainer;