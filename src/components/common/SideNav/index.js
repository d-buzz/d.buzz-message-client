import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Scrollbar from "react-perfect-scrollbar";
import { setLayoutSettings } from "./../../../store/settings/actions"
import { ChatList, ContactListSkeleton } from "./../../../components"

const SideNav = (props) => {
    const {
        layoutSettings,
        setLayoutSettings,
        loading
    } = props

    const updateSidebarMode = (sideBarSettings) => {
        setLayoutSettings({
            ...layoutSettings,
            leftSidebar: {
                ...layoutSettings.leftSidebar,
                ...sideBarSettings
            }
        })
    }

    const renderOverlay = () => {
        return (<div
            onClick={() => updateSidebarMode({ mode: "close" })}
            className="sidenav__overlay"
        />)
    }

    return (
        <Fragment>
            <Scrollbar className="scrollable position-relative">
                {!loading && <ChatList />}
                {loading && <ContactListSkeleton />}
            </Scrollbar>
            {renderOverlay()}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings')
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings
    }, dispatch),
})

export default connect(mapStateToProps,
    mapDispatchToProps
)(SideNav)