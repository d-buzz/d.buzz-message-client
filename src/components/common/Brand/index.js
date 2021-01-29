import React from "react";
import logo from "../../../images/logo.png"
import { NavLink } from "react-router-dom";


const Brand = (props) => {
    const { children } = props
    return (
        <div className="flex flex-middle flex-space-between brand-area cursor-pointer">
            <div className="flex flex-middle brand">
                <NavLink to="/chats">
                    <img src={logo} alt="company-logo" />
                    <span className="brand__text">HivePM</span>
                </NavLink>
            </div>
            {children}
        </div>
    )
}

export default Brand;