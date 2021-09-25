<script>
    import { onMount } from 'svelte';
    import Navbar from './../components/Navbar.svelte';
    import Sidebar from '../components/Sidebar.svelte';
    import FormContainer from './../components/FormContainer/FormContainer.svelte';
    import Footer from './../components/Footer.svelte';

    let widthThreshold = window.innerWidth > 670 ? true : false;
    let sidebarHidden = true;

    window.addEventListener('resize', (e) => widthThreshold = window.innerWidth < 670 ? false : true);

    const toggleSidebar = () => {
      sidebarHidden = !sidebarHidden;
    };

    onMount(() => {
        VANTA.FOG({
            el: '#main-container',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x9ec1eb,
            midtoneColor: 0xbd87b4,
            lowlightColor: 0xea8083,
            baseColor: 0xeeedee,
            blurFactor: 0.7,
            speed: 1.5,
            zoom: 1.4,
        });
    });
</script>

<div id="main-container">
    <Navbar
        navbarActionsNeeded={true}
        showSidebarBtn={!widthThreshold}
        on:toggle-sidebar={toggleSidebar}
    />

    <Sidebar {sidebarHidden} on:toggle-sidebar={toggleSidebar}/>

    <FormContainer />

    {#if widthThreshold}
        <Footer />
    {/if}
</div>

<style>
    :global(.snackbar) {
        border-radius: 5px;
        margin-left: 200px;
    }

    :global(.snackbar p) {
        font-family: 'Lato', sans-serif !important;
        font-weight: bold !important;
    }

    :global(.snackbar button) {
        font-family: 'Lato', sans-serif !important;
        font-weight: bold !important;
        background: rgba(255, 255, 255, 0.7) !important;
        border-radius: 4px !important;
        padding: 5px 10px 5px 10px !important;
        letter-spacing: 1.2px;
    }

    @media (max-width: 640px) {
        :global(.snackbar) {
            margin-left: 0px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
</style>
