import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Message,
    ChatContainer,
    Loading,
    NoMessage,
} from "./../../../components";

const ChatMessages = (props) => {
    const { user, messages, isFetchingChats, newChat } = props
    const { username: loginUser } = user

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newChat])

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
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
    }, dispatch),
})

export default (
    connect(mapStateToProps, mapDispatchToProps
    )(ChatMessages)
)
