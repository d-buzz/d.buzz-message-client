import React, { Fragment, useEffect, } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from "@material-ui/core";
import { ChatMessages, ChatMessageTopBar } from "./../../../components";
import { SimpleCard } from "./../../../components/elements";
import { setSelectedContact } from "./../../../store/chat/actions"
import { setLayoutSettings } from "./../../../store/settings/actions"
import { isMdScreen } from "./../../../services/helper"

const styles = theme => ({});

const Chats = (props) => {
    const {
        match,
        setSelectedContact,
        layoutSettings,
        setLayoutSettings,
    } = props
    const { params } = match
    const { username } = params

    useEffect(() => {
        if (username) {
            if (isMdScreen()) {
                updateSidebarMode({ mode: "close" })
            }
            setSelectedContact(username)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

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
                <ChatMessages username={username} />
            </SimpleCard >
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings'),
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