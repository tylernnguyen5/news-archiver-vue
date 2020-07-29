<template>
  <div class="navbar">
    <nav class="">
        <div class="container">
            <router-link class="brand-logo center" :to="{ name: 'Home' }">News Archiver App</router-link>
        </div>
    </nav>
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

<style>

</style>