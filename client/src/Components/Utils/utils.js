export function convertToDate(unix_timestamp){
    var dateObj = new Date(unix_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = dateObj.getFullYear();
    var month = months[dateObj.getMonth()];
    // var date = dateObj.getDate();
    // var hour = dateObj.getHours();
    // var min = dateObj.getMinutes();
    // var sec = dateObj.getSeconds();
    var time = month + ' ' + year ;
    return time;
}