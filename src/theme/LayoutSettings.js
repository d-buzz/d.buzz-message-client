import { createMuiTheme } from "@material-ui/core";
import { forEach, merge } from "lodash";
import themeColors from "./themeColors"
import themeOptions from "./themeOptions"

const createThemes = () => {
    let themes = {};

    forEach(themeColors, (value, key) => {
        themes[key] = createMuiTheme(merge({}, themeOptions, value));
    });
    return themes;
}

const LayoutSettings = {
    themes: createThemes(),
    activeTheme: "dark",
    perfectScrollbar: true,
    footer: {
        fixed: false,
        show: true,
        theme: "dark"
    },
    leftSidebar: {
        show: true,
        mode: 'full', // full, close, compact, mobile,
        theme: 'dark',
        bgOpacity: .96, // 0 ~ 1
        bgImgURL: '../assets/images/sidebar/sidebar-bg-dark.jpg'
    },
    topbar: {
        show: true,
        fixed: true,
        theme: 'dark'
    },
    secondarySidebar: {
        show: true,
        theme: "dark"
    },
}

export default LayoutSettings;