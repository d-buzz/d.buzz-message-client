import React, { Fragment, useState } from 'react';
import { List, ListItem, ListItemText, Avatar } from "@material-ui/core";

const ChatSideNavContact = (props) => {
    const { item, index } = props
    const [selectedIndex, setSelectedIndex] = useState(1)

    const userPic = `https://images.hive.blog/u/${item.username}/avatar/small`
    let bgStatus = "secondary"
    if (item.online === 1) {
        bgStatus = "green"
    }

    const handleMenuItemClick = (i) => {
        setSelectedIndex(i);
    }

    return (
        <Fragment>
            <List component="nav" className="cursor-pointer">
                <ListItem
                    button
                    key={index}
                    // selected={selectedIndex === index}
                    onClick={() => handleMenuItemClick(index)}>
                    <div className="relative">
                        <Avatar className="avatar borderWhite" src={userPic} border={true} />
                        <div className={`onlineStatus bg-${bgStatus}`} />
                    </div>
                    <ListItemText
                        className="ml-15"
                        primary={`${item.username}${index}`}
                    />
                </ListItem>
            </List>
        </Fragment>
    )
}
export default ChatSideNavContact;