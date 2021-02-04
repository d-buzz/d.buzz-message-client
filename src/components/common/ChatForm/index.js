import React, { useState } from "react"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, TextField, withStyles } from "@material-ui/core"
import SendIcon from '@material-ui/icons/Send';
import { ChatSubmitOptionsModal } from "./../../../components";
import { broadcastNotification } from "./../../../store/interfaces/actions";

const SendButton = withStyles((theme) => ({
    root: {
        backgroundColor: "#e51c34",
        width: "50px",
        height: "50px",
        fontSize: "0.875rem",
        minWidth: 0,
        padding: 0,
        minHeight: "36px",
        borderRadius: "50%",
        "&:hover": {
            backgroundColor: '#b5091d'
        }
    },
}))(Button);

const ChatTextField = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderRadius: "25px",
            },
        },

    },
}))(TextField);

const ChatForm = (props) => {
    const { broadcastNotification } = props
    const [openChatOptions, setOpenChatOptions] = useState(false)
    const [message, setMessage] = useState(null)

    const handleClickChatOptionsDialog = () => {
        if (message) {
            setOpenChatOptions(!openChatOptions)
        } else {
            broadcastNotification(
                "error",
                "Please write a message first..."
            );
        }

    }

    const handleChangeInput = (e) => {
        const { target } = e;
        const { id, value } = target;
        if (id === "message") {
            setMessage(value)
        }
    }

    return (
        <React.Fragment>
            <div className="flex items-center chat-textbox">
                <ChatTextField
                    id="message"
                    variant="outlined"
                    margin="normal"
                    placeholder="Write a message..."
                    value={message}
                    onChange={handleChangeInput}
                    fullWidth
                    multiline
                    error={false}
                    autoFocus
                    focused
                />
                <div className="pl-2">
                    <SendButton size="large" onClick={handleClickChatOptionsDialog}>
                        <SendIcon />
                    </SendButton>
                </div>
            </div>
            <ChatSubmitOptionsModal
                open={openChatOptions}
                handleClose={handleClickChatOptionsDialog}
                message={message}
                handleChangeMessage={handleChangeInput} />
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            broadcastNotification,
        },
        dispatch
    ),
});

export default connect(null, mapDispatchToProps)(ChatForm);
