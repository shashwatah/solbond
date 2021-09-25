<script>
    import { toggleWallet } from './../scripts/controllers/wallet.controller';
    import { walletBtnValue } from './../store/store';

    export let isSidebarBtn;
    let extraClass = isSidebarBtn ? "sidebar-btn" : "";

    const walletBtnController = async () => await toggleWallet();
</script>

<button id="connect-wallet-btn" class="{extraClass}" on:click={walletBtnController}>
    <img
        src="assets/images/wallet{isSidebarBtn ? "_sidebar" : ""}.webp"
        type="image/webp"
        id="connect-wallet-btn-ico"
        draggable="false"
        alt="wallet"
    />
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
        font-family: 'Lato', sans-serif;
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

    .sidebar-btn {
        background: white !important;
        color: #0d0533! important;
        height: 75px !important;
        width: 100% !important;
        font-size: 20px !important;
        margin-top: 40px !important;
    }

    .sidebar-btn #connect-wallet-btn-ico {
        height: 25px;
    }
</style>
