export function formatTime(date: any) {
    var d = typeof date === "string" ? new Date(date) : date,
        hour = "" + d.getHours(),
        minute = "" + d.getMinutes(),
        second = "" + d.getSeconds();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;
    if (second.length < 2) second = "0" + second;

    return [hour, minute, second].join(":");
}

export const formatDate = (date: any) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var d = typeof date === "string" ? new Date(date) : date,
        // month = '' + (d.getMonth() + 1),
        month = months[d.getMonth()],
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(" ");
};

export const formatDateTime = (date: any) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var d = typeof date === "string" ? new Date(date) : date,
        // month = '' + (d.getMonth() + 1),
        month = months[d.getMonth()],
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let formattedDate = [day, month, year].join(" ");
    
    var d = typeof date === "string" ? new Date(date) : date,
        hour = "" + d.getHours(),
        minute = "" + d.getMinutes(),
        second = "" + d.getSeconds();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;
    if (second.length < 2) second = "0" + second;

    let formattedTime = [hour, minute, second].join(":");
    return [formattedDate, formattedTime].join(" ")
}