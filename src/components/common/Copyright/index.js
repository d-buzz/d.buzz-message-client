import React from 'react';
import { Typography, Link } from "@material-ui/core";

const Copyright = (props) => {
    return (
        <Typography variant="body2" align="center">
            {"© 2021 "}
            <Link color="inherit" href="#">
                Dataloft, LLC
        </Link>{"."}
        </Typography>
    )
}
export default Copyright;