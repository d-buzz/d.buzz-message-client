import React from 'react'
import { renderRoutes } from 'react-router-config'
import { createUseStyles } from 'react-jss'
import NotificationBox from "../../../components/common/NotificationBox"

const useStyles = createUseStyles({
    main: {
        maxWidth: 'max-content',
        margin: '0 auto',
    },
})

const AppFrame = (props) => {
    const { route } = props
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.main}>
                {renderRoutes(route.routes)}
            </div>
            <NotificationBox />
        </React.Fragment>
    );
}

export default AppFrame;