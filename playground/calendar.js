let startingWeekDay = 6;
let daysInMonth = 31;
let arr1 = [];
let date = 1;
let remainder = 36 - 31

for (let i = 0; i < 6; i++) {
    let arr2 = [];
    
    // Build arr2
    for (let j = 0; j < 7; j++) {
        if (i == 0 && j < startingWeekDay) {    // First week of the month and haven't reached the first date of the month yet
            arr2[j] = '';

        } else if (date > daysInMonth) {    // Last week of the month 
            for (let k = 0; k < remainder; k++) {
                arr2.push('');  // Fill the remaining days of the week with empty spaces
            }
            break;

        } else {
            arr2[j] = date;
            date++;

        }

        arr1[i] = arr2;
    }
}

console.log(arr1);