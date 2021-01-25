
import React, { Fragment, useContext, useEffect } from 'react';
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

const styles = theme => {
    return {
        layout: {
            backgroundColor: theme.palette.background.default
        }
    };
};


const Dashboard = (props) => {
    const {
        theme,
        layoutSettings,
        signoutUserRequest,
        setLayoutSettings,
        classes
    } = props

    const { routes } = useContext(AppContext)
    const layoutClasses = {
        [classes.layout]: true,
        [`layout1 sidenav-${layoutSettings.leftSidebar.mode} theme-${theme.palette.type} flex`]: true,
        "topbar-fixed": layoutSettings.topbar.fixed
    }

    useEffect(() => {
        if (isMdScreen()) {
            updateSidebarMode({ mode: "close" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <div className={classList(layoutClasses)}>
                {layoutSettings.leftSidebar.show && <SideNavLeft handleSignOut={signoutUserRequest} />}

                <div className="content-wrap position-relative">
                    {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
                        <TopBar className="elevation-z8" handleSignOut={signoutUserRequest} />
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
    theme: state.settings.get('themeStyles'),
    layoutSettings: state.settings.get('layoutSettings'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings,
        signoutUserRequest,
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(Dashboard)
)
