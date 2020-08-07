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

  </div>
</template>

<script>
export default {
    name: 'OldCalendar',
    data() {
        return {
            currentDate: null,
            currentMonth: null,
            currentYear: null,
            currTime: new Date(),
            startingWeekDay: null,
            daysInMonth: null,
            calendarArr: [],
        }
    },
    methods: {
        previousMonth() {
            let lastMonth = this.currTime.getMonth() - 1;
            this.currTime.setMonth(lastMonth);
            console.log(this.currTime)

            this.updateCurrentDatetime();
        },
        nextMonth() {
            let nextMonth = this.currTime.getMonth() + 1;
            this.currTime.setMonth(nextMonth);
            console.log(this.currTime)

            this.updateCurrentDatetime();
        },
        updateCurrentDatetime() {
            // Update current date, month, year variables
            this.currentDate = this.currTime.getDate()
            this.currentMonth = this.currTime.toLocaleString('default', { month: 'long' })
            this.currentYear = this.currTime.getFullYear()

            // Update calendar array
            this.calendarArr = [];
            this.updateCalendar();
        },
        updateCalendar() { // FIXME: Refactor me
            // Update which days of the week in which the 1st day of the month lies on
            this.startingWeekDay = new Date(this.currentYear, this.currTime.getMonth(), 1).getDay();
            console.log("The 1st date is on: ", this.startingWeekDay);  // The first day of the week (0) means "Sunday"

            // Update the number of days in the month
            this.daysInMonth = new Date(this.currentYear, this.currTime.getMonth()+1, 0).getDate();
            console.log("Days in month: ", this.daysInMonth)

            // Update calendar array
            let weekArr = []
            let date = 1;
            let remainder = 36 - this.daysInMonth;

            for (let i = 0; i < 6; i++) {
                // Build weekArr
                let weekArr = [];

                for (let j = 0; j < 7; j++) {
                    if (i == 0 && j < this.startingWeekDay) {    // First week of the month and haven't reached the first date of the month yet
                        weekArr[j] = '';

                    } else if (date > this.daysInMonth) {    // Last week of the month 
                        for (let k = 0; k < remainder; k++) {
                            weekArr.push('');  // Fill the remaining days of the week with empty spaces when reaching the number of days in that month
                        }
                        break;

                    } else {
                        weekArr[j] = date;
                        date++;

                    }

                    this.calendarArr[i] = weekArr;
                }
            }
            console.log("Calendar Array: ", this.calendarArr);   
        }
    },
    created() {
        this.updateCurrentDatetime();
    }
}
</script>

<style scoped>

</style>