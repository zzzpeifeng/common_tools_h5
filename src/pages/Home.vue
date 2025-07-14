<script setup lang="ts">

import { ref } from 'vue';
import UserApi from '../api/user';

const showLogin = ref(true);
// 存储用户名
const username = ref('');
// 存储密码
const password = ref('');

// 处理登录逻辑的函数
const handleLogin = () => {
  console.log('用户名:', username.value, '密码:', password.value);
  // 可在此添加实际的登录请求逻辑
  UserApi.login({
    username: username.value,
    password: password.value
  })
  // showLogin.value = false;
};

</script>

<template>
  <div class="container flex flex-col h-screen">
    <div class="flex-1 flex w-100% h-30 justify-center items-center">
      <h1 class="text-3xl text-black bg-center font-extra light">
        会员系统
      </h1>
    </div>
    <div class="w-100% p-10 flex justify-center items-center">
      <button class="bg-black text-white py-1 px-1 w-20 text-[0.4rem] font-extralight" @click="() => {console.log('会员登录')}">
        商家登录
      </button>
    </div>
  </div>
  <!-- 登录模态框 -->
  <div v-if="showLogin" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div class="bg-white p-2 flex flex-col flex-auto items-center">
      <h2 class="text-sm font-extralight text-black mb-2">商家登录</h2>
      <input
          v-model="username"
          type="text"
          placeholder="用户名"
          class="w-[80%] p-1 border border-gray-300 mb-2 text-[0.4rem] font-extralight focus:border-black focus:ring-black"
      />
      <input
          v-model="password"
          type="password"
          placeholder="密码"
          class="w-[80%] p-1 border border-gray-300 mb-4 text-[0.4rem] font-extralight focus:border-black focus:ring-black"
      />
      <div class="flex justify-center">
        <button class="bg-gray-300 text-black py-1 px-2 rounded-xs mr-2 text-[0.4rem] font-extralight" @click="showLogin = false">
          取消
        </button>
        <button class="bg-black text-white py-1 px-2 rounded-xs text-[0.4rem] font-extralight" @click="handleLogin">
          登录
        </button>
      </div>
    </div>
  </div>

</template>
