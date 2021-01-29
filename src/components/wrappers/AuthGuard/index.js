import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

const AuthGuard = (props) => {
    const { children, user, fromLogin } = props
    const location = useLocation()
    const { pathname } = location
    const { is_authenticated } = user;

    const isGuardedRoute = () => {
        return pathname.match(/^(\/chats)/g) || pathname.match(/^(\/dashboard)/g)
    }

    const isFreeRoute = () => {
        return fromLogin || pathname.match(/^\/$/) || pathname.match(/^(\/login)/g)
    }

    return (
        <Fragment>
            {pathname && (
                <Fragment>
                    {is_authenticated && isFreeRoute() && (
                        <Redirect to={{ pathname: '/chats' }} />
                    )}
                    {!is_authenticated && isGuardedRoute() && (
                        <Redirect to={{ pathname: '/login' }} />
                    )}
                    {children}
                </Fragment>)}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    fromLogin: state.auth.get('fromLogin')
})

export default connect(mapStateToProps)(AuthGuard);
