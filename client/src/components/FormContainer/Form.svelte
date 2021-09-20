<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { navController } from "./utils/nav.controller";
  import { inputValidation } from "./utils/input.controller";

  import { activeForm, registerData, validateData } from "./../../store.js";

  export let type;
  let data =
    type === "register"
      ? {
          name: "",
          spouseName: "",
          spousePubkeyString: "",
          soulColor: "Choose a color",
        }
      : {
          solbondPubkeyString: "",
          soulColor: "Choose a color",
        };

  const back = () => ($activeForm = "index");

  let pageIndex = 0;
  const navBtnClick = (btn) => {
    let pages = Array.from(document.getElementsByClassName("form-page"));
    let navBtns = Array.from(document.getElementsByClassName("nav-btn"));

    let navData = navController(btn, pageIndex, pages, navBtns);
    navData === "submit" ? submitForm() : (pageIndex = navData);
  };

  const colorChange = () => {
    data.soulColor = document.getElementById("soul-color").value;
    document.getElementById("soul-color-text").style.color = data.soulColor;
  };

  const submitForm = () => {
    let validation = inputValidation(type, data);
    if (validation.valid) {
        type === "register" ? ($registerData = data) : ($validateData = data);
        dispatch("form-submit", type);
    }else {
        alert(validation.message);
    }
  };
</script>

<div id="form-container">
  <div id="form">
    <button id="back-btn" on:click={back}
      ><img
        id="back-btn-ico"
        src="assets/images/back.webp"
        type="image/webp"
        alt="back-btn"
      /></button
    >
    {#if type === "register"}
      <div class="form-page">
        <p class="form-page-title">Enter your name</p>
        <input
          type="text"
          class="form-page-input"
          placeholder="Your Name (max length: 25)"
          maxlength="25"
          bind:value={data.name}
        />
      </div>
      <div class="form-page inactive">
        <p class="form-page-title">Enter your spouse's name</p>
        <input
          type="text"
          class="form-page-input"
          placeholder="Your Spouse's Name (max length: 25)"
          maxlength="25"
          bind:value={data.spouseName}
        />
      </div>
      <div class="form-page inactive">
        <p class="form-page-title">Enter your spouse's address</p>
        <input
          type="text"
          class="form-page-input"
          placeholder="Your Spouse's Public Key"
          maxlength="44"
          bind:value={data.spousePubkeyString}
        />
      </div>
      <div class="form-page inactive">
        <p class="form-page-title">Choose a color for your soul</p>
        <input
          type="text"
          class="form-page-input"
          id="soul-color-text"
          bind:value={data.soulColor}
          disabled
        />
        <input
          type="color"
          id="soul-color"
          class="form-page-input"
          on:input={colorChange}
        />
      </div>
    {:else}
      <div class="form-page">
        <p class="form-page-title">Enter Solbond address</p>
        <input
          type="text"
          class="form-page-input"
          placeholder="Solbond Address"
          maxlength="44"
          bind:value={data.solbondPubkeyString}
        />
      </div>
      <div class="form-page inactive">
        <p class="form-page-title">Choose a color for your soul</p>
        <input
          type="text"
          class="form-page-input"
          id="soul-color-text"
          bind:value={data.soulColor}
          disabled
        />
        <input
          type="color"
          id="soul-color"
          class="form-page-input"
          on:input={colorChange}
        />
      </div>
    {/if}
    <input
      type="button"
      value="Back"
      class="nav-btn hidden"
      id="back-nav"
      on:click={() => {
        navBtnClick("back");
      }}
    />
    <input
      type="button"
      value="Next"
      class="nav-btn"
      id="next-nav"
      on:click={() => {
        navBtnClick("next");
      }}
    />
  </div>
</div>

<style>
  #form-container {
    position: relative;
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 7px;
  }

  #form {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .inactive,
  .hidden {
    display: none;
  }

  .form-page {
    position: relative;
    height: 70%;
    width: 70%;
    text-align: left;
    margin: auto;
    top: 15%;
    /* background: blue; */
  }

  .form-page-title {
    position: relative;
    font-size: 35px;
    color: #0d0533;
    font-weight: bold;
    left: 50px;
    top: 85px;
  }

  .form-page-input {
    position: relative;
    left: 50px;
    top: 85px;
    height: 75px;
    width: calc(100% - 140px);
    background: rgba(255, 255, 255, 0.7);
    border: 0px;
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 18px;
    border-radius: 7px;
    color: #0d0533;
    padding: 5px 20px;
    letter-spacing: 1.5px;
  }

  .form-page-input::placeholder {
    color: lightgrey;
  }

  #soul-color-text {
    width: calc(100% - 240px);
    float: left;
    color: lightgrey;
  }

  #soul-color {
    width: 85px;
    margin-left: 15px;
    float: left;
    height: 85px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .nav-btn {
    position: relative;
    height: 35px;
    width: 75px;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    font-weight: bold;
    color: white;
    background: #0d0533;
    border: 0px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
  }

  #back-nav {
    float: left;
    margin-left: calc(15% + 50px);
  }

  #next-nav {
    float: right;
    margin-right: calc(15% + 50px);
  }

  #back-btn {
    position: relative;
    float: left;
    top: 25px;
    left: 25px;
    background: none;
    border: none;
    cursor: pointer;
  }

  #back-btn-ico {
    height: 25px;
  }
</style>
