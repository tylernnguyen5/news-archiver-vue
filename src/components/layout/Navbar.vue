<template>
  <div class="navbar">
    <div class="navbar-fixed">
      <nav>
        <div class="nav-wrapper">
          <router-link class="brand-logo center" :to="{ name: 'Home' }">News Archiver App</router-link>
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
    }
}
</script>

<style scoped>

</style>