const textLight = {
    primary: "rgba(74, 70, 109, 0.87)",
    secondary: "rgba(74, 70, 109, 0.54)",
    disabled: "rgba(74, 70, 109, 0.38)",
    hint: "rgba(74, 70, 109, 0.38)"
};

const themeColors = {
    light: {
        palette: {
            type: "light",
            primary: {
                main: "#ffffff",
                contrastText: textLight.primary
            },
            secondary: {
                main: "#7467ef",
                contrastText: textLight.primary
            },
            text: textLight
        }
    },
    dark: {
        palette: {
            type: "dark",
            primary: {
                main: "#ffffff",
                contrastText: "#262e35"
            },
            secondary: {
                main: "#e51c34",
                contrastText: textLight.primary
            },
            background: {
                paper: "#262e35",
                default: "#303841"
            }
        }
    },
};

export default themeColors;