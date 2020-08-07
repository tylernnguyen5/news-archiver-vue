<template>
  <div class="navbar">
    <div class="navbar-fixed">
      <nav>
        <div class="container">
          <div class="nav-wrapper">
            <!-- Logo -->
            <router-link class="brand-logo center" :to="{ name: 'Home' }">News Archiver App</router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    },
    mounted() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    }
}
</script>

<style>

</style>