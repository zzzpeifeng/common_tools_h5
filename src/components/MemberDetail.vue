<script setup lang="ts">
import { ref } from 'vue';

  // 控制弹窗显示与隐藏
  const showPopup = ref(false);
  // 存储当前积分
  // const currentPoints = ref(100);
  // 存储要消费的积分
  const pointsToConsume = ref(0);

const logList = [
    {
      id: '001',
      name: '张三',
      date: '2025-05-02',
      point: '100',
      money: '100'
    },
    {
      id: '002',
      name: '李四',
      date: '2025-05-02',
      point: '100',
      money: '100'
    },
    {
      id: '003',
      name: '王五',
      date: '2025-05-02',
      point: '100',
      money: '100'
    },
    {
      id: '004',
      name: '赵六',
      date: '2025-05-02',
      point: '100',
      money: '100'
    }
  ]
</script>

<template>
  <div class="member-detail h-[100vh] w-full p-1">
    <div class="flex justify-center w-full pb-1 border-b-[0.5px] h-5">
      <h3 class="text-black font-extralight text-[0.6rem]">会员详情</h3>
    </div>

    <div class="mt-2">
<!--      <div class="flex items-center">-->
<!--        <span class="text-[0.6rem] text-black px-1 font-light">张三</span>-->
<!--        <span class="text-[0.6rem] text-black font-light">12345</span>-->
<!--      </div>-->
      <div class="bg-white h-11 rounded-sm my-2">
        <div class="flex items-center">
          <span class="text-[0.5rem] font-extralight text-black p-1">客户信息</span>
        </div>
        <div class="flex flex-row space-x-0.5">
          <div class="flex flex-col flex-auto">
            <span class="text-[0.4rem] px-1 text-blue-500">张三</span>
            <span class="text-[0.4rem] px-1">13223322233</span>
          </div>
          <div class="flex flex-col flex-auto">
            <span class="text-gray-400 text-[0.4rem] px-1">加入日期</span>
            <span class="text-[0.4rem] px-1">2025-05-02</span>
          </div>
        </div>
      </div>
      <div class="bg-white h-11 rounded-sm my-2">
        <div class="flex items-center">
          <span class="text-[0.5rem] font-extralight text-black p-1">客户资产</span>
        </div>
        <div class="flex flex-row space-x-4">
          <div class="flex flex-col flex-auto">
            <span class="text-gray-400 text-[0.4rem] px-1">积分</span>
            <span class="text-[0.4rem] px-1">100</span>
          </div>
          <div class="flex flex-auto justify-center items-center">
            <button @click="showPopup = true" class="text-blue-400 text-[0.4rem] border-1 rounded-xs w-10">消费积分</button>
          </div>
        </div>
      </div>

      <!-- 弹窗 -->
      <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-100">
        <div class="bg-white px-2 py-1 rounded-sm">
          <h3 class="text-[0.4rem] font-extralight mb-2">消费积分</h3>
          <input
              type="number"
              v-model="pointsToConsume"
              class="border border-gray-200 p-1 mb-2 w-full font-bold text-[0.4rem] leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="输入要消费的积分"
          />
          <div class="flex justify-end space-x-2">
            <button
                class="text-gray-600 text-[0.4rem] px-2 py-1 border border-gray-300 rounded-xs"
                @click="showPopup = false"
            >
              取消
            </button>
            <button
                class="border-blue-400 text-[0.4rem] border-1 text-blue-400 px-2 py-1 rounded-xs"
            >
              确认
            </button>
          </div>
        </div>
      </div>

      <!-- 积分操作记录 -->
      <div class="bg-white overflow-auto rounded-sm my-2">
        <div class="flex items-center">
          <span class="text-[0.5rem] font-extralight text-black p-1">操作记录</span>
        </div>
        <div class="flex items-center">
          <ul class="w-full pb-1">
            <li v-for="(item,index) in logList" :key="index" class="flex flex-auto justify-between border-b-[0.5px] border-gray-300 px-1">
              <div class="flex items-center py-1">
                <span  class="text-[0.4rem] font-extralight text-black">积分消费{{ item.point }}点</span>
              </div>
              <div class="flex items-center">
                <span class=" text-[0.4rem] font-extralight text-black">{{ item.date }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>