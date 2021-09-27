import { Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import { generateError } from './../controllers/error.controller';

import { get } from 'svelte/store';
import { connectionConfig } from '../../store/env.store';

import { SOLBOND_ACCOUNT_DATA_LAYOUT, SolbondLayout } from '../utils/solbond.layout';
import type { ConnectionConfig } from '../utils/general.interfaces';

const connectionConfigRef: ConnectionConfig = get(connectionConfig);
const connection: Connection = new Connection(
    connectionConfigRef.endpoint,
    connectionConfigRef.commitent
);

export const queryController = async (query: string) => {
    let encodedSolbondState, decodedSolbondState;
    try {
        const solbondAccountPubkey: PublicKey = new PublicKey(query);

        encodedSolbondState = (await connection.getAccountInfo(
            solbondAccountPubkey,
            connectionConfigRef.commitent
        ))!.data;

        decodedSolbondState = SOLBOND_ACCOUNT_DATA_LAYOUT.decode(
            encodedSolbondState
        ) as SolbondLayout;
    } catch (err) {
        throw generateError('QueryError');
    }

    if (!!decodedSolbondState.validity2) {
        return {
            spouse1Name: new TextDecoder().decode(decodedSolbondState.spouse1Name),
            spouse2Name: new TextDecoder().decode(decodedSolbondState.spouse2Name),
            spouse1SoulColor: new TextDecoder().decode(decodedSolbondState.spouse1SoulColor),
            spouse2SoulColor: new TextDecoder().decode(decodedSolbondState.spouse2SoulColor),
            timestamp: new BN(decodedSolbondState.timestamp, 10, 'le').toNumber(),
        };
    } else {
        throw generateError('SolbondInvalid');
    }
};
