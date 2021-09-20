<script>
  import MainForm from "./forms/MainForm.svelte";
  import RegisterForm from "./forms/RegisterForm.svelte";
  import ValidateForm from "./forms/ValidateForm.svelte";

  import { activeForm, registerData, validateData } from './../store.js';

  import { registerSolbond } from '../scripts/transactions/register.transaction.js';
  import { validateSolbond } from '../scripts/transactions/validate.transaction.js';

  const handleFormSubmit = async (type) => {
    console.log("Event: Form Submit");
    if(type === "register") {
      let result = await registerSolbond();
      console.log(result);
    } else {
      let result = await validateSolbond();
      console.log(result);
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
    <ValidateForm on:validate-form-submit={() => {handleFormSubmit("validate")}}/>
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
  }
</style>
