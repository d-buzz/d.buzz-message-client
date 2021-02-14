import React from 'react';
import { ListItem, ListItemText, Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const ChatSideNavContact = (props) => {
    const { username, online, index } = props

    const userPic = `https://images.hive.blog/u/${username}/avatar/small`
    let bgStatus = "secondary"
    if (online === 1) {
        bgStatus = "green"
    }

    return (
        <ListItem
            key={`${index}-${Math.random(0, 100)}`}
            button
            component={NavLink}
            to={`/chats/@${username}`}
            className="nav-item">
            <div className="relative">
                <Avatar className="avatar borderWhite" src={userPic} border="true" />
                <div className={`onlineStatus bg-${bgStatus}`} />
            </div>
            <ListItemText
                className="ml-10"
                primary={`${username}`}
            />
            {/* <div className={`badge bg-secondary`}>
                30+
            </div> */}
        </ListItem >
    )
}
export default ChatSideNavContact;