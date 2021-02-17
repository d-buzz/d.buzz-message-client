import React from 'react';
import { Link } from "@material-ui/core";

const Copyright = (props) => {
    return (
        <small className="text-muted mb-0">
            © 2021{" "}
            <Link color="inherit" target="_blank" href="https://dataloft.llc">
                Dataloft, LLC
        </Link>{"."}
        </small>
    )
}
export default Copyright;