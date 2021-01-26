import React, { Fragment } from 'react';
import { Avatar } from "@material-ui/core";

const ChatSideNavContact = (props) => {
    const { item } = props

    const userPic = `https://images.hive.blog/u/${item.username}/avatar/small`
    let bgStatus = "secondary"
    if (item.online === 1) {
        bgStatus = "green"
    }
    return (
        <Fragment>
            <div className="flex items-center p-15 cursor-pointer gray-on-hover">
                <div className="relative">
                    <Avatar className="avatar borderWhite" src={userPic} border={true} />
                    <div className={`onlineStatus bg-${bgStatus}`} />
                </div>
                <div className="ml-15">
                    <p className="m-0">{item.username}</p>
                    {/* <p className="m-0 text-muted">June 12, 2020</p> */}
                </div>
            </div>
        </Fragment>
    )
}
export default ChatSideNavContact;