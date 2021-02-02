import React from 'react';
import { Button, makeStyles } from "@material-ui/core";
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa'


const useStyles = makeStyles((theme) => ({
    browserExtension: {
        borderColor: 'red !important',
        '&:hover': {
            color: '#e61b33 !important',
            backgroundColor: 'pink !important',
        },
    },
}));

const HiveKeychainInstall = (props) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <center><h6 className={classes.label}>Install Hive Keychain</h6>
                <Button
                    classes={{ root: classes.browserExtension }}
                    variant="outlined"
                    startIcon={<FaChrome />}
                    href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep?hl=en"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Chrome
                    </Button>
                <Button
                    classes={{ root: classes.browserExtension }}
                    variant="outlined"
                    style={{ marginLeft: 15 }}
                    startIcon={<FaFirefoxBrowser />}
                    href="https://addons.mozilla.org/en-US/firefox/addon/hive-keychain/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Firefox
                    </Button>
            </center>
        </React.Fragment>
    )
}
export default HiveKeychainInstall;