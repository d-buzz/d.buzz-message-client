import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSavedUserRequest } from "../../../store/auth/actions";

const Init = (props) => {
    const { getSavedUserRequest, children } = props;
    const [init, setInit] = useState(false)

    useEffect(() => {
        getSavedUserRequest().then(() => {
            setInit(true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            {init && (children)}
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            getSavedUserRequest,
        },
        dispatch
    ),
});

export default connect(null, mapDispatchToProps)(Init);
