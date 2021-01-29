import React, { Fragment } from 'react';
import { Avatar } from "@material-ui/core";
import moment from "moment";

const Message = (props) => {
    const { item, loginUser } = props
    const {
        from,
        decoded: message,
        memo,
        amount,
        asset,
        time
    } = item
    const userPic = `https://images.hive.blog/u/${loginUser}/avatar/small`
    const contactPic = `https://images.hive.blog/u/${from}/avatar/small`

    const getDateAgo = (date) => {
        return moment(`${date}Z`).local().fromNow();
    }

    return (
        <Fragment>
            {(from !== loginUser) &&
                <div className="flex items-start px-4 py-3">
                    <div className="relative">
                        <Avatar className="avatar borderWhite" src={contactPic} />
                    </div>
                    <div className="ml-4">
                        <div className="px-4 py-2 mb-2 border-radius-20 chat-bubble bg-sender">
                            <span className="whitespace-pre-wrap">
                                {message || memo}
                            </span>
                        </div>
                        <small className="text-muted mb-0">{getDateAgo(time)} | </small>
                        <small className="text-muted mb-0">{amount} {asset}</small>
                    </div>
                </div>}
            {(from === loginUser) &&
                <div className="flex flex-space-between flex-middle px-4 py-3">
                    <div className="flex items-center" />
                    <div className="flex items-start flex-middle">
                        <div className="mr-4 text-align-right">
                            <div className="px-4 py-2 mb-2 border-radius-20 text-align-left chat-bubble bg-secondary">
                                <span className="whitespace-pre-wrap">
                                    {message || memo}
                                </span>
                            </div>
                            <small className="text-muted mb-0">{getDateAgo(time)} | </small>
                            <small className="text-muted mb-0">{amount} {asset}</small>
                        </div>
                        <div className="relative">
                            <Avatar className="avatar borderWhite" src={userPic} />
                        </div>
                    </div>
                </div>}

        </Fragment>
    )
}
export default Message;