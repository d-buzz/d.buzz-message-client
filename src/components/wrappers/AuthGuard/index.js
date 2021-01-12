import React from 'react'
// import { connect } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'

const AuthGuard = (props) => {
    const { children } = props
    const location = useLocation()
    const { pathname } = location
    const is_authenticated = false


    const isGuardedRoute = () => {
        return pathname.match(/^(\/dashboard)/g)
    }

    return (
        <React.Fragment>
            {pathname && (
                <React.Fragment>
                    {is_authenticated && (
                        <Redirect to={{ pathname: '/dashboard' }} />
                    )}
                    {!is_authenticated && isGuardedRoute() && (
                        <Redirect to={{ pathname: '/' }} />
                    )}
                    {children}
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

// const mapStateToProps = (state) => ({
// })

export default AuthGuard
