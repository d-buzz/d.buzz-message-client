import React from 'react';
import { Card, withStyles } from "@material-ui/core";

const CardGray = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        borderRadius: 0
    }
}))(Card);

const SimpleCard = ({ children, title = "", subtitle = "" }) => {
    return (
        <CardGray elevation={6} className="h-100vh">
            { title !== "" && (<div className="card-title">{title}</div>)}
            { subtitle !== "" && (<div className="card-subtitle mb-24">{subtitle}</div>)}
            {children}
        </CardGray>
    );
}
export default SimpleCard;