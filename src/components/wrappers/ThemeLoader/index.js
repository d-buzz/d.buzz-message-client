import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThemeProvider } from "./../../../components"
import { getSavedThemeRequest, generateStyles, setLayoutSettings } from "./../../../store/settings/actions"
import LayoutSettings from "../../../theme/LayoutSettings"

const ThemeLoader = (props) => {
    const {
        children,
        getSavedThemeRequest,
        generateStyles,
        setLayoutSettings
    } = props

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLayoutSettings(LayoutSettings)
        getSavedThemeRequest()
            .then(({ mode }) => {
                const theme = { ...LayoutSettings.themes[mode] }
                generateStyles(theme)
                setLoaded(true)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <React.Fragment>
            {loaded && (
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            )}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        getSavedThemeRequest,
        generateStyles,
        setLayoutSettings
    }, dispatch),
})

export default connect(null, mapDispatchToProps)(ThemeLoader)