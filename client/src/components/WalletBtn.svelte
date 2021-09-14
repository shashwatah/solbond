<script>
    import { toggleWallet } from './../scripts/controllers/wallet.controller';
    import { walletBtnValue } from './../store';

    const walletBtnController = async () => await toggleWallet();
</script>

<input type="button" id="connect-wallet-btn" bind:value={$walletBtnValue} on:click={walletBtnController}/>

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
</style>