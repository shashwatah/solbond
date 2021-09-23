import { snackbarController } from "./snackbar.controller";

const errors = {
    BadName: { message: 'Name does not match criteria', type: 'warning' },
    BadPubkey: { message: "Public key does not match criteria", type: 'warning' },
    DuplicateKey: { message: 'Duplicate key entered', type: 'warning' },
    BadColor: { message: "There's something wrong with the color input", type: 'warning' },
}

export const generateError = (type) => {
    let err = new Error();
    err.name = type,
    err.message = errors[type].message;
    return err;
}

export const handleError = (err) => snackbarController(errors[err.name].type, err.message);
