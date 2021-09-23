import {
    Keypair,
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js'

import type Wallet from '@project-serum/sol-wallet-adapter'
import BN from 'bn.js'
import binary from 'bops'

import { get } from 'svelte/store'
import { wallet, validateData } from '../../store'

import { SOLBOND_ACCOUNT_DATA_LAYOUT, SolbondLayout } from '../utils/solbond.layout'
import type { ValidateData } from '../utils/general.interfaces'

const connection: Connection = new Connection('http://localhost:8899', 'singleGossip')

export const validateSolbond = async () => {
    const walletRef: Wallet = get(wallet)
    const validateDataRef: ValidateData = get(validateData)

    const solbondProgramID: PublicKey = new PublicKey(
        '437pvxJrLfiZefAR3skQGrPZe7nXzPrJ4SMMnmhfkSav'
    )

    const solbondAccountPubkey: PublicKey = new PublicKey(validateDataRef.solbondPubkeyString)

    const instruction = validateSolbondInstruction(
        walletRef.publicKey,
        solbondAccountPubkey,
        solbondProgramID,
        validateDataRef.soulColor
    )

    const transaction: Transaction = new Transaction().add(instruction)

    let { blockhash } = await connection.getRecentBlockhash()
    transaction.recentBlockhash = blockhash

    transaction.feePayer = walletRef.publicKey
    4

    let signedTransaction: Transaction = await walletRef.signTransaction(transaction)

    let transactionSig = await connection.sendRawTransaction(signedTransaction.serialize())

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const transactionConfirmation = await connection.confirmTransaction(transactionSig)

    if (transactionConfirmation.context.slot) {
        const encodedSolbondState = (await connection.getAccountInfo(
            solbondAccountPubkey,
            'singleGossip'
        ))!.data

        const decodedSolbondState = SOLBOND_ACCOUNT_DATA_LAYOUT.decode(
            encodedSolbondState
        ) as SolbondLayout

        return `Solbond Validated: ${decodedSolbondState.validity2}`
    } else {
        return 'Encountered an error while sending transaction'
    }
}

const validateSolbondInstruction = (
    walletPubkey: PublicKey,
    solbondAccountPubkey: PublicKey,
    solbondProgramID: PublicKey,
    soulColor: string
): TransactionInstruction => {
    const spouse2SoulColor_utf8 = [...binary.from(soulColor.substring(1))]
    const spouse2SoulColorBN = new BN(spouse2SoulColor_utf8.reverse()).toArray('le', 6)

    const transactionInstruction: TransactionInstruction = new TransactionInstruction({
        programId: solbondProgramID,
        keys: [
            { pubkey: walletPubkey, isSigner: true, isWritable: false },
            { pubkey: solbondAccountPubkey, isSigner: false, isWritable: true },
        ],
        data: binary.from([1, ...spouse2SoulColorBN]),
    })

    return transactionInstruction
}
