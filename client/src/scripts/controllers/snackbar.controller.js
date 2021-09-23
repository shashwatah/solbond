let fileData = '';

const typeSpecificData = {
    standard: {
        backgroundColor: 'rgb(13, 7, 5)',
        duration: 3000,
        showAction: false,
    },
    success: {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        duration: 3000,
        showAction: false,
    },
    error: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        duration: 3000,
        showAction: false,
    },
    warning: {
        backgroundColor: 'rgba(238, 210, 2, 0.5)',
        duration: 3000,
        showAction: false,
    },
    loading: {
        backgroundColor: 'rgba(238, 210, 2, 0.5)',
        duration: 30000,
        showAction: false,
    },
    'success-register': {
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        duration: 1800000,
        showAction: true,
        actionText: 'SAVE',
        actionTextColor: 'rgba(13, 7, 51, 0.7)',
        onActionClick: function (ele) {
            const a = document.createElement('a');
            const file = new Blob([fileData], { type: 'text/plain' });

            a.href = URL.createObjectURL(file);
            a.download = 'solbond_data.txt';
            a.click();

            URL.revokeObjectURL(a.href);

            ele.style.opacity = 0;

            snackbarController("success", "Solbond data was saved!")
        },
    },
};

export const snackbarController = (type, text, data = null) => {
    const standardConfig = { text, customClass: 'snackbar' };

    const snackbarConfig = Object.assign(standardConfig, typeSpecificData[type]);

    fileData = data !== null ? data : fileData;

    Snackbar.show(snackbarConfig);
};
