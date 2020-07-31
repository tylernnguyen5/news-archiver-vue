<template>
  <div class="home">
    <h1>Home Page Component Here</h1>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'

export default {
  name: 'Home',
  components: {
    Calendar
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home{
  text-align: center;
}
</style>
