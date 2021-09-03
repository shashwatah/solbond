<script>
  import { onMount } from "svelte";
  import Navbar from "./Navbar.svelte";
  import Footer from "./Footer.svelte";
  import FormContainer from "./FormContainer.svelte";

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

//   let mainPage = true;
</script>

<div id="main-container">
  <Navbar />

  <FormContainer />

  <Footer />
</div>

<style>
</style>
