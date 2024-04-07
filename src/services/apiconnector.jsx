import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiConnector = async (url, method, bodyData, headers,params) => {
    // const headers = {
    //     "Content-Type": "application/json",
    // };

    // if (token) {
    //     headers.Authorization = `Bearer ${token}`;
    // }

    // const response = await api({
    //     method,
    //     url,
    //     data,
    //     headers,
    // });

    // return response;

    return axiosInstance({
        method:` ${method}`,
        url: `${url}`,
        data: bodyData ? bodyData:null,
        headers: headers ? headers:null,
        params:params ? params:null,
    });
};

