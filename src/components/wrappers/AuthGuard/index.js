import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

const AuthGuard = (props) => {
    const { children, user } = props
    const location = useLocation()
    const { pathname } = location
    const { is_authenticated } = user;

    const isGuardedRoute = () => {
        return pathname.match(/^(\/dashboard)/g)
    }

    return (
        <Fragment>
            {pathname && (
                <Fragment>
                    {is_authenticated && (
                        <Redirect to={{ pathname: '/chats' }} />
                    )}
                    {!is_authenticated && isGuardedRoute() && (
                        <Redirect to={{ pathname: '/' }} />
                    )}
                    {children}
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
})

export default connect(mapStateToProps)(AuthGuard);
