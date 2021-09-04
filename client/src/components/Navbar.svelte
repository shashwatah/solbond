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

  <div id="wallet-container">
    <input type="button" id="wallet-btn" value="Connect Wallet" />
  </div>
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

  #navbar > a > #navbar-title,
  #navbar > #wallet-container {
    vertical-align: middle;
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

  #wallet-container {
    position: relative;
    float: right;
    background: white;
    right: 200px;
    top: 35px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 5px;
  }

  #wallet-container:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  #wallet-btn {
    height: 50px;
    width: 150px;
    color: #0d0533;
    background: none;
    border: 0px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
