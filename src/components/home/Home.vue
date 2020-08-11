<template>
  <div class="home">
    <Content />
    <Footer />
  </div>
</template>

<script>
import Content from '@/components/content/Content'
import Footer from '@/components/layout/Footer'

export default {
  name: 'Home',
  components: {
    Content,
    Footer
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  text-align: center;
}
</style>
