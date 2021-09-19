import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import type Wallet from "@project-serum/sol-wallet-adapter";
import BN from "bn.js";
import binary from "bops";

import { get } from "svelte/store";
import { wallet, registerData } from "../../store";

import {
  SOLBOND_ACCOUNT_DATA_LAYOUT,
  SolbondLayout,
} from "../utils/solbond.layout";
import type { RegisterData } from "../utils/general.interface";

const connection: Connection = new Connection(
  "http://localhost:8899",
  "singleGossip"
);

export const registerSolbond = async () => {
  const walletRef: Wallet = get(wallet);
  const registerDataRef: RegisterData = get(registerData);

  const solbondProgramID: PublicKey = new PublicKey(
    "437pvxJrLfiZefAR3skQGrPZe7nXzPrJ4SMMnmhfkSav"
  );

  let solbondAccount: Keypair = new Keypair();

  const instruction1: TransactionInstruction =
    await createSolbondAccountInstruction(
      walletRef.publicKey,
      solbondAccount.publicKey,
      solbondProgramID
    );

  const instruction2: TransactionInstruction = registerSolbondInstruction(
    walletRef.publicKey,
    solbondAccount.publicKey,
    registerDataRef,
    solbondProgramID
  );

  const transaction: Transaction = new Transaction().add(
    instruction1,
    instruction2
  );

  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;

  transaction.feePayer = walletRef.publicKey;

  // Making tsc ignore an error here, since the syntax is in fact right
  // Error: Argument of type 'Keypair[]' is not assignable to parameter of type 'Signer'. Type 'Keypair[]' is missing the following properties from type 'Signer': publicKey, secretKey
  // @ts-ignore
  await transaction.sign([solbondAccount]);
  let signedTransaction: Transaction = await walletRef.signTransaction(
    transaction
  );

  let transactionSig = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const transactionConfirmation = await connection.confirmTransaction(
    transactionSig
  );

  if (transactionConfirmation.context.slot) {
    const encodedSolbondState = (await connection.getAccountInfo(
      solbondAccount.publicKey,
      "singleGossip"
    ))!.data;

    const decodedSolbondState = SOLBOND_ACCOUNT_DATA_LAYOUT.decode(
      encodedSolbondState
    ) as SolbondLayout;

    return {
      transactionSig,
      isInitialized: decodedSolbondState.isInitialized,
      solbondAccount: solbondAccount.publicKey.toBase58()
    };
  } else {
    return "Encountered an error while sending transaction";
  }
};

const createSolbondAccountInstruction = async (
  walletPubkey: PublicKey,
  solbondAccountPubkey: PublicKey,
  solbondProgramID: PublicKey
): Promise<TransactionInstruction> => {
  const transactionInstruction: TransactionInstruction =
    SystemProgram.createAccount({
      space: SOLBOND_ACCOUNT_DATA_LAYOUT.span,
      lamports: await connection.getMinimumBalanceForRentExemption(
        SOLBOND_ACCOUNT_DATA_LAYOUT.span,
        "singleGossip"
      ),
      fromPubkey: walletPubkey,
      newAccountPubkey: solbondAccountPubkey,
      programId: solbondProgramID,
    });

  return transactionInstruction;
};

const registerSolbondInstruction = (
  walletPubkey: PublicKey,
  solbondAccountPubkey: PublicKey,
  registerData: RegisterData,
  solbondProgramID: PublicKey
): TransactionInstruction => {
  const spousePubkey: PublicKey = new PublicKey(registerData.spousePubkey);

  const spouse1Name_utf8 = [...binary.from(registerData.name)];
  const spouse1NameBN = new BN(spouse1Name_utf8.reverse()).toArray("le", 25);

  const spouse2Name_utf8 = [...binary.from(registerData.spouseName)];
  const spouse2NameBN = new BN(spouse2Name_utf8.reverse()).toArray("le", 25);

  const spouse1SoulColor_utf8 = [
    ...binary.from(registerData.color.substring(1))
  ];
  const spouse1SoulColorBN = new BN(spouse1SoulColor_utf8.reverse()).toArray(
    "le",
    6
  );

  let timestampBN = new BN(Date.now()).toArray("le", 8);

  const transactionInstruction: TransactionInstruction =
    new TransactionInstruction({
      programId: solbondProgramID,
      keys: [
        { pubkey: walletPubkey, isSigner: true, isWritable: false },
        { pubkey: spousePubkey, isSigner: false, isWritable: false },
        { pubkey: solbondAccountPubkey, isSigner: false, isWritable: true },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      ],
      data: binary.from([
        0,
        ...spouse1NameBN,
        ...spouse2NameBN,
        ...spouse1SoulColorBN,
        ...timestampBN,
      ]),
    });

  return transactionInstruction;
};
