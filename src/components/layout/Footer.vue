<template>
  <footer class="page-footer">
    <div class="footer container">
      <!-- FIXME: Add push pull -->
      <div class="row"> 
        <div class="col s3"><span class="flow-text">tylernnguyen5</span></div>

        <div class="col s2"><span class="flow-text">
          <a href="https://www.linkedin.com/in/tyler-nguyen-484721151/">
            <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />
          </a>

          <a href="https://github.com/tylernnguyen5">
            <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg"  />
          </a>
        </span></div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.footer a{
  filter: invert(96%) sepia(96%) saturate(0%) hue-rotate(66deg) brightness(103%) contrast(107%);
}
</style>