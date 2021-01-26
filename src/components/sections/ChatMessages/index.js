import React, { Fragment } from 'react';
import { Avatar, IconButton, Icon } from "@material-ui/core";

const ChatMessages = (props) => {
    const userPic = `https://images.hive.blog/u/riyuwe/avatar/small`
    return (
        <Fragment>
            <div className="flex-column relative jss481">
                <div className="flex items-center justify-between p-1 bg-secondary">
                    <div className="flex items-center">
                        <IconButton>
                            <Icon>short_text</Icon>
                        </IconButton>
                        <div className="pl-3" />
                        <div className="relative">
                            <Avatar className="avatar borderWhite" src={userPic} />
                            <div className="onlineStatus bg-secondary" />
                        </div>
                        <h5 className="ml-4 white-space-pre mb-0 font-medium text-18 text-white">riyuwe</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ChatMessages;