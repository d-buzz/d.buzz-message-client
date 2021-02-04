import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {
    Icon,
    IconButton,
    MenuItem,
    withStyles,
    MuiThemeProvider
} from "@material-ui/core";
import { setLayoutSettings } from "./../../../store/settings/actions"
import { isMdScreen } from "./../../../services/helper"
import { SimpleMenu } from "./../../elements"
import { SearchBox } from "./../../../components"

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
});

const TopBar = (props) => {
    const {
        user,
        layoutSettings,
        setLayoutSettings,
        handleSignOut,
        className,
        style
    } = props
    const { username } = user
    const userPic = `https://images.hive.blog/u/${username}/avatar/small`
    const topbarTheme = layoutSettings.themes[layoutSettings.topbar.theme]
    const [searchKey, setSearchKey] = useState("")


    const handleSidebarToggle = () => {
        let mode;
        if (isMdScreen()) {
            mode = layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close"
        } else {
            mode = layoutSettings.leftSidebar.mode === "full" ? "close" : "full"
        }
        updateSidebarMode({ mode })
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

    const handleChangeInput = (e) => {
        const { target } = e;
        const { id, value } = target;
        if (id === "searchkey") {
            setSearchKey(value)
        }
    }


    return (
        <MuiThemeProvider theme={topbarTheme}>
            <div className="topbar">
                <div
                    className={`topbar-hold ${className}`}
                    style={Object.assign({}, { backgroundColor: topbarTheme.palette.background.paper }, style)}
                >
                    <div className="flex flex-space-between flex-middle h-100">
                        <div className="flex">
                            <IconButton onClick={handleSidebarToggle} className="hide-on-lg">
                                <Icon>menu</Icon>
                            </IconButton>
                        </div>
                        <div className="flex flex-middle">
                            <SearchBox value={searchKey} handleChangeInput={handleChangeInput} />
                            <SimpleMenu
                                menuButton={
                                    <img
                                        className="mx-8 text-middle circular-image-small cursor-pointer"
                                        src={userPic}
                                        alt="user"
                                    />
                                }>
                                <MenuItem
                                    onClick={handleSignOut}
                                    className="flex flex-middle"
                                    style={{ minWidth: 185 }}
                                >
                                    <Icon> power_settings_new </Icon>
                                    <span className="pl-16"> Logout </span>
                                </MenuItem>
                            </SimpleMenu>
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    layoutSettings: state.settings.get('layoutSettings'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(TopBar)
)