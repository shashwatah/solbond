<script>
    import SearchBar from './SearchBar.svelte';
    import WalletBtn from './WalletBtn.svelte';

    export let navbarActionsNeeded;
</script>

<div id="navbar">
    <a href="/"
        ><p id="navbar-title">
            <img
                src="assets/images/solbond-logo.webp"
                type="image/webp"
                id="navbar-title-icon"
                draggable="false"
                alt="solbond-logo"
            />solbond
        </p>
    </a>

    {#if navbarActionsNeeded}
        <div id="navbar-actions-container">
            <SearchBar />
            <WalletBtn />
        </div>
    {/if}
</div>

<style>
    #navbar {
        position: relative;
        top: 25px;
        height: 75px;
        width: calc(100% - 400px);
        margin: auto;
        z-index: 1;
    }

    #navbar-title {
        position: relative;
        float: left;
        top: -12px;
        color: #0d0533;
        font-size: 30px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
    }

    #navbar-title-icon {
        margin-right: 10px;
        height: 35px;
    }

    #navbar-title > #navbar-title-icon {
        vertical-align: middle;
    }

    #navbar-actions-container {
        position: relative;
        height: auto;
        width: auto;
        display: flex;
        flex-direction: row;
        float: right;
        top: 12.5px;
    }

    @media (max-width: 1300px) {
        #navbar {
            width: calc(100% - 100px);
        }
    }
</style>
