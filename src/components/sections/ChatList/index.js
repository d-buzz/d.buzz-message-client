import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import Scrollbar from "react-perfect-scrollbar";
import { ChatSideNavTopBar, ChatSideNavContact } from "./../../../components";

const ChatList = (props) => {
    const { user } = props
    const { username } = user
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

    ];

    const renderContacts = () => {
        return (
            contacts.map((item, index) => {
                return (
                    <ChatSideNavContact key={index} item={item} />
                )
            })
        )
    }

    return (
        <Fragment>
            <div className="bg-chat jss387 jss389">
                <div className="bg-chat jss390">
                    <ChatSideNavTopBar />
                    <Scrollbar option={{ suppressScrollX: true }}
                        className="scrollable position-relative h-full ps ps--active-y ps--active-x">
                        {renderContacts()}
                    </Scrollbar>
                </div>
            </div>
        </Fragment>
        //#36404a
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
})

export default connect(mapStateToProps)(ChatList);
