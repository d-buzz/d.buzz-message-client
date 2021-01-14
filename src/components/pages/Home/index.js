import React from "react";
import { connect } from 'react-redux'
import { Login, Dashboard } from "../../../components"

const Home = (props) => {
    const { user } = props
    const { is_authenticated } = user;

    return (
        <React.Fragment>
            {is_authenticated && <Dashboard />}
            {!is_authenticated && <Login />}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
})

export default connect(mapStateToProps)(Home)