export const getMonthTxt = (month) => {
    let monthTxt = "";

    switch (Number(month)) {
        case 1:
            monthTxt =  'Jan';
            break;
        case 2:
            monthTxt = 'Feb';
            break;
        case 3:
            monthTxt = 'Mar';
            break;
        case 4:
            monthTxt = 'Apr';
            break;
        case 5:
            monthTxt = 'May';
            break;
        case 6:
            monthTxt = 'June';
            break;
        case 7:
            monthTxt = 'July';
            break;
        case 8:
            monthTxt = 'Aug';
            break;
        case 9:
            monthTxt = 'Sep';
            break;
        case 10:
            monthTxt = 'Oct';
            break;
        case 11:
            monthTxt = 'Nov';
            break;
        case 12:
            monthTxt = 'Dec';
            break;
        }

    console.log("MONTH:", month, monthTxt)
    return monthTxt;
}

export const getDayTxt = (day) => {
    let dayTxt = "";

    switch (day) {
        case 1:
            dayTxt = 'Sun';
            break;
        case 2:
            dayTxt = 'Mon';
            break;
        case 3:
            dayTxt = 'Tue';
            break;
        case 4:
            dayTxt = 'Wed';
            break;
        case 5:
            dayTxt = 'Thur';
            break;
        case 6:
            dayTxt = 'Fri';
            break;
        case 7:
            dayTxt = 'Sat';
            break;
        }
    //console.log("DAY:", dayTxt)
    return dayTxt;
}

