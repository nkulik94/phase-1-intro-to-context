function createEmployeeRecord(employeeInfo) {
    const employeeObj = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeObj
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const dateStampArray = dateStamp.split(' ');
    
    const timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStampArray[1], 10),
        date: dateStampArray[0]
    };

    employeeRecord.timeInEvents.push(timeIn);
    
    return employeeRecord;

};

function createTimeOutEvent(employee, dateStamp) {
    const dateStampArray = dateStamp.split(' ');

    const timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStampArray[1], 10),
        date: dateStampArray[0]
    };

    employee.timeOutEvents.push(timeOut)

    return employee
}

function hoursWorkedOnDate(employee, date) {
    const amtOfDays = employee['timeInEvents'].length
    const totalHours = []
    for (let i = 0; i < amtOfDays; i++) {
        if (employee.timeInEvents[i].date === date) {
            if (employee.timeInEvents[i].date === employee.timeOutEvents[i].date) {
                totalHours.push((employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour) / 100)
            }
        }
    }
    return totalHours.reduce((accum, hours) => accum + hours, 0)
}
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const allDates = employee.timeInEvents.map(time => time.date)
    
    const allPay = allDates.map(date => wagesEarnedOnDate(employee, date))

    return allPay.reduce((accum, wages) => accum + wages, 0)
}

function calculatePayroll(employees) {
    const allPayArray = employees.map(employee => allWagesFor(employee))
    return allPayArray.reduce((accum, num) => accum + num, 0)
}