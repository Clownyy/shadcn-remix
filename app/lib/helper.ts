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

export const httpRequest = async (token:string, baseUrl: string, url: string, method = 'GET', body = {}) => {
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