import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';

import type Wallet from '@project-serum/sol-wallet-adapter';
import BN from 'bn.js';
import binary from 'bops';

import { get } from 'svelte/store';
import { wallet, validateData } from '../../store/store';
import { connectionConfig, programID} from '../../store/env.store';

import { SOLBOND_ACCOUNT_DATA_LAYOUT, SolbondLayout } from '../utils/solbond.layout';
import type { ConnectionConfig, ValidateData } from '../utils/general.interfaces';

import { snackbarController } from '../controllers/snackbar.controller';

const connectionConfigRef: ConnectionConfig = get(connectionConfig)
const connection: Connection = new Connection(connectionConfigRef.endpoint, connectionConfigRef.commitent);

export const validateSolbond = async () => {
    const walletRef: Wallet = get(wallet);
    const validateDataRef: ValidateData = get(validateData);

    const programIDRef: string = get(programID);
    const solbondProgramID: PublicKey = new PublicKey(programIDRef);

    const solbondAccountPubkey: PublicKey = new PublicKey(validateDataRef.solbondPubkeyString);

    const instruction = validateSolbondInstruction(
        walletRef.publicKey,
        solbondAccountPubkey,
        solbondProgramID,
        validateDataRef.soulColor
    );

    const transaction: Transaction = new Transaction().add(instruction);

    let { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    transaction.feePayer = walletRef.publicKey;
    4;

    let signedTransaction: Transaction = await walletRef.signTransaction(transaction);

    snackbarController("loading", "Sending Transaction...");

    let transactionSig = await connection.sendRawTransaction(signedTransaction.serialize());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await connection.confirmTransaction(transactionSig);

    const encodedSolbondState = (await connection.getAccountInfo(
        solbondAccountPubkey,
        'singleGossip'
    ))!.data;

    const decodedSolbondState = SOLBOND_ACCOUNT_DATA_LAYOUT.decode(
        encodedSolbondState
    ) as SolbondLayout;

    return `Solbond Validated: ${decodedSolbondState.validity2}`;
};

const validateSolbondInstruction = (
    walletPubkey: PublicKey,
    solbondAccountPubkey: PublicKey,
    solbondProgramID: PublicKey,
    soulColor: string
): TransactionInstruction => {
    const spouse2SoulColor_utf8 = [...binary.from(soulColor.substring(1))];
    const spouse2SoulColorBN = new BN(spouse2SoulColor_utf8.reverse()).toArray('le', 6);

    const transactionInstruction: TransactionInstruction = new TransactionInstruction({
        programId: solbondProgramID,
        keys: [
            { pubkey: walletPubkey, isSigner: true, isWritable: false },
            { pubkey: solbondAccountPubkey, isSigner: false, isWritable: true },
        ],
        data: binary.from([1, ...spouse2SoulColorBN]),
    });

    return transactionInstruction;
};
