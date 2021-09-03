<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    const back = () => dispatch("back");

    let data = {
        solbondAddress: "",
        color: "Choose a color"
    };

    const colorChange = () => {
        data.color = document.getElementById("soul-color").value;
        document.getElementById("soul-color-text").style.color = data.color;
    }
</script>

<div id="form-container">
    <div id="form">
        <button on:click={back}>back</button>
        <div class="form-page">
            <p class="form-page-title">Enter Solbond address</p>
            <input type="text" class="form-page-input" placeholder="Solbond Address" maxlength="44">
        </div>
        <!-- <div class="form-page">
            <p class="form-page-title">Choose a color for your soul</p>
            <input type="text" class="form-page-input" id="soul-color-text" bind:value={data.color} disabled/>
            <input type="color" id="soul-color" class="form-page-input" on:input={colorChange}/>
        </div> -->
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

    .form-page {
        position: relative;
        height: 70%;
        width: 70%;
        text-align: left;
        margin: auto;
        top: 15%;
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
        width: calc(100% - 100px);
        background: rgba(255,255,255,0.7);
        border: 0px;
        font-family: "Lato", sans-serif;
        font-weight: bold;
        font-size: 18px;
        border-radius: 7px;
        color: #0d0533;
        padding-left: 20px;
        padding-right: -20px;
        letter-spacing: 1.5px;
    }

    .form-page-input::placeholder {
        color: lightgrey;
    }

    #soul-color-text {
        width: calc(100% - 200px);
        float: left;
        color: lightgrey;
    }

    #soul-color {
        width: 85px;
        margin-left: 15px;
        float: left;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    button {
        float: left;
    }
</style>