<script>
  import FormIndex from "./FormIndex.svelte";
  import Form from "./Form.svelte";

  import { registerSolbond } from "../../scripts/transactions/register.transaction.js";
  import { validateSolbond } from "../../scripts/transactions/validate.transaction.js";

  import { activeForm, registerData } from "./../../store.js";

  const handleFormSubmit = async (data) => {
    console.log(`Event: Form Submit; Form-Type: ${data.detail}`);

    const result =
      data.detail === "register"
        ? await registerSolbond()
        : await validateSolbond();

    console.log(`Transaction-Result`, result);
  };
</script>

<div id="form-container">
  {#if $activeForm === "index"}
    <FormIndex />
  {:else}
    <Form type={$activeForm} on:form-submit={handleFormSubmit} />
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
