export interface GenericData {
    [key: string]: string
}

export interface RegisterData extends GenericData {
    name: string
    spouseName: string
    spousePubkeyString: string
    soulColor: string
}

export interface ValidateData extends GenericData {
    solbondPubkeyString: string
    soulColor: string
}
