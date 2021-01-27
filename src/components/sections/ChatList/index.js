import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { ChatSideNavContact } from "./../../../components";

const ChatList = (props) => {
    // const { user } = props
    // const { username } = user
    const contacts = [
        {
            username: "missdarkstar06",
            online: 1
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
            online: 1
        },
        {
            username: "executive-board",
            online: 0
        },
        {
            username: "apitesting.girl",
            online: 1
        },
        {
            username: "executive-board",
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
            username: "missdarkstar06",
            online: 1
        },
        {
            username: "psychkrhoz",
            online: 0
        },

    ];

    const renderContacts = () => {
        return (
            contacts.map((item, index) => {
                return (
                    <ChatSideNavContact index={index} item={item} />
                )
            })
        )
    }

    return (
        <Fragment>
            <div className="chat-list">
                {renderContacts()}
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
})

export default connect(mapStateToProps)(ChatList);
