import React, { Fragment } from 'react';
import { withStyles } from "@material-ui/core";
import { ChatList, ChatMessages } from "./../../../components";
import { SimpleCard } from "./../../../components/elements";

const styles = theme => ({});

const Chats = (props) => {

    return (
        <Fragment>
            <div className="relative flex-grow-1">
                <SimpleCard>
                    <div className="relative flex h-full">
                        <div className="relative flex-grow-1 h-full">
                            <ChatMessages />
                        </div>
                    </div>
                </SimpleCard >
            </div>
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(Chats);