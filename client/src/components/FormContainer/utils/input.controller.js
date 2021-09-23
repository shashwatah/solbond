import { get } from 'svelte/store';
import { wallet } from '../../../store';

import { generateError } from '../../../scripts/controllers/error.controller';

export const validateInput = (type, data) => {
    if (type === 'register') {
        if (!validateName(data.name) || !validateName(data.spouseName))
            throw generateError('BadName');
        if (!validatePubkey(data.spousePubkeyString)) throw generateError('BadPubkey');
        if (get(wallet).publicKey.toBase58() === data.spousePubkeyString)
            throw generateError('DuplicateKey');
        if (!validateSoulColor(data.soulColor)) throw generateError('BadColor');
    } else {
        if (!validatePubkey(data.solbondPubkeyString)) throw generateError('BadPubkey');
        if (get(wallet).publicKey.toBase58() === data.solbondPubkeyString)
            throw generateError('DuplicateKey');
        if (!validateSoulColor(data.soulColor)) throw generateError('BadColor');
    }
};

const validateName = (name) => name.length > 0 && name.length <= 25;

const validatePubkey = (pubkey) => pubkey.length > 0 && pubkey.length <= 44;

const validateSoulColor = (color) => (color.length > 0) & (color.length <= 7);
