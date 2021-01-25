import React from "react";
import logo from "../../../images/logo.png"


const Brand = (props) => {
    const { children } = props
    return (
        <div className="flex flex-middle flex-space-between brand-area">
            <div className="flex flex-middle brand">
                <img src={logo} alt="company-logo" />
                <span className="brand__text">HivePM</span>
            </div>
            {children}
        </div>
    )
}

export default Brand;