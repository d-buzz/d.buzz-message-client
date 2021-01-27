import React, { Fragment } from 'react';
import { ChatMessageTopBar, ChatMessageContent } from "./../../../components";

const ChatMessages = (props) => {
    return (
        <Fragment>
            <div className="flex-column relative h-560">
                <ChatMessageTopBar username="apitesting.girl" />
                <ChatMessageContent />
            </div>
        </Fragment>
    )
}
export default ChatMessages;