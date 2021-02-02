import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { ChatSideNavContact } from "./../../../components";
import { List } from "@material-ui/core";

const ChatList = (props) => {
    const { chatUsersList, newStatusUsers } = props
    const [chatUsers, setChatUsers] = useState(chatUsersList)

    useEffect(() => {
        setChatUsers(chatUsersList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newStatusUsers])

    const renderContacts = () => {
        return (
            chatUsers.map((item, index) => {
                return (
                    <ChatSideNavContact
                        key={`${index}-${item.username}`}
                        index={index}
                        username={item.username}
                        online={item.online} />
                )
            })
        )
    }

    return (
        <Fragment>
            <div className="chat-list">
                <List className="navigation">
                    {renderContacts()}
                </List>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    chatUsersList: state.chat.get('chatUsersList'),
    newStatusUsers: state.chat.get('newStatusUsers')
})

export default connect(mapStateToProps)(ChatList);
