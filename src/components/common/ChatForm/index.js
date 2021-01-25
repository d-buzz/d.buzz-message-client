import React from "react"
// import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Fab,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

// const useStyles = makeStyles((theme) => ({

// }))

const ChatForm = (props) => {
    // const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ChatForm
