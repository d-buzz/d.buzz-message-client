import React from "react"
import { Button, TextField, withStyles } from "@material-ui/core"
import SendIcon from '@material-ui/icons/Send';

const SendButton = withStyles((theme) => ({
    root: {
        backgroundColor: "#e51c34",
        width: "56px",
        height: "56px",
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
                borderColor: 'gray',
            },
        },
    },
}))(TextField);

const ChatForm = (props) => {

    return (
        <React.Fragment>
            <div className="flex items-center chat-textbox">
                <ChatTextField
                    variant="outlined"
                    margin="normal"
                    placeholder="Write a message..."
                    fullWidth
                    focused />
                <div className="pl-2">
                    <SendButton size="large">
                        <SendIcon />
                    </SendButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatForm
