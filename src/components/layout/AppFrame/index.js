import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useLocation } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import NotificationBox from "../../../components/common/NotificationBox"
import { setLayoutSettings } from "./../../../store/settings/actions"
import AppContext from "./../../../AppContext"
import { isEqual, merge } from "lodash";
import { isMdScreen } from "./../../../services/helper"
import { Login, Dashboard } from "./../../../components"

const AppFrame = (props) => {
    const { setLayoutSettings, layoutSettings, route, user } = props
    const { is_authenticated } = user
    const { pathname } = useLocation()
    const { routes } = route

    useEffect(() => {
        if (window) {
            window.addEventListener("resize", listenWindowResize);
        }

        if (pathname) {
            updateSettingsFromRouter()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window, pathname])

    const updateSettingsFromRouter = () => {
        const matched = matchRoutes(routes, pathname)[0];
        if (matched && matched.route.settings) {
            const updatedSettings = merge({}, layoutSettings, matched.route.settings);
            if (!isEqual(layoutSettings, updatedSettings)) {
                setLayoutSettings(updatedSettings)
            }
        }
    }

    const listenWindowResize = () => {
        if (layoutSettings.leftSidebar.show) {
            let mode = isMdScreen() ? "close" : "full";
            setLayoutSettings(
                merge({}, layoutSettings, { leftSidebar: { mode } })
            );
        }
    }

    return (
        <React.Fragment>
            <AppContext.Provider value={{ routes }}>
                {is_authenticated && <Dashboard />}
                {!is_authenticated && <Login />}
            </AppContext.Provider>
            <NotificationBox />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings'),
    user: state.auth.get('user'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings
    }, dispatch),
})


export default connect(mapStateToProps,
    mapDispatchToProps
)(AppFrame)