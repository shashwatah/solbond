<script>
    import Wallet from '@project-serum/sol-wallet-adapter';

    import { wallet, walletConnected, activeForm } from './../store.js';

    let providerUrl = 'https://www.sollet.io';
    
    let walletBtnValue = "Connect Wallet"

    const WalletController = async () => {    
        if($walletConnected === false) {
            initWallet();
            await $wallet.connect();
        } else {
            await $wallet.disconnect();
        }
    }

    const initWallet = () => {
        $wallet = new Wallet(providerUrl);

        $wallet.on('connect', handleWalletConnect);
        
        $wallet.on('disconnect', handleWalletDisconnect);
    }

    const handleWalletConnect = async (pubKey) => {
        if($walletConnected === false) {
            $walletConnected = true;
            let pubKeyString = await pubKey.toBase58();
            walletBtnValue = pubKeyString.substring(0, 4) + '...' + pubKeyString.substring(pubKeyString.length - 4);
            console.log(`Wallet Connected, PubKey: ${pubKeyString}`);
        }
    }

    const handleWalletDisconnect = () => {
        if($walletConnected === true) {
            $walletConnected = false;
            $activeForm = "main";
            walletBtnValue = "Connect Wallet";
            console.log("Wallet Disconnected");
        }
    }
</script>

<input type="button" id="connect-wallet-btn" bind:value={walletBtnValue} on:click={WalletController}/>

<style>
  #connect-wallet-btn {
    position: relative;
    background: #0d0533;
    border-radius: 5px;
    height: 50px;
    width: 150px;
    color: white;
    border: 0px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  #connect-wallet-btn:hover {
    background: rgba(13, 5, 51, 0.8);
  }
</style>