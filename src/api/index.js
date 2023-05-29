import axios from 'axios';
import { Notify } from 'quasar'


// 封装 Axios
export const http = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60*1000,
});

// 设置 loading 状态标志位
let loading = false;

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        // 发起请求时，设置 loading 状态为 true
        loading = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        // 请求成功后，设置 loading 状态为 false
        loading = false;
        return response.data;
    },
    (error) => {
        // 请求失败时，统一处理错误信息
        Notify.create({
            message: error.message,
            position: 'top',
            type: 'warning'
        })
        return Promise.reject(error);
    }
);