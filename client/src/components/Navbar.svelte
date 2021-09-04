<script>
import { onMount } from 'svelte';

  import WalletBtn from './WalletBtn.svelte';

  export let walletNeeded;
</script>

<div id="navbar">
  <a href="/"
    ><p id="navbar-title">
      <img
        src="assets/images/solbond-logo.png"
        type="image/png"
        id="navbar-title-icon"
        draggable="false"
        alt="sobond-logo"
      />solbond
    </p>
  </a>

  {#if walletNeeded}
    <WalletBtn />
  {/if}
</div>

<style>
  #navbar {
    position: relative;
    top: 0px;
    left: 0px;
    height: 75px;
    width: 100%;
    z-index: 1;
  }

  #navbar-title {
    position: relative;
    float: left;
    color: #0d0533;
    font-size: 30px;
    left: 200px;
    top: 10px;
    font-family: "Lato", sans-serif;
    font-weight: bold;
  }

  #navbar-title-icon {
    margin-right: 10px;
    height: 35px;
  }

  #navbar-title > #navbar-title-icon {
    vertical-align: middle;
  }
</style>
