<script>
  import MainForm from "./Forms/MainForm.svelte";
  import RegisterForm from "./Forms/RegisterForm.svelte";
  import ValidateForm from "./Forms/ValidateForm.svelte";

  let form = "main";

  const formBtnClick = (e) => (form = e.detail);
  const back = (e) => (form = "main");
</script>

<div id="form-container">
  {#if form === "main"}
    <MainForm on:main-form-btn-click={formBtnClick} />
  {:else if form === "register"}
    <RegisterForm on:back={back} />
  {:else}
    <ValidateForm on:back={back} />
  {/if}
</div>

<style>
  #form-container {
    float: none;
    height: 500px;
    width: calc(100% - 400px);
    margin: auto;
    position: relative;
    text-align: center;
    margin-top: 50px;
  }
</style>
