import React, { Fragment } from 'react';
import { SimpleCard } from "./../../../components/elements";
import ChatIcon from "@material-ui/icons/Chat";

const NoChatSelected = (props) => {
    return (
        <Fragment>
            <SimpleCard>
                <div className="relative flex h-full">
                    <div className="relative flex-grow-1 h-full">
                        <div className="flex-column relative chat-form">
                            <div className="flex-column justify-center items-center h-full">
                                <div className="h-220 w-220 rounded elevation-z6 bg-chat flex justify-center items-center">
                                    <ChatIcon style={{ fontSize: "4rem" }} />
                                </div>
                                <span style={{ fontSize: "1.2rem", paddingTop: "1rem" }}>Welcome to HIVE.PM</span>
                                <p>Select a contact to start messaging.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleCard >
        </Fragment>
    )
}
export default NoChatSelected;