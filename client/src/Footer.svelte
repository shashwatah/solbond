<script>
  import SearchBar from './SearchBar.svelte';
</script>

<div id="footer">
    <SearchBar />

    <p id="footer-text">
      powered by
      <a href="https://www.solana.com"
        ><img
          id="footer-logo"
          src="assets/images/solana-logo.png"
          type="image/png"
          draggable="false"
          alt="solana-logo"
        /></a
      >
    </p>
</div>

<style>
  #footer {
    position: fixed;
    height: 75px;
    width: 100%;
    left: 0px;
    bottom: 0px;
  }

  #footer-text {
    position: relative;
    font-size: 16px;
    font-weight: bold;
    font-family: "Lato", sans-serif;
    color: #0d0533;
    float: right;
    right: 200px;
  }

  #footer-logo {
    position: relative;
    float: right;
    height: 30px;
    top: -5px;
    left: 5px;
  }
</style>
