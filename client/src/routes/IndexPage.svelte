<script>
    import { onMount } from 'svelte';
    import Navbar from './../components/Navbar.svelte';
    import Sidebar from '../components/Sidebar.svelte';
    import FormContainer from './../components/FormContainer/FormContainer.svelte';
    import Footer from './../components/Footer.svelte';

    export let params;
    console.log(`Params Passed: ${params}`);

    let widthThreshold = window.innerWidth > 670 ? true : false;
    let sidebarHidden = true;

    window.addEventListener(
        'resize',
        (e) => (widthThreshold = window.innerWidth < 670 ? false : true)
    );

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

    <Sidebar {sidebarHidden} on:toggle-sidebar={toggleSidebar} />

    <FormContainer />

    {#if widthThreshold}
        <Footer />
    {/if}
</div>
