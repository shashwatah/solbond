<script>
    import { toggleWallet } from './../scripts/controllers/wallet.controller';
    import { walletBtnValue } from './../store';

    const walletBtnController = async () => await toggleWallet();
</script>

<button id="connect-wallet-btn" on:click={walletBtnController}>
  <img src="assets/images/wallet.webp" type="image/webp" id="connect-wallet-btn-ico" draggable="false" alt="wallet"/>
  <span>{$walletBtnValue}</span>
</button>

<style>
  #connect-wallet-btn {
    position: relative;
    background: #0d0533;
    backdrop-filter: saturate(180%) blur(10px);
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

  #connect-wallet-btn > img,
  #connect-wallet-btn > span {
    vertical-align: middle;
  }

  #connect-wallet-btn-ico {
    position: relative;
    height: 20px;
    margin-right: 7px;
  }
</style>