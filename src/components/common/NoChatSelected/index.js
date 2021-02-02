import React, { Fragment } from 'react';
import { SimpleCard } from "./../../../components/elements";
import { ChatContainer } from "./../../../components";
import ChatIcon from '@material-ui/icons/Chat';

const NoChatSelected = (props) => {
    return (
        <Fragment>
            <div className="relative flex-grow-1">
                <SimpleCard>
                    <div className="relative flex h-full">
                        <div className="relative flex-grow-1 h-full">
                            <div className="flex-column relative chat-form">
                                <ChatContainer>
                                    <div className="flex-column justify-center items-center h-full">
                                        <div className="h-220 w-220 rounded elevation-z6 bg-chat flex justify-center items-center">
                                            <ChatIcon style={{ fontSize: "4rem" }} />
                                        </div>
                                        <span style={{ fontSize: "1.2rem", paddingTop: "1rem" }}>Welcome to HivePM</span>
                                        <p>Select a contact to start messaging.</p>
                                    </div>
                                </ChatContainer>
                            </div>
                        </div>
                    </div>
                </SimpleCard >
            </div>
        </Fragment>
    )
}
export default NoChatSelected;