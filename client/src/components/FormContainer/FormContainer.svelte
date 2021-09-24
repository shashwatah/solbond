<script>
  import FormIndex from "./FormIndex.svelte";
  import Form from "./Form.svelte";

  import { registerSolbond } from "../../scripts/transactions/register.transaction";
  import { validateSolbond } from "../../scripts/transactions/validate.transaction";
  import { snackbarController } from "../../scripts/controllers/snackbar.controller";

  import { activeForm } from "./../../store/store";
  import {
    generateError,
    handleError,
  } from "../../scripts/controllers/error.controller";

  const handleFormSubmit = async (data) => {
    console.log(`Event: Form Submit; Form-Type: ${data.detail}`);

    let result;
    
    try {
      if (data.detail === "register") {
        result = await registerSolbond();
        snackbarController("success-register", "Solbond Registered! Save Solbond data", result);
      } else {
        result = await validateSolbond();
        snackbarController("success", "Solbond Validated!");
      }
    } catch (err) {
      handleError(generateError("TransactionError"));
    }

    console.log(`Transaction-Result: ${result}`);

    $activeForm = "index";
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
