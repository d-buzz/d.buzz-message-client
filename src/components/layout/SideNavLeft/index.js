
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
    Icon,
    withStyles,
    MenuItem,
    Tooltip,
    IconButton,
    MuiThemeProvider,
    Divider
} from "@material-ui/core";
import { SimpleMenu } from "../../elements"
import {
    setThemeRequest,
    generateStyles
} from '../../../store/settings/actions'
import SidenavTheme from "../../../theme/SidenavTheme"
import { SideNav, Brand, ChatSideNavTopBar, Copyright } from "./../../../components"

const THEME = {
    LIGHT: 'light',
    DARK: 'dark',
}
const IconButtonWhite = withStyles(theme => ({
    root: {
        backgroundColor: "transparent",
        padding: "5px"
    }
}))(IconButton);

const IconSmall = withStyles(() => ({
    root: {
        fontSize: "1rem"
    }
}))(Icon);

const SideNavLeft = (props) => {
    const {
        user,
        theme,
        layoutSettings,
        handleSignOut,
        setThemeRequest,
        generateStyles
    } = props
    const { username } = user
    const { mode } = theme
    const userPic = `https://images.hive.blog/u/${username}/avatar/small`
    const sidenavTheme = layoutSettings.themes[layoutSettings.leftSidebar.theme]

    const handleToggleTheme = () => {
        let newMode = mode
        if (mode === THEME.LIGHT) {
            newMode = THEME.DARK
        } else {
            newMode = THEME.LIGHT
        }
        setThemeRequest(newMode)
            .then(({ mode }) => {
                const theme = { ...layoutSettings.themes[mode] }
                generateStyles(theme)
            })
    }

    const RenderLogoSwitch = () => {
        return (
            <Brand>
                {/* <IconButton
                    className="sidenav__toggle show-on-lg"
                    color="secondary"
                    onClick={handleToggleTheme}>
                    <Icon> wb_sunny </Icon>
                </IconButton> */}
            </Brand>
        );
    }

    const RenderUser = () => {
        return (
            <div className="sidenav__user">
                <div className="username-photo">
                    <img src={userPic} alt="user" />
                </div>
                <div className="ml-8">
                    <span className="username">
                        {username}
                    </span>
                    <div className="user__menu">
                        <SimpleMenu
                            menuButton={
                                <Tooltip title="Settings">
                                    <IconButtonWhite
                                        aria-label="Delete"
                                        className=""
                                        size="small"
                                    >
                                        <IconSmall> settings </IconSmall>
                                    </IconButtonWhite>
                                </Tooltip>
                            }>
                            <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
                                <Icon> home </Icon>
                                <span className="pl-16"> Home </span>
                            </MenuItem>
                            <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
                                <Icon> settings </Icon>
                                <span className="pl-16"> Account Setting </span>
                            </MenuItem>
                        </SimpleMenu>

                        <Tooltip title="Profile">
                            <IconButtonWhite aria-label="Delete" className="" size="small">
                                <IconSmall>person</IconSmall>
                            </IconButtonWhite>
                        </Tooltip>
                        <Tooltip title="Sign out">
                            <IconButtonWhite
                                aria-label="Delete"
                                className=""
                                size="small"
                                onClick={handleSignOut}
                            >
                                <IconSmall>exit_to_app</IconSmall>
                            </IconButtonWhite>
                        </Tooltip>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <MuiThemeProvider theme={sidenavTheme}>
            <SidenavTheme theme={sidenavTheme} settings={layoutSettings} />
            <div className="sidenav">
                <div className="sidenav__hold">
                    <RenderLogoSwitch />
                    <RenderUser />
                    <ChatSideNavTopBar />
                    <Divider />
                    <SideNav />
                    <Divider />
                    <div className="flex flex-space-between px-4 py-4 flex-middle">
                        <div className="flex items-center" />
                        <div className="flex flex-middle">
                            <Copyright />
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    theme: state.settings.get('theme'),
    layoutSettings: state.settings.get('layoutSettings')
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setThemeRequest,
        generateStyles
    }, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavLeft))