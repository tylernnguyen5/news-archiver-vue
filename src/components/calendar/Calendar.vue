<template>
  <div class="calendar container">
    <div class="monthyear row">
        <a class="btn-small col s1" @click="previousMonth">
            <i class="material-icons">chevron_left</i>
        </a>

        <div class="col s5">        
            {{ currentMonth }} {{ currentYear }}    
        </div>

        <a class="btn-small col s1" @click="nextMonth">
            <i class="material-icons">chevron_right</i>
        </a>
    </div>
    
    
    <div class="weekdays row">
        <div class="col s1">Sun</div>
        <div class="col s1">Mon</div>
        <div class="col s1">Tue</div>
        <div class="col s1">Wed</div>
        <div class="col s1">Thu</div>
        <div class="col s1">Fri</div>
        <div class="col s1">Sat</div>
    </div>

       
    <div v-for="n in 6" :key="n">
        <div class="dates row">
            <!-- <div class="col s1 offset-2"></div> -->
            <div v-for="(date, index) in calendarArr[n-1]" :key="index">
                <div class="col s1">{{date}}</div>
            </div>
        </div>
    </div>


    <!-- <div class="dates row" v-for="n in 10" :key="n">{{ n }} </div> -->

<!-- 
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
    </div> -->

    <button @click="updateCalendar()">Test</button>
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
            startingWeekDay: null,
            daysInMonth: null,
            calendarArr: [
                ['', '', '', '', '', '', 1], 
                [2, 3, 4, 5, 6, 7, 8],
                [9, 10, 11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20, 21, 22],
                [23, 24, 25, 26, 27, 28, 29],
                [30, 31, '', '', '', '', '']
            ],
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
        },
        updateCalendar() { // FIXME: Refactor me
            // let tmp = new Date(this.currentYear, this.currTime.getMonth(), 1);
            // console.log("Temp Date: ", tmp);

            // Find the which days of the week in which the 1st day of the month lies on
            this.startingWeekDay = new Date(this.currentYear, this.currTime.getMonth(), 1).getDay();
            console.log("The 1st date is on: ", this.startingWeekDay);  // The first day of the week (0) means "Sunday"

            // Find number of days in the month
            this.daysInMonth = new Date(this.currentYear, this.currTime.getMonth()+1, 0).getDate();
            console.log("Days in month: ", this.daysInMonth)
        }
    },
    created() {
        this.getCurrentDatetime();
        this.updateCalendar();
    }
}
</script>

<style scoped>

</style>