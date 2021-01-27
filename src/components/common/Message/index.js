import React, { Fragment } from 'react';
import { Avatar } from "@material-ui/core";

const Message = (props) => {
    const userPic = `https://images.hive.blog/u/bajoy23/avatar/small`
    const contactPic = `https://images.hive.blog/u/apitesting.girl/avatar/small`
    return (
        <Fragment>
            <div className="flex items-start px-4 py-3">
                <div className="relative">
                    <Avatar className="avatar borderWhite" src={contactPic} />
                    <div className="onlineStatus bg-secondary" />
                </div>
                <div className="ml-4">
                    <p className="text-muted m-0 mb-2">
                        apitesting.girl
                    </p>
                    <div className="px-4 py-2 mb-2 border-radius-4 bg-sender">
                        <span className="whitespace-pre-wrap">
                            Do you ever find yourself falling into the “discount trap?”
                        </span>
                    </div>
                    <small className="text-muted mb-0">10:01 PM</small>
                </div>
            </div>
            <div className="flex flex-space-between flex-middle px-4">
                <div className="flex items-center" />
                <div className="flex items-start flex-middle">
                    <div className="mr-4 text-align-right">
                        <p className="text-muted m-0 mb-2">bajoy23</p>
                        <div className="px-4 py-2 mb-2 border-radius-4 text-align-left bg-secondary">
                            <span className="whitespace-pre-wrap">
                                Giving away your knowledge or product just to gain clients?
                            </span>
                        </div>
                        <small className="text-muted mb-0">11:25 PM</small>
                    </div>
                    <div className="relative">
                        <Avatar className="avatar borderWhite" src={userPic} />
                        <div className="onlineStatus bg-secondary" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Message;