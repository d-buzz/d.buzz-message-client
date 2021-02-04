import React, { Fragment } from 'react';
import { SimpleCard } from "./../../../components/elements";

const NoMessage = (props) => {
    return (
        <Fragment>
            <div className="relative flex-grow-1">
                <SimpleCard>
                    <div className="relative flex h-full">
                        <div className="relative flex-grow-1 h-full">
                            <div className="flex-column relative chat-form">
                                <div className="flex-column justify-center items-center h-full">
                                    <span style={{ fontSize: "1rem", paddingTop: "1rem" }}>
                                        No messages found in this conversation
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SimpleCard >
            </div>
        </Fragment>
    )
}
export default NoMessage;