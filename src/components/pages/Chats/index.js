import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from "@material-ui/core";
import { ChatMessages } from "./../../../components";
import { SimpleCard } from "./../../../components/elements";
import { setSelectedContact } from "./../../../store/chat/actions"

const styles = theme => ({});

const Chats = (props) => {
    const { match, setSelectedContact } = props
    const { params } = match
    const { username } = params

    useEffect(() => {
        if (username) {
            setSelectedContact({ username })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username])

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
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        setSelectedContact,
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(Chats)
)