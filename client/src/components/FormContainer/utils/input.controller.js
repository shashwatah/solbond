import { get } from 'svelte/store';
import { wallet } from "../../../store";

// This works but the code is awful, change it later

export const inputValidation = (type, data) => {
    if (type === "register") {
        if (!validateName(data.name) || !validateName(data.spouseName)) {
            return { valid: false, message: "Name does not match criteria"};
        }

        if (!validatePubkey(data.spousePubkeyString)) {
            return { valid: false, message: "Spouse's Public Key does not match criteria"};
        }

        if (get(wallet).publicKey.toBase58() === data.spousePubkeyString) {
            return { valid: false, message: "Your spouse's key cannot be the same as yours"};
        }

        if (!validateSoulColor(data.soulColor)) {
            return { valid: false, message: "There's something wrong with the color input"};
        }

        return { valid: true };
    } else {
        if (!validatePubkey(data.solbondPubkeyString)) {
            return { valid: false, message: "Solbond Address does not match criteria"};
        }

        if (get(wallet).publicKey.toBase58() === data.solbondPubkeyString) {
            return { valid: false, message: "Solbond address cannot be the same as your key"};
        }

        if (!validateSoulColor(data.soulColor)) {
            return { valid: false, message: "There's something wrong with the color input"};
        }
        
        return { valid: true };
    }
}

const validateName = (name) => name.length > 0 && name.length <= 25;

const validatePubkey = (pubkey) => pubkey.length > 0 && pubkey.length <= 44;

const validateSoulColor = (color) => color.length > 0 & color.length <= 7;
