// src/router/user.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        // component: () => import('@/layout/OfflineStore.vue'),
        redirect: '/index',
        children: [
            // 需要layout的页面
            {
                path: 'index',
                name: 'index',
                meta: {
                    title: 'index',
                },
                component: () => import('@/pages/Home.vue'),
            },
        ],
    },
    {
        path: '/offlineStore',
        name: 'offlineStore',
        meta: {
            title: 'offlineStore',
        },
        component: () => import('@/layout/OfflineStore.vue'),
        children: [
            {
                path: 'list',
                name: 'offlineStoreList',
                meta: {
                    title: 'offlineStoreList',
                },
                component: () => import('@/components/OfflineStoreList.vue'),
            },
            {
                path: 'member-list',
                name: 'memberList',
                meta: {
                    title: 'memberList',
                },
                component: () => import('@/components/MemberList.vue'),
            },
            {
                path: 'member-detail',
                name: 'memberDetail',
                meta: {
                    title: 'memberDetail',
                },
                component: () => import('@/components/MemberDetail.vue'),
            },
        ]
    },
    // 不需要layout的页面
    // 替代vue2中的'*'通配符路径
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHashHistory(), // history 模式则使用 createWebHistory()
    routes,
});
export default router;
