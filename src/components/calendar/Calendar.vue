<template>
  <div class="calendar container">
    <div class="monthyear row">
        <a class="btn-small col s1 offset-s2" @click="previousMonth">
            <i class="material-icons">chevron_left</i>
        </a>

        <div class="col s6" >        
            {{ currentMonth }} {{ currentYear }}    
        </div>

        <a class="btn-small col s1" @click="nextMonth">
            <i class="material-icons">chevron_right</i>
        </a>
    </div>
    
    
    <div class="weekdays row">
        <div class="col s1 offset-s2">Mon</div>
        <div class="col s1">Tue</div>
        <div class="col s1">Wed</div>
        <div class="col s1">Thu</div>
        <div class="col s1">Fri</div>
        <div class="col s1 offset-s1">Sat</div>
        <div class="col s1">Sun</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">None</div>
        <div class="col s1">None</div>
        <div class="col s1">None</div>
        <div class="col s1">1</div>
        <div class="col s1">2</div>
        <div class="col s1 offset-s1">3</div>
        <div class="col s1">4</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">5</div>
        <div class="col s1">6</div>
        <div class="col s1">7</div>
        <div class="col s1">8</div>
        <div class="col s1">9</div>
        <div class="col s1  offset-s1">10</div>
        <div class="col s1">11</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">12</div>
        <div class="col s1">13</div>
        <div class="col s1">14</div>
        <div class="col s1">15</div>
        <div class="col s1">16</div>
        <div class="col s1  offset-s1">17</div>
        <div class="col s1">18</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">19</div>
        <div class="col s1">20</div>
        <div class="col s1">21</div>
        <div class="col s1">22</div>
        <div class="col s1">23</div>
        <div class="col s1  offset-s1">24</div>
        <div class="col s1">25</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">19</div>
        <div class="col s1">20</div>
        <div class="col s1">21</div>
        <div class="col s1">22</div>
        <div class="col s1">23</div>
        <div class="col s1  offset-s1">24</div>
        <div class="col s1">25</div>
    </div>

    <div class="dates row">
        <div class="col s1 offset-s2">26</div>
        <div class="col s1">27</div>
        <div class="col s1">28</div>
        <div class="col s1">29</div>
        <div class="col s1">30</div>
        <div class="col s1  offset-s1">None</div>
        <div class="col s1">None</div>
    </div>

       
  </div>
</template>

<script>

export default {
    name: 'Calendar',
    data() {
        return {
            currentDate: null,
            currentMonth: null,
            currentYear: null,
            currTime: new Date(),
        }
    },
    methods: {
        previousMonth() {
            let lastMonth = this.currTime.getMonth() - 1;
            this.currTime.setMonth(lastMonth);
            console.log(this.currTime)

            this.getCurrentDatetime();
        },
        nextMonth() {
            let nextMonth = this.currTime.getMonth() + 1;
            this.currTime.setMonth(nextMonth);
            console.log(this.currTime)

            this.getCurrentDatetime();
        },
        getCurrentDatetime() {
            this.currentDate = this.currTime.getDate()
            this.currentMonth = this.currTime.toLocaleString('default', { month: 'long' })
            this.currentYear = this.currTime.getFullYear()
        }
    },
    created() {
        this.getCurrentDatetime();
    }
}
</script>

<style scoped>

</style>