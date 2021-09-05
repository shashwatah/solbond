<script>
  import MainForm from "./forms/MainForm.svelte";
  import RegisterForm from "./forms/RegisterForm.svelte";
  import ValidateForm from "./forms/ValidateForm.svelte";

  import { activeForm, registerData, validateData } from './../store.js';

  const handleFormSubmit = (type) => {
    console.log("Event: Form Submit");
    if(type === "register") {
      console.log($registerData);
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
    margin-top: 50px;
  }
</style>
