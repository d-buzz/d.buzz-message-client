import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

const AuthGuard = (props) => {
    const { children, user } = props
    const location = useLocation()
    const { pathname } = location
    const { is_authenticated } = user;

    return (
        <Fragment>
            {pathname && (
                <Fragment>
                    {is_authenticated && (
                        <Redirect to={{ pathname: '/chats' }} />
                    )}
                    {!is_authenticated && (
                        <Redirect to={{ pathname: '/login' }} />
                    )}
                    {children}
                </Fragment>)}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
})

export default connect(mapStateToProps)(AuthGuard);
