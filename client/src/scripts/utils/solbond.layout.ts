import * as BufferLayout from 'buffer-layout';

const publicKey = (property = 'publicKey') => {
    return BufferLayout.blob(32, property);
};

const uint64 = (property = 'uint64') => {
    return BufferLayout.blob(8, property);
};

const name = (property = 'name') => {
    return BufferLayout.blob(25, property);
};

const soulColor = (property = 'soulColor') => {
    return BufferLayout.blob(6, property);
};

export const SOLBOND_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('isInitialized'),
    BufferLayout.u8('validity1'),
    BufferLayout.u8('validity2'),
    publicKey('spouse1Pubkey'),
    publicKey('spouse2Pubkey'),
    name('spouse1Name'),
    name('spouse2Name'),
    soulColor('spouse1SoulColor'),
    soulColor('spouse2SoulColor'),
    uint64('timestamp'),
]);

export interface SolbondLayout {
    isInitialized: number;
    validity1: number;
    validity2: number;
    spouse1Pubkey: Uint8Array;
    spouse2Pubkey: Uint8Array;
    spouse1Name: Uint8Array;
    spouse2Name: Uint8Array;
    spouse1SoulColor: Uint8Array;
    spouse2SoulColor: Uint8Array;
    timestamp: Uint8Array;
}
