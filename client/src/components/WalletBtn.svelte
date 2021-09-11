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

<div id="wallet-container">
  <input type="button" id="wallet-btn" bind:value={walletBtnValue} on:click={WalletController}/>
</div>

<style>
    #wallet-container {
    position: relative;
    float: right;
    background: white;
    right: 200px;
    top: 35px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 5px;
  }

  #wallet-container:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  #wallet-btn {
    height: 50px;
    width: 150px;
    color: #0d0533;
    background: none;
    border: 0px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
</style>