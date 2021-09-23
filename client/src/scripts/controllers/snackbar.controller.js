const typeSpecificData = {
    standard: {
        backgroundColor: 'rgb(13, 7, 51)',
        duration: 3000,
        showAction: false,
    },
    success: {
        backgroundColor: 'rgba(0, 255, 0, 0.5',
        duration: 3000,
        showAction: false,
    },
    error: {
        backgroundColor: 'rgba(255, 0, 0, 0.5',
        duration: 3000,
        showAction: false,
    },
    warning: {
        backgroundColor: 'rgba(238, 210, 2, 0.5)',
        duration: 3000,
        showAction: false,
    },
};

export const snackbarController = (type, text) => {
    const standardConfig = { text, customClass: 'snackbar' };

    const snackbarConfig = Object.assign(standardConfig, typeSpecificData[type]);

    Snackbar.show(snackbarConfig);
};
