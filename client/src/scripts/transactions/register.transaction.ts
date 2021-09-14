import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";

import BN from "bn.js";
import { SOLBOND_ACCOUNT_DATA_LAYOUT, SolbondLayout} from "../utils/layout";

import binary from 'bops';

import { get } from 'svelte/store';
import { wallet, registerData } from '../../store';

const connection = new Connection("http://localhost:8899", "singleGossip");

export const registerSolbond = async () => { 
	const walletInstance: any = get(wallet);
	const registerDataInstance: any = get(registerData)

	const spouse2Key = new PublicKey(registerDataInstance.spouse2KeyString);
	const solbondProgramID = new PublicKey("437pvxJrLfiZefAR3skQGrPZe7nXzPrJ4SMMnmhfkSav");

	let solbondAccount = new Keypair();
	console.log(solbondAccount.publicKey.toString());

	console.log(walletInstance, solbondAccount)

	const createSolbondAccount = SystemProgram.createAccount({
		space: SOLBOND_ACCOUNT_DATA_LAYOUT.span,
		lamports: await connection.getMinimumBalanceForRentExemption(SOLBOND_ACCOUNT_DATA_LAYOUT.span, 'singleGossip'),
		fromPubkey: walletInstance.publicKey,
		newAccountPubkey: solbondAccount.publicKey,
		programId: solbondProgramID
	});

	console.log(createSolbondAccount, SOLBOND_ACCOUNT_DATA_LAYOUT.span);
	console.log(await connection.getMinimumBalanceForRentExemption(SOLBOND_ACCOUNT_DATA_LAYOUT.span, 'singleGossip'));

	let spouse1Name_utf8 = [...binary.from(registerDataInstance.spouse1Name)];
	let spouse1NameBN = new BN(spouse1Name_utf8.reverse()).toArray("le", 25);

	let spouse2Name_utf8 = [...binary.from(registerDataInstance.spouse2Name)];
	let spouse2NameBN = new BN(spouse2Name_utf8.reverse()).toArray("le", 25);

	let spouse1SoulColor_utf8 = [...binary.from(registerDataInstance.spouse1SoulColor.substring(1))];
	let spouse1SoulColorBN = new BN(spouse1SoulColor_utf8.reverse()).toArray("le", 6);

	let timestampBN = new BN(Date.now()).toArray("le", 8);

	const initSolbondTx = new TransactionInstruction({
		programId: solbondProgramID,
		keys: [
			{pubkey: walletInstance.publicKey, isSigner: true, isWritable: false},
			{pubkey: spouse2Key, isSigner: false, isWritable: false},
			{pubkey: solbondAccount.publicKey, isSigner: false, isWritable: true},
			{pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
		],
		data: binary.from([0, ...spouse1NameBN, ...spouse2NameBN, ...spouse1SoulColorBN, ...timestampBN])
	});

	const tx = new Transaction().add(createSolbondAccount, initSolbondTx);

	console.log(tx);

	let { blockhash } = await connection.getRecentBlockhash();
	tx.recentBlockhash = blockhash;

	tx.feePayer = walletInstance.publicKey;	

	// Making tsc ignore an error here, since the syntax is in fact right
	// Error: Argument of type 'Keypair[]' is not assignable to parameter of type 'Signer'. Type 'Keypair[]' is missing the following properties from type 'Signer': publicKey, secretKey
	// @ts-ignore
	await tx.sign([solbondAccount]);

	let signed = await walletInstance.signTransaction(tx);

	let txid = await connection.sendRawTransaction(signed.serialize());
	
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const encodedSolbondState = (await connection.getAccountInfo(solbondAccount.publicKey, 'singleGossip'))!.data;
    const decodedSolbondState = SOLBOND_ACCOUNT_DATA_LAYOUT.decode(encodedSolbondState) as SolbondLayout;
    return {
		txID: txid,
        solbondAccountPubkey: solbondAccount.publicKey.toBase58(),
        isInitialized: !!decodedSolbondState.isInitialized,
        spouse1Pubkey: new PublicKey(decodedSolbondState.spouse1Pubkey).toBase58(),
        spouse2Pubkey: new PublicKey(decodedSolbondState.spouse2Pubkey).toBase58(),
		spouse1Name: new TextDecoder().decode(decodedSolbondState.spouse1Name),
		spouse2Name: new TextDecoder().decode(decodedSolbondState.spouse2Name),
		spouse1SoulColor: new TextDecoder().decode(decodedSolbondState.spouse1SoulColor),
		spouse2SoulColor: new TextDecoder().decode(decodedSolbondState.spouse2SoulColor),
        timestamp: new BN(decodedSolbondState.timestamp, 10, "le").toNumber()
    }
};
