<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import SearchBar from './SearchBar.svelte';
    import WalletBtn from './WalletBtn.svelte';

    export let navbarActionsNeeded;
    export let showSidebarBtn;

    const toggleSidebar = () => dispatch('toggle-sidebar');
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
        {#if !showSidebarBtn}
            <div id="navbar-actions-container">
                <SearchBar isSidebarBtn={false} />
                <WalletBtn isSidebarBtn={false} />
            </div>
        {:else}
            <svg
                id="sidebar-toggle-btn"
                on:click={toggleSidebar}
                viewBox="0 0 100 80"
                width="30"
                height="30"
            >
                <rect width="100" height="20" rx="10" />
                <rect y="30" width="100" height="20" rx="10" />
                <rect y="60" width="100" height="20" rx="10" />
            </svg>
        {/if}
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

    #sidebar-toggle-btn {
        position: relative;
        float: right;
        top: 22px;
        cursor: pointer;
    }

    #sidebar-toggle-btn rect {
        border-radius: 10px;
    }

    @media (max-width: 1300px) {
        #navbar {
            width: calc(100% - 100px);
        }
    }
</style>
