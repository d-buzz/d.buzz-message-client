import React, { useState } from 'react'
import { 
  Container,
  Typography,
  TextField,
  Button,
  withStyles
} from '@material-ui/core'
import md5 from 'md5'
import config from './../../../config'

const { PASSWORD_PROTECTED, PASSWORD_PROTECTED_KEY } = config

console.log({ PASSWORD_PROTECTED })

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    height: '100vh',
    textAlign: 'center',
    width: '100%',
    '& h5': { paddingTop: 50 },
    '& button' : { marginTop: 15, textTransform: 'uppercase' },
    '& p': { color: 'red' },
  },
  field: {
    marginTop: 10,
  }
});

const PasswordWall = (props) => {
  const { classes, children } = props
  
  const [failed, setFailed] = useState(false)
  const [passcode, setPasscode] = useState()
  const [disabled, setDisabled] = useState(PASSWORD_PROTECTED)

  const onChange = (e) => {
    if(e.keyCode === 13) {
      submit()
    } else {
      setPasscode(e.target.value)
      setFailed(false)
    }
  }

  const submit = () => {
    const match = md5(passcode) === PASSWORD_PROTECTED_KEY
    setFailed(!match)
    setDisabled(!match)
  }

  return (
    <React.Fragment>
      {disabled && (
        <div className={classes.root} size="md">
          <Container maxWidth="sm">
            <Typography variant="h5">Welcome to Hive.pm</Typography>
            <Typography variant="h6">Please enter password to participate in beta testing</Typography>
            <TextField 
              className={classes.field}
              onChange={onChange}
              onKeyDown={onChange}
              value={passcode}
              type="password"
              label="Passcode"
              variant="outlined"
              fullWidth 
            />
            {failed && <Typography component="p" variant="subtitle2">You've entered a wrong password, please try again</Typography>} 
            <Button onClick={submit} variant="contained" color="primary">
              Submit
            </Button>
          </Container>
        </div> 
      )}
      {!disabled && children}
    </React.Fragment>
  )
}

export default withStyles(styles)(PasswordWall)
