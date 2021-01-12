import React from 'react'
import { renderRoutes } from 'react-router-config'
import { createUseStyles } from 'react-jss'
import { Container } from '@material-ui/core';

const useStyles = createUseStyles({
    main: {
        maxWidth: 'max-content',
        width: 'max-content',
        margin: '0 auto',
    },
})

const AppFrame = (props) => {
    const { route } = props
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container>
                <div className={classes.main}>
                    {renderRoutes(route.routes)}
                </div>
            </Container>
        </React.Fragment>
    );
}

export default AppFrame;