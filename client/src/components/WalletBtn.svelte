<div id="wallet-container">
  <input type="button" id="wallet-btn" value="Connect Wallet" />
</div>

<style>
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