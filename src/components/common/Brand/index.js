import React from "react";
import logo from "../../../images/hivepm_brand_white.png"
import { useHistory } from 'react-router-dom'
import { setLayoutSettings } from "./../../../store/settings/actions"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { isMdScreen } from "./../../../services/helper"

const Brand = (props) => {
    const { children, layoutSettings, setLayoutSettings } = props
    const history = useHistory()

    const gotoHome = () => {
        history.push("/chats")
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
        <div onClick={gotoHome} className="flex flex-middle flex-space-between brand-area cursor-pointer">
            <div className="flex flex-middle brand">
                <img src={logo} alt="company-logo" />
            </div>
            {children}
        </div>
    )
}


const mapStateToProps = (state) => ({
    layoutSettings: state.settings.get('layoutSettings'),
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setLayoutSettings
    }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
