<script setup>
import topNavbar from '../src/components/topNavbar.vue'
import leftMenu from '../src/components/leftMenu.vue'
import Footer from '../src/components/footer.vue'
</script>

<template>
  <topNavbar></topNavbar>
  <div id="layoutSidenav">
    <leftMenu></leftMenu>
    <div id="layoutSidenav_content">
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>

</template>

<style scoped>
router-view{
  margin-top: 10px;
}
</style>

