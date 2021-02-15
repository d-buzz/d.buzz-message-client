import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    ChatMessageTopBar,
    Message,
    ChatContainer,
    Loading,
    NoMessage
} from "./../../../components";

const ChatMessages = (props) => {
    const { selectedContact, user, messages, isFetchingChats } = props
    const { username: loginUser } = user
    const { username } = selectedContact

    const renderMessages = () => {
        if (messages.length > 0) {
            return (
                messages.map((item, index) => {
                    return (
                        <Message key={index} item={item} loginUser={loginUser} />
                    )
                })
            )
        } else {
            return (<NoMessage />)
        }
    }

    return (
        <Fragment>
            <div className="flex-column relative chat-form">
                <ChatMessageTopBar username={username} />
                <ChatContainer>
                    {isFetchingChats && <Loading />}
                    {!isFetchingChats && renderMessages()}
                </ChatContainer>

            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get("user"),
    selectedContact: state.chat.get('selectedContact'),
    isFetchingChats: state.chat.get('isFetchingChats'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
    }, dispatch),
})

export default (
    connect(mapStateToProps, mapDispatchToProps
    )(ChatMessages)
)
