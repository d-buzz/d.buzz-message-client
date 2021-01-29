import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { ChatSideNavContact } from "./../../../components";
import { List } from "@material-ui/core";

const ChatList = (props) => {
    // const { user } = props
    // const { username } = user
    const contacts = [
        {
            username: "riyuwe",
            online: 1
        },
        {
            username: "missdarkstar06",
            online: 0
        },
        {
            username: "psychkrhoz",
            online: 0
        },
        {
            username: "allaz",
            online: 0
        },
        {
            username: "apitesting.girl",
            online: 0
        },
        {
            username: "executive-board",
            online: 0
        },
        {
            username: "chrisrice",
            online: 1
        },
    ];

    const renderContacts = () => {
        return (
            contacts.map((item, index) => {
                return (
                    <ChatSideNavContact
                        key={`${index}-${item.username}`}
                        index={index}
                        item={item} />
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
})

export default connect(mapStateToProps)(ChatList);
