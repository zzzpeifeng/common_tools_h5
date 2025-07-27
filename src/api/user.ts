// src/api/user/user.ts

import http, { Response } from '@/utils/http';

export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    merchantInfo: MerchantInfo;
}

export interface MerchantInfo {
    name: string,
    username: string;
    phone: number;
    email: string;
}



const UserApi = {
    async login(params: LoginParams): Promise<Response<any>>{
        return await http.post<Response<LoginResponse>>('/auth/login', params);
    }
}

export default UserApi;
