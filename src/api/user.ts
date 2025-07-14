// src/api/user/user.ts

import http, { Response } from '@/utils/http';

export interface LoginParams {
    username: string;
    password: string;
}

interface UserInfo {
    id: number;
    username: string;
    mobile: number;
    email: string;
}

const UserApi = {
    async login(params: LoginParams) {
        return await http.post<Response<UserInfo>>('/auth/merchant-login', params);
    }
}

export default UserApi;
