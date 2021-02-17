import React, { Fragment } from 'react';

const NoMessage = (props) => {
    return (
        <Fragment>
            <div className="flex-column justify-center items-center h-full">
                <span style={{ fontSize: "1rem", paddingTop: "10rem" }}>
                    No messages found in this conversation
                </span>
            </div>
        </Fragment>
    )
}
export default NoMessage;