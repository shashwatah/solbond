<div id="footer">
    <p id="footer-text">
        powered by
        <a href="https://www.solana.com"
            ><img
                id="footer-logo"
                src="assets/images/solana-logo.webp"
                type="image/webp"
                draggable="false"
                alt="solana-logo"
            /></a
        >
    </p>
</div>

<style>
    #footer {
        position: fixed;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        height: 75px;
        width: calc(100% - 400px);
    }

    #footer-text {
        position: relative;
        font-size: 16px;
        font-weight: bold;
        font-family: 'Lato', sans-serif;
        color: #0d0533;
        float: right;
    }

    #footer-logo {
        position: relative;
        float: right;
        height: 30px;
        top: -5px;
        left: 5px;
    }

    @media (max-width: 1300px) {
        #footer {
            width: calc(100% - 100px);
        }
    }
</style>
