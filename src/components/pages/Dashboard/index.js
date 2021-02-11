
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { renderRoutes } from "react-router-config";
import Scrollbar from "react-perfect-scrollbar";
import { withStyles } from '@material-ui/core/styles';
import { classList, isMdScreen } from "./../../../services/helper"
import { SideNavLeft, TopBar } from "./../../../components"
import AppContext from "./../../../AppContext"
import { setLayoutSettings } from "./../../../store/settings/actions"
import { signoutUserRequest } from "./../../../store/auth/actions"
import { setChatUsersListRequest, clearUserList, receiveMessageRequest } from "./../../../store/chat/actions"
import ChatSocketServer from "../../../services/chatSocketServer"

const styles = theme => {
    return {
        layout: {
            backgroundColor: theme.palette.background.default
        }
    };
};


const Dashboard = (props) => {
    const {
        user,
        theme,
        layoutSettings,
        signoutUserRequest,
        setLayoutSettings,
        setChatUsersListRequest,
        receiveMessageRequest,
        clearUserList,
        classes,
    } = props

    const { username, token } = user
    const { routes } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const layoutClasses = {
        [classes.layout]: true,
        [`layout1 sidenav-${layoutSettings.leftSidebar.mode} theme-${theme.palette.type} flex`]: true,
        "topbar-fixed": layoutSettings.topbar.fixed
    }

    useEffect(() => {
        if (isMdScreen()) {
            updateSidebarMode({ mode: "close" })
        }
        establishSocketConn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const establishSocketConn = () => {
        if (username) {
            setLoading(true)
            ChatSocketServer.establishSocketConnection(username)
            ChatSocketServer.getChatList(token)
            ChatSocketServer.eventEmitter.on('chat-list-response', createChatListUsers);
            ChatSocketServer.receiveMessage()
            ChatSocketServer.eventEmitter.on('add-message-response', receiveSocketMessages);
        }
    }

    const receiveSocketMessages = (response) => {
        if (response) {
            receiveMessageRequest(response)
        }
    }

    const createChatListUsers = (response) => {
        setChatUsersListRequest(response).then((result) => {
            setLoading(false)
        })
    }

    const updateSidebarMode = (sideBarSettings) => {
        setLayoutSettings({
            ...layoutSettings,
            leftSidebar: {
                ...layoutSettings.leftSidebar,
                ...sideBarSettings
            }
        })
    }

    const handleClickLogout = () => {
        signoutUserRequest()
        ChatSocketServer.logout(username)
        clearUserList()
    }

    return (
        <Fragment>
            <div className={classList(layoutClasses)}>
                {layoutSettings.leftSidebar.show &&
                    <SideNavLeft handleSignOut={handleClickLogout} loading={loading} />}

                <div className="content-wrap position-relative">
                    {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
                        <TopBar className="elevation-z8" handleSignOut={handleClickLogout} />
                    )}

                    {layoutSettings.perfectScrollbar && (
                        <Scrollbar className="scrollable-content">
                            {layoutSettings.topbar.show &&
                                !layoutSettings.topbar.fixed && <TopBar style={{ height: '80px' }} />}
                            <div className="content">{renderRoutes(routes)}</div>
                        </Scrollbar>
                    )}

                    {!layoutSettings.perfectScrollbar && (
                        <div className="scrollable-content">
                            {layoutSettings.topbar.show &&
                                !layoutSettings.topbar.fixed && <TopBar />}
                            <div className="content">{renderRoutes(routes)}</div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    theme: state.settings.get('themeStyles'),
    layoutSettings: state.settings.get('layoutSettings'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings,
        signoutUserRequest,
        setChatUsersListRequest,
        clearUserList,
        receiveMessageRequest
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(Dashboard)
)
