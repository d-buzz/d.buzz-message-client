import React from "react";
import { Login, Dashboard } from "../../../components"

const Home = (props) => {
    const is_authenticated = false;

    return (
        <React.Fragment>
            {is_authenticated && <Dashboard />}
            {!is_authenticated && <Login />}
        </React.Fragment>
    );
}

export default Home;