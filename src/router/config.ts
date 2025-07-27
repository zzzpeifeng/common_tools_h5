

// 首页地址（默认）
export const HOME_URL = '/';

export const OFFLINE_STORE_URL = '/offline-store';

// 登录页地址（默认）
export const LOGIN_URL = '/login';

// 注册页
export const REGISTER_URL = '/register';

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ['/','/500',REGISTER_URL];