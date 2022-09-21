import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkVersionRequest } from '../../../store/settings/actions'
import { getSavedUserRequest } from "../../../store/auth/actions";

const Init = (props) => {
    const { getSavedUserRequest, checkVersionRequest, children } = props;
    const [init, setInit] = useState(false)

    useEffect(() => {
        // checkVersionRequest().then((isLatest) => {
        //     if(!isLatest) {
        //         window.history.forward(1)
        //         window.location.reload(true)
        //     } else {
        //     }
        // })
        
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
            checkVersionRequest,
        },
        dispatch
    ),
});

export default connect(null, mapDispatchToProps)(Init);
