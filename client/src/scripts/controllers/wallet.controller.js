import Wallet from '@project-serum/sol-wallet-adapter';

import { get } from 'svelte/store';
import { wallet, walletConnected, activeForm, walletBtnValue } from './../../store.js';

export const toggleWallet = async (providerUrl = "https://www.sollet.io") => {
    if (!get(walletConnected)) {
        initWallet(providerUrl);
        await get(wallet).connect();
    } else {
        await get(wallet).disconnect();
    }
}

const initWallet = (providerUrl) => {
    wallet.set(new Wallet(providerUrl));

    wallet.update(wallet => wallet.on("connect", handleWalletConnect));

    wallet.update(wallet => wallet.on("disconnect", handleWalletDisconnect));
}

const handleWalletConnect = async (pubKey) => {
    walletConnected.set(true);

    let pubKeyString = await pubKey.toBase58();
    walletBtnValue.set(pubKeyString.substring(0, 4) + '...' + pubKeyString.substring(pubKeyString.length - 4));
    
    console.log(`Wallet Connected, PubKey: ${pubKeyString}`);
}

const handleWalletDisconnect =  () => {
    walletConnected.set(false);
    walletBtnValue.set("Connect");
    activeForm.set("index");

    console.log("Wallet Disconnected");
}   