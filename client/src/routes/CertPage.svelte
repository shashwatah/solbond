<script>
    import { onMount } from 'svelte';

    import Navbar from './../components/Navbar.svelte';
    import Certificate from './../components/Certificate.svelte';

    import { queryController } from './../scripts/controllers/query.controller';
    import { handleError } from '../scripts/controllers/error.controller';
    import { snackbarController } from '../scripts/controllers/snackbar.controller';

    export let params;
    let certificateData = null;

    onMount(() => {
        const effect = VANTA.FOG({
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

        snackbarController('loading', 'Querying...');

        queryController(params.query)
            .then((data) => {
                snackbarController('success', 'Data Retrieved');

                certificateData = {
                    spouse1Name: data.spouse1Name.replace('\x00', ''),
                    spouse2Name: data.spouse2Name.replace('\x00', ''),
                    timestamp: new Date(data.timestamp).toUTCString(),
                };

                effect.setOptions({
                    highlightColor: parseInt(data.spouse1SoulColor, 16),
                    lowlightColor: parseInt(data.spouse2SoulColor, 16),
                });
            })
            .catch((err) => handleError(err));
    });
</script>

<div id="main-container">
    <Navbar navbarActionsNeeded={false} showSidebarBtn={false} />

    <Certificate {certificateData} />
</div>
