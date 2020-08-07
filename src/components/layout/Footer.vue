<template>
  <footer class="page-footer">
    <div class="footer container">
      <div>
        <span class="name">
          Tyler Nguyen
        </span>

        <span class="icons">
            <a class="hoverable" href="https://www.linkedin.com/in/tyler-nguyen-484721151/" target="_blank">
              <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />
            </a>

            <a class="hoverable" href="https://github.com/tylernnguyen5" target="_blank">
              <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg"  />
            </a>
        </span>
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
.row{
  font-size: 1.5em;
}
.icons{
  padding-left: 100px;
}
.name{
  font-size: 2em;
}
</style>