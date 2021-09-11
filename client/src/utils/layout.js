import * as BufferLayout from 'buffer-layout';

const publicKey = (property = "publicKey") => {
    return BufferLayout.blob(32, property);
};

const uint64 = (property = "uint64") => {
    return BufferLayout.blob(8, property);
};

const name = (property = "name") => {
    return BufferLayout.blob(25, property);
}

const soulColor = (property = "soulColor") => {
    return BufferLayout.blob(6, property);
}

export const SOLBOND_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8("isInitialized"),
    BufferLayout.u8("validity1"),
    BufferLayout.u8("validity2"),
    publicKey("spouse1Pubkey"),
    publicKey("spouse2Pubkey"),
    name("spouse1Name"),
    name("spouse2Name"),
    soulColor("spouse1SoulColor"),
    soulColor("spouse2SoulColor"),
    uint64("timestamp"),
]);

// export interface SolbondLayout {
//     isInitialized: number,
//     initializerPubkey: Uint8Array,
//     initializerReceivingTokenAccountPubkey: Uint8Array,
//     initializerTempTokenAccountPubkey: Uint8Array,
//     expectedAmount: Uint8Array
// }