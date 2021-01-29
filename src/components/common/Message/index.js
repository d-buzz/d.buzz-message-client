import React, { Fragment } from 'react';
import { Avatar } from "@material-ui/core";

const Message = (props) => {
    const { username, mainUser } = props
    const userPic = `https://images.hive.blog/u/${mainUser}/avatar/small`
    const contactPic = `https://images.hive.blog/u/${username}/avatar/small`
    return (
        <Fragment>
            <div className="flex items-start px-4 py-3">
                <div className="relative">
                    <Avatar className="avatar borderWhite" src={contactPic} />
                </div>
                <div className="ml-4">
                    <div className="px-4 py-2 mb-2 border-radius-20 bg-sender">
                        <span className="whitespace-pre-wrap">
                            Do you ever find yourself falling into the “discount trap?”
                        </span>
                    </div>
                    <small className="text-muted mb-0">Yesterday at 10:01 PM | </small>
                    <small className="text-muted mb-0">0.001 HIVE</small>
                </div>
            </div>
            <div className="flex flex-space-between flex-middle px-4">
                <div className="flex items-center" />
                <div className="flex items-start flex-middle">
                    <div className="mr-4 text-align-right">
                        <div className="px-4 py-2 mb-2 border-radius-20 text-align-left bg-secondary">
                            <span className="whitespace-pre-wrap">
                                Giving away your knowledge or product just to gain clients?
                            </span>
                        </div>
                        <small className="text-muted mb-0">Yesterday at 11:11 PM | </small>
                        <small className="text-muted mb-0">0.001 HBD</small>
                    </div>
                    <div className="relative">
                        <Avatar className="avatar borderWhite" src={userPic} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Message;