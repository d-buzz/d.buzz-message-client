import React from "react";
import logo from "../../../images/hivepm_brand_white.png"
import { useHistory } from 'react-router-dom'

const Brand = (props) => {
    const { children } = props
    const history = useHistory()

    const gotoHome = () => {
        history.push("/")
    }

    return (
        <div onClick={gotoHome} className="flex flex-middle flex-space-between brand-area cursor-pointer">
            <div className="flex flex-middle brand">
                <img src={logo} alt="company-logo" />
            </div>
            {children}
        </div>
    )
}

export default Brand;