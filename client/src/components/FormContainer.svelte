<script>
  import MainForm from "./forms/MainForm.svelte";
  import RegisterForm from "./forms/RegisterForm.svelte";
  import ValidateForm from "./forms/ValidateForm.svelte";

  import { activeForm, wallet, registerData, validateData } from './../store.js';

  import { initSolbond } from './../utils/registerTransaction.js';

  const handleFormSubmit = async (type) => {
    let solbondProgramIDString = "437pvxJrLfiZefAR3skQGrPZe7nXzPrJ4SMMnmhfkSav";
    console.log("Event: Form Submit");
    if(type === "register") {
      let result = await initSolbond($registerData.name, $registerData.spouseName, $registerData.spousePubkey, $registerData.color, Date.now(), solbondProgramIDString);
      console.log(result);
    } else {
      console.log($validateData);
    }
    $activeForm="main";
  };
</script>

<div id="form-container">
  {#if $activeForm === "main"}
    <MainForm />
  {:else if $activeForm === "register"}
    <RegisterForm on:register-form-submit={() => {handleFormSubmit("register")}}/>
  {:else}
    <ValidateForm />
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
    margin-top: 65px;
    transition: 1s linear;
  }
</style>
