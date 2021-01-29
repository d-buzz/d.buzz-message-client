import React from 'react';
import { Link } from "@material-ui/core";

const Copyright = (props) => {
    return (
        <small className="text-muted mb-0">
            © 2021{" "}
            <Link color="inherit" href="/">
                Dataloft, LLC
        </Link>{"."}
        </small>
    )
}
export default Copyright;