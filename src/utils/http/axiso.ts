// src/utils/http/axios.ts

import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import router from '@/router';
import {useMerchantStore} from "@/store/merchant";

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

console.log(import.meta.env.VITE_APP_API_BASE_URL+"32132")

// 创建axios实例
const service = axios.create({
    // 根据不同env设置不同的baseURL
    // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    baseURL: '/api',
});

// axios实例拦截请求
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const useMerchantState = useMerchantStore();
        const headers = config.headers || {};

        if(useMerchantState.token){
            headers['Authorization'] = `Bearer ${useMerchantState.token}`;
            console.log(headers)
        }
        config.headers = headers;
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    // 2xx时触发
    (response: AxiosResponse) => {
        // response.data就是后端返回的数据，结构根据你们的约定来定义
        const { code, message } = response.data;
        let errMessage = '';
        switch (code) {
            case 0:
                break;
            case 1: // token过期
                errMessage = 'Token expired';
                router.push('/login');
                break;
            case 2: // 无权限
                errMessage = 'No permission';
                break;
            default:
                errMessage = message;
                break;
        }
        if (errMessage)
        {
            console.log(errMessage);
        }
        return response;
    },
    // 非2xx时触发
    (error: AxiosError) => {

        console.log('Network Error...')
        return Promise.reject(error);
    }
);

export type { AxiosResponse, AxiosRequestConfig };

export default service;
