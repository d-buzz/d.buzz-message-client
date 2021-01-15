const light = {
    typography: {
        fontFamily: 'Public Sans',
    },
    background: {
        primary: "#f7f7ff",
        secondary: "white"
    },
    fontColor: {
        main: "black",
        secondary: "#e51c34"
    },
    paper: {
        backgroundColor: "white"
    },
    message: {
        color: 'green !important',
    }
}

const dark = {
    typography: {
        fontFamily: 'Public Sans',
    },
    palette: {
        type: "dark",
    },
    background: {
        primary: '#303841',
    },
    fontColor: {
        main: "white",
        secondary: "#e51c34"
    },
    paper: {
        backgroundColor: "#262e35"
    },
    message: {
        color: 'lightgreen !important',
    }
}

export const getTheme = (mode) => {
    if (mode === 'dark') {
        return dark
    } else {
        return light
    }
}