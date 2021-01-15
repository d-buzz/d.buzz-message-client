import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createMuiTheme } from '@material-ui/core/styles';
import { getTheme } from "./../../../services/theme"
import { ThemeProvider } from "./../../../components"
import { getSavedThemeRequest, generateStyles } from "./../../../store/settings/actions"

const ThemeLoader = (props) => {
    const {
        children,
        getSavedThemeRequest,
        generateStyles,
    } = props

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getSavedThemeRequest()
            .then(({ mode }) => {
                const theme = createMuiTheme(getTheme());
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
    }, dispatch),
})

export default connect(null, mapDispatchToProps)(ThemeLoader)