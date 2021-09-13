<script>
  import { onMount, getContext } from "svelte";
  import Navbar from "./../components/Navbar.svelte";
  import Footer from "./../components/Footer.svelte";
  import FormContainer from "./../components/FormContainer.svelte";

  // import { wallet, walletConnected, registerData, validateData } from './../store';

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

  // let walletConnectedInternal;
  // walletConnected.subscribe(value => walletConnectedInternal = value);

  // const handleFormSubmit = (e) => {
  //   console.log("form submit", e.detail);
  //   if(e.detail === "register") {
  //     console.log($registerData);
  //   } else {
  //     console.log($validateData);
  //   }
  // }

</script>

<div id="main-container">
  <Navbar navbarBtnsNeeded={true} />

  <FormContainer />
  <!-- on:form-submit={handleFormSubmit} -->
  
  <Footer />
</div>

<style>
</style>
