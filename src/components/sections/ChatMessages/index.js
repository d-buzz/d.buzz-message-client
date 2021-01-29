import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    ChatMessageTopBar,
    Message,
    ChatContainer
} from "./../../../components";

const ChatMessages = (props) => {
    const { selectedContact, user, messages } = props
    const { username: loginUser } = user
    const { username } = selectedContact

    const renderMessages = () => {
        return (
            messages.map((item, index) => {
                return (
                    <Message key={index} item={item} loginUser={loginUser} />
                )
            })
        )
    }

    return (
        <Fragment>
            <div className="flex-column relative chat-form">
                <ChatMessageTopBar username={username} />
                <ChatContainer>
                    {renderMessages()}
                </ChatContainer>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get("user"),
    selectedContact: state.chat.get('selectedContact'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
    }, dispatch),
})

export default (
    connect(mapStateToProps, mapDispatchToProps
    )(ChatMessages)
)
