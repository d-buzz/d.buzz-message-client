import React, { Fragment } from 'react';
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { setSearchBoxStatus } from "./../../../store/interfaces/actions";
import { setLayoutSettings } from "./../../../store/settings/actions"
import { isMdScreen } from "./../../../services/helper"


const ChatSideNavTopBar = (props) => {
    const {
        setSearchBoxStatus,
        setLayoutSettings,
        layoutSettings
    } = props

    const handleOpenSearchBox = () => {
        setSearchBoxStatus(true)
        if (isMdScreen()) {
            updateSidebarMode({ mode: "close" })
        }
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

    return (
        <Fragment>
            <div className="chat-sidenav__topbar flex flex-space-between px-4 py-1 flex-middle">
                <div className="flex items-center">
                    <h5 className="pr-45 white-space-pre mb-0 font-medium text-18 text-white">Conversations</h5>
                </div>
                <div className="flex flex-middle">
                    <div className="relative">
                        <IconButton component="button" onClick={handleOpenSearchBox}>
                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setSearchBoxStatus,
        setLayoutSettings
    }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatSideNavTopBar);