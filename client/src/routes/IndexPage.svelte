<script>
  import { onMount } from "svelte";
  import Navbar from "./../components/Navbar.svelte";
  import FormContainer from "./../components/FormContainer/FormContainer.svelte";
  import Footer from "./../components/Footer.svelte";

  onMount(() => {
    VANTA.FOG({
      el: "#main-container",
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
  <Navbar navbarActionsNeeded={true} />

  <FormContainer />
  
  <Footer />
</div>

<style>
</style>
