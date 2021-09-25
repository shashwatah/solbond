<script>
    import { snackbarController } from '../../scripts/controllers/snackbar.controller';

    import { activeForm, walletConnected } from './../../store/store';

    const btnClick = (type) => {
        if ($walletConnected) {
            $activeForm = type;
        } else {
            snackbarController('warning', 'Connect your wallet to perform this action');
        }
    };
</script>

<p id="title">Matrimony of the future.</p>

<div id="btns-container">
    <div class="btn-container" id="register-btn-container">
        <button on:click={() => btnClick('register')} class="btn" id="register-btn">
            <img
                class="btn-ico"
                id="register-btn-ico"
                src="assets/images/register.webp"
                type="image/webp"
                draggable="false"
                alt="register-btn-ico"
            />
            <span>Register a Solbond</span>
        </button>
    </div>

    <div class="btn-container" id="validate-btn-container">
        <button on:click={() => btnClick('validate')} class="btn" id="validate-btn">
            <img
                class="btn-ico"
                id="validate-btn-ico"
                src="assets/images/validate.webp"
                type="image/webp"
                draggable="false"
                alt="register-btn-ico"
            />
            <span>Validate a Solbond</span>
        </button>
    </div>
</div>

<style>
    #title {
        position: relative;
        top: 125px;
        font-size: 75px;
        font-weight: bold;
        margin: auto;
        font-family: 'Lato', sans-serif;
        color: #0d0533;
    }

    #btns-container {
        position: relative;
        margin: auto;
        height: 75px;
        width: 65%;
        top: 150px;
        text-align: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #btns-container .btn-container {
        position: relative;
        height: 100%;
        width: calc(50% - 12.5px);
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: saturate(180%) blur(10px);
        border-radius: 5px;
        cursor: pointer;
    }

    #btns-container .btn-container:nth-child(2) {
        margin-left: 25px;
    }

    #btns-container .btn-container:hover {
        background: rgba(255, 255, 255, 0.7);
    }

    #btns-container .btn-container .btn {
        background: none;
        position: relative;
        height: 100%;
        width: 100%;
        border: 0px;
        font-size: 16px;
        color: #0d0533;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        cursor: pointer;
    }

    #btns-container .btn-container .btn > img,
    #btns-container .btn-container .btn > span {
        vertical-align: middle;
    }

    #btns-container .btn-container .btn .btn-ico {
        height: 25px;
        margin-right: 7px;
    }

    @media (max-width: 945px) {
        #title {
            font-size: 65px;
        }
    }

    @media (max-width: 800px) {
        #title {
            top: 50px;
            font-size: 55px;
        }

        #btns-container {
            width: 65%;
            top: 125px;
        }

        .btn-container {
            width: 100%;
            min-width: 100%;
        }

        #btns-container .btn-container:nth-child(2) {
            margin-left: 0px;
            margin-top: 25px;
        }
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 1024px) {
        #title {
            top: 75px;
            font-size: 45px;
        }

        #btns-container {
            width: 75%;
            top: 125px;
        }
    }
</style>
