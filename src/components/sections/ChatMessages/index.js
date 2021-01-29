import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    ChatMessageTopBar,
    Message,
    ChatContainer
} from "./../../../components";

const ChatMessages = (props) => {
    const { selectedContact, user } = props
    const { username: mainUser } = user
    const { username } = selectedContact
    return (
        <Fragment>
            <div className="flex-column relative chat-form">
                <ChatMessageTopBar username={username} />
                <ChatContainer>
                    <Message username={username} mainUser={mainUser} />
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
