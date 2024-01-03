<template><nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
  <!-- Navbar Brand-->
  <a class="navbar-brand ps-3" href="#"><img class="logo" src="/src/assets/QuestCity.png"></a>
  <!-- Sidebar Toggle-->
  <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
  <!-- Navbar Search-->
  <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    <div class="input-group">
      <input class="form-control" type="text" placeholder="Szukaj..." aria-label="Szukaj..." aria-describedby="btnNavbarSearch" />
      <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
    </div>
  </form>
  <!-- Navbar-->
  <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="#">Ustawienia</a></li>
        <li><a class="dropdown-item" href="#">Wyloguj się</a></li>
      </ul>
    </li>
  </ul>
</nav>

</template>

<style scoped>
.logo{
  height:30px
}

.bg-dark{
  background-color: #09243a !important;

}
.sb-topnav {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.5);
  position: fixed;
  top:0;
  width: 100%;
  font-family: 'Montsterrat',sans-serif;
}
#btnNavbarSearch{
  background-color: #12456e;
}

#btnNavbarSearch.btn.btn-primary{
  border:1px solid white;
}

#sidebarToggle, .nav-link.dropdown-toggle{
  color:white !important;
}

#sidebarToggle, .nav-link.dropdown-toggle:hover{
  color:rgba(255,255,255,0.5 ) !important;
}


</style>