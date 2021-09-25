<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import SearchBar from './SearchBar.svelte';
    import WalletBtn from './WalletBtn.svelte';

    export let sidebarHidden;

    const toggleSidebar = () => dispatch('toggle-sidebar');
</script>

<div id="sidebar" class={sidebarHidden ? 'hidden' : ''}>
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

    <div id="sidebar-actions-container">
        <SearchBar isSidebarBtn={true} />
        <WalletBtn isSidebarBtn={true} />
    </div>
</div>

<style>
    .hidden {
        display: none;
    }

    #sidebar {
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100%;
        width: 100%;
        z-index: 2;
        background: #0d0533;
    }

    #sidebar-toggle-btn {
        position: fixed;
        top: 48px;
        right: 50px;
        cursor: pointer;
    }

    #sidebar-toggle-btn rect {
        fill: white;
    }

    #sidebar-actions-container {
        position: relative;
        margin: auto;
        height: auto;
        width: 65%;
        top: 300px;
    }
</style>
