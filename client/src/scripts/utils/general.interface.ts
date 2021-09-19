export interface GenericData {
  [key: string]: string;
}

export interface RegisterData extends GenericData {
  name: string;
  spouseName: string;
  spousePubkey: string;
  color: string;
}

export interface ValidateData extends GenericData {
  solbondAccountPubkey: string;
  color: string;
}