<script>
    export let isSidebarBtn;
    let extraClass = isSidebarBtn ? "sidebar-btn" : "";
</script>

<form method="GET" action="/cert">
    <input class="navbar-action {extraClass}" id="search-bar" type="text" name="search" placeholder="Search.." />
</form>

<style>
    #search-bar {
        position: relative;
        height: 48px;
        width: 85px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: saturate(180%) blur(10px);
        border: 0px;
        color: #0d0533;
        background-image: url('../assets/images/search.webp');
        background-position: 14px 15px;
        background-repeat: no-repeat;
        background-size: 22.5px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
        color: #0d0533;
        font-size: 16px;
        font-weight: bold;
        padding-left: 45px;
        padding-right: 20px;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        margin-right: 25px;
    }

    #search-bar::placeholder {
        color: rgba(13, 5, 51, 0.5);
    }

    #search-bar:hover {
        background-color: rgba(255, 255, 255, 0.7);
    }

    #search-bar:focus {
        background-color: rgba(255, 255, 255, 0.7);
        width: 375px;
    }

    .sidebar-btn {
        background: white !important;      
        background-image: url('../assets/images/search.webp') !important;
        background-position: 20px 25px !important;
        background-repeat: no-repeat !important;
        background-size: 27.5px !important;
        height: 75px !important;
        width: calc(100% - 77.5px) !important;
        font-size: 20px !important;
        padding-left: 57.5px !important;
        margin-top: 25px !important;
        margin: 0px !important;
    }

    .sidebar-btn::focus {
        width: calc(100% - 77.5px) !important;
    }
</style>
