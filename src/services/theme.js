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
    },
    sidebarLeft: {
        backgroundColor: "white"
    },
    avatarMenu: {
        backgroundColor: "white"
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
    },
    sidebarLeft: {
        backgroundColor: "#36404a"
    },
    avatarMenu: {
        backgroundColor: "#313a43"
    }
}

export const getTheme = (mode) => {
    if (mode === 'dark') {
        return dark
    } else {
        return light
    }
}