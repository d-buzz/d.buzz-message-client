import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Avatar, Chip, Icon, IconButton, Menu, MenuItem } from "@material-ui/core";
import moment from "moment";
import { HiveIcon } from "./../../elements";
import TimeAgo from 'react-timeago'
import Linkify from 'react-linkify';
import { isMemoEncrypted } from "./../../../services/helper";
import { decryptMessageRquest } from "./../../../store/chat/actions";
import { broadcastNotification } from "./../../../store/interfaces/actions";

const Message = (props) => {
    const {
        item,
        loginUser,
        decryptMessageRquest,
        newDecrypted,
        broadcastNotification,
        isEncryptedAll
    } = props
    const {
        from,
        decoded: message,
        memo,
        amount,
        asset,
        time,
        number
    } = item
    const userPic = `https://images.hive.blog/u/${loginUser}/avatar/small`
    const contactPic = `https://images.hive.blog/u/${from}/avatar/small`
    const [anchorEl, setAnchorEl] = useState(null);
    const [displayedMsg, setDisplayedMsg] = useState(null)


    useEffect(() => {
        if (!isEncryptedAll) {
            setDisplayedMsg(message || memo)
        } else {
            setDisplayedMsg(memo || message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newDecrypted, isEncryptedAll, message, memo])


    const getDateAgo = (date) => {
        const x = new moment()
        const y = moment(`${date}Z`).local()
        const duration = moment.duration(x.diff(y)).years()
        if (parseInt(duration) >= 1) {
            return y.format("MMM DD YYYY hh:mm A").toString();
        } else {
            const formatted = y.toString()
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

    const handleClickOptions = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    const handleDecryptMessage = () => {
        if (!message) {
            decryptMessageRquest(number, memo).then((res) => {
                handleCloseOptions()
                if (!res.success) {
                    if (res.error) {
                        broadcastNotification('error', res.error)
                    } else {
                        broadcastNotification('error', "Failed to decrypt memo")
                    }
                }
            })
        } else {
            setDisplayedMsg(message)
            handleCloseOptions()
        }
    }

    const handleEncryptMessage = () => {
        setDisplayedMsg(memo)
        handleCloseOptions()
    }

    const checkIsDecryptedMemo = () => {
        return (displayedMsg &&
            displayedMsg.substring(0, 2) === "# ")
    }

    const renderOptions = () => {
        return (
            <Fragment>
                <IconButton size="small" onClick={handleClickOptions}>
                    <Icon>more_horiz</Icon>
                </IconButton>
                <Menu
                    id="decrypt"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseOptions}
                >
                    {!checkIsDecryptedMemo() && <MenuItem onClick={handleDecryptMessage}>decrypt</MenuItem>}
                    {checkIsDecryptedMemo() && <MenuItem onClick={handleEncryptMessage}>encrypt</MenuItem>}
                </Menu>
            </Fragment>
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
                                    {displayedMsg}
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

                        {(isMemoEncrypted(memo)) && renderOptions()}
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
                                        {displayedMsg}
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

                            {(isMemoEncrypted(memo)) && renderOptions()}
                        </div>
                        <div className="relative">
                            <Avatar className="avatar borderWhite" src={userPic} />
                        </div>
                    </div>
                </div>}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    newDecrypted: state.chat.get('newDecrypted'),
    isEncryptedAll: state.chat.get('isEncryptedAll'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        decryptMessageRquest,
        broadcastNotification
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);