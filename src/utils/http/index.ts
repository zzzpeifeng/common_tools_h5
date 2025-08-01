// src/utils/http/index.ts

import service, { AxiosRequestConfig } from './axiso';
import {AxiosResponse} from "axios";
export * from './types';

export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
        service
            .request(config)
            .then((res: AxiosResponse<T>) => {
                // 一些业务处理
                resolve(res.data);
            })
            .catch((err) => {
                console.log('request fail:', err);
            });
    });
};

const http = {
    get<T = any>(url: string, params = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, params, ...config, method: 'GET' })
    },
    post<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'POST' })
    },
    put<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'PUT' })
    },
    delete<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({ url, data, ...config, method: 'DELETE' })
    },
    // 上传文件，指定 'Content-Type': 'multipart/form-data'
    upload<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
        return request({
            url,
            data,
            ...config,
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res =>
            res.data
        )
            .catch(error => {
                throw error;
            });
    },
};

export default http;
