import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  clusterApiUrl
} from "@solana/web3.js";

import BN from "bn.js";
import { SOLBOND_ACCOUNT_DATA_LAYOUT } from "./layout";

import binary from 'bops';

import { get } from 'svelte/store';
import { wallet } from './../store';
 
const clusterUrl = clusterApiUrl("testnet")
const connection = new Connection(clusterUrl, "singleGossip");

export const initSolbond = async (
  spouse1Name,
  spouse2Name,
  spouse2KeyString,
  spouse1SoulColor,
  timestamp,
  solbondProgramIDString
) => {
	const spouse2Key = new PublicKey(spouse2KeyString);
	const solbondProgramID = new PublicKey(solbondProgramIDString)

	let solbondAccount = new Keypair();
	console.log(solbondAccount.publicKey.toString());

	// console.log(spouse2Key, spouse2Key.publicKey, solbondAccount, solbondAccount.publicKey, get(wallet).public);

	console.log(get(wallet), solbondAccount)

	const createSolbondAccount = SystemProgram.createAccount({
		space: SOLBOND_ACCOUNT_DATA_LAYOUT.span,
		lamports: await connection.getMinimumBalanceForRentExemption(SOLBOND_ACCOUNT_DATA_LAYOUT.span, 'singleGossip'),
		fromPubkey: get(wallet).publicKey,
		newAccountPubkey: solbondAccount.publicKey,
		programId: solbondProgramID
	});

	console.log(createSolbondAccount, SOLBOND_ACCOUNT_DATA_LAYOUT.span);
	console.log(await connection.getMinimumBalanceForRentExemption(SOLBOND_ACCOUNT_DATA_LAYOUT.span, 'singleGossip'));

	let spouse1Name_utf8 = [...binary.from(spouse1Name)];
	let spouse1NameBN = new BN(spouse1Name_utf8.reverse()).toArray("le");

	let spouse2Name_utf8 = [...binary.from(spouse2Name)];
	let spouse2NameBN = new BN(spouse2Name_utf8.reverse()).toArray("le", 25);

	let spouse1SoulColor_utf8 = [...binary.from(spouse1SoulColor.substring(1))];
	let spouse1SoulColorBN = new BN(spouse1SoulColor_utf8.reverse()).toArray("le", 6);

	let timestampBN = new BN(timestamp).toArray("le", 8);

	const initSolbondTx = new TransactionInstruction({
		programId: solbondProgramID,
		keys: [
			{pubkey: get(wallet).publicKey, isSigner: true, isWritable: false},
			{pubkey: spouse2Key, isSigner: false, isWritable: false},
			{pubkey: solbondAccount.publicKey, isSigner: false, isWritable: true},
			{pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
		],
		data: Uint8Array.of(0, ...spouse1NameBN, ...spouse2NameBN, ...spouse1SoulColorBN, ...timestampBN)
	});

	const tx = new Transaction().add(createSolbondAccount, initSolbondTx);

	console.log(tx);

	let { blockhash } = await connection.getRecentBlockhash();
	tx.recentBlockhash = blockhash;

	tx.feePayer = get(wallet).publicKey;	

	await tx.sign([solbondAccount]);

	let signed = await get(wallet).signTransaction(tx);


	// let signed2 = await signed.sign([solbondAccount]);
	// console.log(signed2)

	let txid = await connection.sendRawTransaction(signed.serialize());
	
	return(`tx confirmed, id: ${txid}`);
};
