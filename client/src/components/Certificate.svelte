<script>
</script>

<fieldset id="certificate">
    <p class="cert-text" id="cert-header">This is to certify that,</p>
    <p id="cert-names">
        <span class="name" id="spouse1name">Han Solo </span> and
        <span class="name" id="spouse2name">Leia Organa</span>
    </p>
    <p class="cert-text">were united in holy matrimony</p>
    <p id="time-line">
        on <span class="time">4th Sept, 2021</span> at <span class="time">3:19 PM</span>
    </p>
    <p id="cert-footer">
        01110100 01101001 01101100 01101100 00100000 01100100 01100101 01100001 01110100 01101000
        00100000 01100100 01101111 00100000 01110101 01110011 00100000 01110000 01100001 01110010
        01110100
    </p>
</fieldset>

<style>
    #certificate {
        position: relative;
        float: none;
        height: 500px;
        width: calc(100% - 400px);
        margin: auto;
        position: relative;
        text-align: center;
        margin-top: 50px;
        border-radius: 7px;
        background: rgba(255, 255, 255, 0.3);
        border: 0px;
        font-family: 'Lato', sans-serif;
    }

    .cert-text {
        font-size: 30px;
        /* font-weight: bold; */
    }

    #cert-header {
        margin-top: 125px;
        margin-bottom: 40px;
    }

    #cert-names {
        margin-top: -20px;
        font-size: 35px;
        word-spacing: 10px;
    }

    .name {
        font-size: 45px;
        font-weight: bold;
        font-style: italic;
        word-spacing: normal;
    }

    #time-line {
        margin-top: 35px;
        font-size: 25px;
        word-spacing: 5px;
    }

    .time {
        font-size: 27px;
        font-weight: bold;
        word-spacing: normal;
    }

    #cert-footer {
        position: relative;
        margin-top: 110px;
        font-size: 10px;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.3);
        word-spacing: 2px;
    }
</style>
