import type { Commitment } from "@solana/web3.js";

export interface GenericData {
    [key: string]: string;
}

export interface ConnectionConfig extends GenericData {
    endpoint: string, 
    commitent: Commitment
}

export interface RegisterData extends GenericData {
    name: string;
    spouseName: string;
    spousePubkeyString: string;
    soulColor: string;
}

export interface ValidateData extends GenericData {
    solbondPubkeyString: string;
    soulColor: string;
}
