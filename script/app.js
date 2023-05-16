const
    // Using for the submission
    arrow = document.querySelector('.arrow'),
    form = document.getElementById("form"),
    submit = document.getElementById('submit'),

    // Input

    dayLabel = document.getElementById("day-red"),
    monthLabel = document.getElementById("month-red"),
    yearLabel = document.getElementById("year-red"),

    dayError = document.getElementById("day-error"),
    monthError = document.getElementById("month-error"),
    yearError = document.getElementById("year-error"),

    dayIn = document.getElementById("day"),
    monthIn = document.getElementById("month"),
    yearIn = document.getElementById("year"),

    // Output

    dayOu = document.getElementById("d"),
    monthOu = document.getElementById("m"),
    yearOu = document.getElementById("y")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrors();

    const
    day = parseInt(dayIn.value),
    month = parseInt(monthIn.value),
    year = parseInt(yearIn.value);

    if (!validateInput(day, month, year)) {
        return;
    }

    const
    today = new Date()

    // calculate age
    const age = {
        year: today.getFullYear() - year,
        month: today.getMonth() + 1 - month,
        day: today.getDate() - day,
    };

    if (age.day < 0) {
        const daysInLastMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
        age.day += daysInLastMonth;
        age.month--;
    }

    if (age.month < 0) {
        age.month += 12;
        age.year--;
    }

    // Displaying age

    yearOu.innerText = age.year;
    monthOu.innerText = age.month;
    dayOu.innerText = age.day;
});

function validateInput(day, month, year) {
    let valid = true;

    const
    currentDate = new Date(),
    CurrentYear = currentDate.getFullYear();

    // Validating Input

    //  Day
    if (day < 1 || day > 31 ) {
        setError(dayIn, 1, dayLabel);
        valid = false;
    } else if ((dayIn.value.trim() === "")) {
        setError(dayIn, 0, dayLabel);
        valid = false;
    } else if (isNaN(day)) {
        setError(dayIn, 1, dayLabel);
        valid = false;
    } else {
        setSuccess(dayIn,dayLabel);
        setInvalidDay(0);
    }

    // Month

    if (month < 1 || month > 12) {
        setError(monthIn, 2, monthLabel);
        valid = false;
    } else if (monthIn.value.trim() === "") {
        setError(monthIn, 0, monthLabel);
        valid = false;
    } else if (isNaN(month)) {
        setError(dayIn, 1, dayLabel);
        valid = false;
    } else {
        setSuccess(monthIn, monthLabel)
    }

    // Year

    if (year > CurrentYear || year < 1905) {
        setError(yearIn, 3, yearLabel)
        valid = false;
    } else if (yearIn.value.trim() === "") {
        setError(yearIn, 0, yearLabel);
        valid = false;
    } else if (isNaN(year)) {
        setError(dayIn, 1, dayLabel);
        valid = false;
    } else {
        setSuccess(yearIn, yearLabel);
    }

    // Check if the day is valid depending on the month and year by calling getDaysInMonth and setInvalidDay
    if (day > getDaysInMonth(month, year)) {
        setError(dayIn, 1, dayLabel);
        setInvalidDay(1);
        valid = false;
    }

    return valid;
};

function resetErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
}

const errorMessage = ["This field is required", "Must be a valid day", "Must be a valid month", "Must be in the past"]

const setError = (element, message, id) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('small');

    errorDisplay.innerText = errorMessage[message];
    element.classList.add('input-red')
    id.classList.add('red-text');
}

const setSuccess = (element, id) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('small');

    errorDisplay.innerText = "";
    element.classList.remove('input-red');
    id.classList.remove('red-text');
}

setInvalidDay = (n) => {
    if (n === 1) {
        monthIn.classList.add("input-red");
        yearIn.classList.add("input-red");
        yearLabel.classList.add("red-text");
        monthLabel.classList.add("red-text");
    } else {
        monthIn.classList.remove("input-red");
        yearIn.classList.remove("input-red");
        monthLabel.classList.remove("red-text");
        yearLabel.classList.remove("red-text");
    }
}

function getDaysInMonth(month, year) {
    if (month === 2) {
        if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else {
        return 31;
    }
}