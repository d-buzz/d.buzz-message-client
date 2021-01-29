import React from 'react';
import { ListItem, ListItemText, Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const ChatSideNavContact = (props) => {
    const { item, index } = props

    const userPic = `https://images.hive.blog/u/${item.username}/avatar/small`
    let bgStatus = "secondary"
    if (item.online === 1) {
        bgStatus = "green"
    }

    return (
        <ListItem
            key={`${index}-${Math.random(0, 100)}`}
            button
            component={NavLink}
            to={`/chats/@${item.username}`}
            className="nav-item">
            <div className="relative">
                <Avatar className="avatar borderWhite" src={userPic} border="true" />
                <div className={`onlineStatus bg-${bgStatus}`} />
            </div>
            <ListItemText
                className="ml-15"
                primary={`${item.username}`}
            />
        </ListItem >
    )
}
export default ChatSideNavContact;