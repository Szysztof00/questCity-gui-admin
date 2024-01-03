<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Narzędzia główne</div>
          <router-link class="nav-link" to="/create">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-plus"></i></div>
            Stwórz grę
          </router-link>
          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts"
            aria-expanded="false" aria-controls="collapseLayouts">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>
            Zarządzaj grami
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link to="/editGames" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-pen-to-square"></i></div>
                Edytuj gry
              </router-link>
              <router-link to="/addUser" class="nav-link">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-trash"></i></div>
                Usuń gry
              </router-link>

            </nav>
          </div>

          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseEditUsers"
            aria-expanded="false" aria-controls="collapseEditUsers">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-user"></i></div>
            Zarządzaj użytkownikami
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseEditUsers" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <router-link to="/addUser" class="nav-link">
                Współdzielenie gier
              </router-link>
              <router-link to="/editUsers" class="nav-link">
              
                Edytuj użytkowników
              </router-link>
              <router-link to="/" class="nav-link">
                Zmień uprawnienia
              </router-link>

            </nav>
          </div>



          <div class="sb-sidenav-menu-heading">Pozostałe</div>
          <router-link class="nav-link" to="/about">
            <div class="sb-nav-link-icon"><i class="fa-regular fa-square-plus"></i></div>
            Nowe funkcje
          </router-link>

          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-file"></i></div>
            Regulamin
          </a>
          <a class="nav-link" href="#">
            <div class="sb-nav-link-icon"><i class="fa-solid fa-address-card"></i></div>
            O aplikacji
          </a>
        </div>
      </div>



      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        <span class="usersRole">Administrator</span>
      </div>
    </nav>
  </div>
</template>
<script setup>
</script>

<style scoped>
.sb-sidenav {
  font-family: 'Montserrat', sans-serif;
}

.nav-link>.collapsed {
  background-color: red;

}

.sb-sidenav-footer {
  position: sticky;
  bottom: 0;
  background-color: #09243a;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.5);

}

#layoutSidenav_nav {
  margin-top: 50px;
  width: 100%;
  min-height: 100vh;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
}

.nav-link:hover {
  color: white !important;
}

.user_information {
  color: rgba(255, 255, 255, 0.8);
}</style>