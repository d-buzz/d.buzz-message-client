import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from "@material-ui/core";
import { ChatMessages, ChatMessageTopBar } from "./../../../components";
import { SimpleCard } from "./../../../components/elements";
import { setSelectedContact } from "./../../../store/chat/actions"
import { setLayoutSettings } from "./../../../store/settings/actions"
import { isMdScreen } from "./../../../services/helper"
import { useHistory } from 'react-router-dom'

const styles = theme => ({});

const Chats = (props) => {
    const {
        match,
        setSelectedContact,
        layoutSettings,
        setLayoutSettings,
        chatUsersList,
        newChat,
        receivedNewChat
    } = props
    const { params } = match
    const { username } = params
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (username) {
            if (isMdScreen()) {
                updateSidebarMode({ mode: "close" })
            }
            if (chatUsersList.length > 0) {
                const index = chatUsersList.findIndex(x => x.username === username);
                let msgs = []
                if (index !== -1) {
                    setSelectedContact(username)
                    msgs = chatUsersList[index].messages;
                    setMessages(msgs)
                } else {
                    history.push(`/chats`)
                }
                setLoading(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, chatUsersList, newChat, receivedNewChat])

    const updateSidebarMode = (sideBarSettings) => {
        setLayoutSettings({
            ...layoutSettings,
            leftSidebar: {
                ...layoutSettings.leftSidebar,
                ...sideBarSettings
            }
        })
    }

    return (
        <Fragment>
            <SimpleCard>
                <ChatMessageTopBar username={username} />
                <div className="message_hold">
                    <ChatMessages messages={messages} loading={loading} />
                </div>
            </SimpleCard >
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings'),
    chatUsersList: state.chat.get('chatUsersList'),
    newChat: state.chat.get('newChat'),
    receivedNewChat: state.chat.get('receivedNewChat'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setSelectedContact,
        setLayoutSettings
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(Chats)
)