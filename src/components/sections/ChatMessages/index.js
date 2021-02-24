import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Message,
    ChatContainer,
    Loading,
    NoMessage,
} from "./../../../components";

const ChatMessages = (props) => {
    const {
        user,
        username: selectedContact,
        chatUsersList,
        isFetchingChats,
        newChat,
        receivedNewChat
    } = props
    const { username: loginUser } = user
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const index = chatUsersList.findIndex(x => x.username === selectedContact);
        let msgs = []
        if (index !== -1) {
            msgs = [...chatUsersList[index].messages]
            setMessages(msgs)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContact, newChat, receivedNewChat])

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
            <ChatContainer>
                {isFetchingChats && <Loading />}
                {!isFetchingChats && renderMessages()}
            </ChatContainer>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get("user"),
    isFetchingChats: state.chat.get('isFetchingChats'),
    newChat: state.chat.get('newChat'),
    receivedNewChat: state.chat.get('receivedNewChat'),
    chatUsersList: state.chat.get('chatUsersList'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
    }, dispatch),
})

export default (
    connect(mapStateToProps, mapDispatchToProps
    )(ChatMessages)
)
