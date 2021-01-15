import React from 'react'
import { connect } from 'react-redux'
import { ThemeProvider as Provider } from '@material-ui/core/styles';

const ThemeProvider = (props) => {
    const {
        children,
        theme,
    } = props

    return (
        <React.Fragment>
            <Provider theme={theme}>
                {children}
            </Provider>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    theme: state.settings.get('themeStyles'),
})

export default connect(mapStateToProps)(ThemeProvider)
