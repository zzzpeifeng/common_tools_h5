// src/utils/http/user.ts

import service, { AxiosRequestConfig } from 'axios';
import {AxiosError, AxiosResponse} from "axios";
export * from './types';



export const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    console.log(config);
    return new Promise((resolve) => {
        service
            .request(config)
            .then((res:AxiosResponse<T>) => {
                // 一些业务处理
                resolve(res.data);
            })
            .catch((err:AxiosError) => {
                console.log('request fail:', err);
            });
    });
};

const http = {
    get<T>(url: string, params = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, params, ...config, method: 'GET' });
    },
    post<T>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'POST' });
    },
    put<T>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'PUT' });
    },
    delete<T>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'DELETE' });
    },
    // 上传文件，指定 'Content-Type': 'multipart/form-data'
    upload<T>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({
            url,
            data,
            ...config,
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default http;
