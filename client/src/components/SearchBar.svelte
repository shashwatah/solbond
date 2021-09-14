<form method="GET" action="/cert">
  <input class="navbar-action" id="search-bar" type="text" name="search" placeholder="Search.." />
</form>

<style>
  #search-bar {
    position: relative;
    height: 50px;
    width: 85px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(180%) blur(10px);
    border: 0px;
    color: #0d0533;
    background-image: url("../assets/images/search.webp");
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
    font-family: "Lato", sans-serif;
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
</style>
