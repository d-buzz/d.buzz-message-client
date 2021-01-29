import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { ChatSideNavContact } from "./../../../components";
import { List } from "@material-ui/core";

const ChatList = (props) => {
    const { chatUsersList } = props

    const renderContacts = () => {
        return (
            chatUsersList.map((item, index) => {
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
    chatUsersList: state.chat.get('chatUsersList')
})

export default connect(mapStateToProps)(ChatList);
