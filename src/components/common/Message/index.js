import React, { Fragment } from 'react';
import { Avatar, Chip } from "@material-ui/core";
import moment from "moment";
import { HiveIcon } from "./../../elements";
import TimeAgo from 'react-timeago'
import Linkify from 'react-linkify';

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
        const x = new moment()
        const y = moment(`${date}Z`).local()
        const duration = moment.duration(x.diff(y)).years()
        if (parseInt(duration) >= 1) {
            return y.format("MMM DD YYYY hh:mm A").toString();
        } else {
            const formatted = moment(`${date}Z`).local().toString()
            return (
                <TimeAgo date={formatted} live={true} />
            )
        }
    }

    const linkComponentDecorator = (decoratedHref, decoratedText, key) => {
        return (
            <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
            </a>
        )
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
                            <span className="whitespace-pre-wrap message-content">
                                <Linkify componentDecorator={linkComponentDecorator}>
                                    {message || memo}
                                </Linkify>
                            </span>
                        </div>
                        <small className="text-muted mb-0">{getDateAgo(time)} | </small>
                        <Chip
                            size="small"
                            style={{ border: "none" }}
                            icon={<HiveIcon />}
                            label={`${amount} ${asset}`}
                            variant="outlined" />

                    </div>
                </div>}
            {(from === loginUser) &&
                <div className="flex flex-space-between flex-middle px-4 py-3">
                    <div className="flex items-center" />
                    <div className="flex items-start flex-middle">
                        <div className="mr-4 text-align-right">
                            <div className="px-4 py-2 mb-2 border-radius-20 text-align-left chat-bubble bg-secondary">
                                <span className="whitespace-pre-wrap message-content">
                                    <Linkify componentDecorator={linkComponentDecorator}>
                                        {message || memo}
                                    </Linkify>
                                </span>
                            </div>
                            <small className="text-muted mb-0">{getDateAgo(time)} | </small>
                            <Chip
                                size="small"
                                style={{ border: "none" }}
                                icon={<HiveIcon />}
                                label={`${amount} ${asset}`}
                                variant="outlined" />
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