const errors = {
    BadName: { message: 'Name does not match criteria', type: 'warning' },
    BadPubkey: { message: "Spouse's Public Key does not match criteria", type: 'warning' },
    DuplicateKey: { message: 'Duplicate key entered', type: 'warning' },
    BadColor: { message: "There's something wrong with the color input", type: 'warning' },
}

export const generateError = (type, subtype) => {}

export const handleError = () => {}
