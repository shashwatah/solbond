<script>

</script>

<input id="search-bar" type="text" name="search" placeholder="Search..">

<style>
    #search-bar {
        position: relative;
        height: 40px;
        width: 125px;
        background-color: rgba(255,255,255,0.5);
        border: 0px;
        color: #0d0533;
        background-image: url("../assets/images/search.png");
        background-position: 12px 10px;
        background-repeat: no-repeat;
        background-size: 25px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
        color: #0d0533;
        font-size: 16px;
        font-weight: bold;
        margin-top: 5px;
        margin-left: 200px;
        padding-left: 45px;
        padding-right: 20px;
        border-radius: 5px;
        font-family: "Lato", sans-serif;
        /* letter-spacing: 1.5px; */
    }

    #search-bar::placeholder { 
        color: rgba(13,5,51,0.5);
    }

    #search-bar:hover {
        background-color: rgba(255,255,255,0.7)
    }    

    #search-bar:focus {
        background-color: rgba(255,255,255,0.7);
        width: 415px;
    }
</style>