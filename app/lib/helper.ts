import axios from "axios"

const getRequest = async (token: string, baseUrl: string, url: string) => {
    const response = await axios.get(baseUrl + url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    return response.data;
}

const postRequest = async (token: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.post(baseUrl + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

const putRequest = async (token: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.put(baseUrl + url, body, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

const deleteRequest = async (token: string, baseUrl: string, url: string, body: any) => {
    const response = await axios.delete(baseUrl + url + "/" + body, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
};

export const httpRequest = async (token: string, baseUrl: string, url: string, method = 'GET', body = {}) => {
    switch (method) {
        case "GET":
            return getRequest(token, baseUrl, url);
        case "POST":
            return postRequest(token, baseUrl, url, body);
        case "PUT":
            return putRequest(token, baseUrl, url, body);
        case "DELETE":
            return deleteRequest(token, baseUrl, url, body);
        default:
            console.warn('method not supported');
            break;
    }
}

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