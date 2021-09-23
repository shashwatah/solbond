import { snackbarController } from './snackbar.controller';

const errors = {
    GenericError: { message: 'Something went wrong', type: 'error' },
    BadName: { message: 'Name does not match criteria', type: 'warning' },
    BadPubkey: { message: 'Public key does not match criteria', type: 'warning' },
    DuplicateKey: { message: 'Duplicate key entered', type: 'warning' },
    BadColor: { message: "There's something wrong with the color input", type: 'warning' },
    TransactionError: { message: 'Transaction resulted in an error', type: 'error'},
    RegisterError: { message: 'Something went wrong while registering the solbond', type: 'error'},
    ValidateError: { message: 'Something went wrong while validating the solbond', type: 'error'}
};

export const generateError = (type) => {
    let err = new Error();
    (err.name = type), (err.message = errors[type].message);
    return err;
};

export const handleError = (err) => {
    if (!err.name in errors || errors[err.name].type === "error") console.error(err);

    if (err.name in errors) return snackbarController(errors[err.name].type, err.message);

    snackbarController(errors['GenericError'].type, errors['GenericError'].message);
};
