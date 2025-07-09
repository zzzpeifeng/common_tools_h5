<template>
  <div class="contain-content h-[100vh] w-full flex flex-col px-1">
    <!-- 固定标题 -->
    <div class="flex justify-center items-center h-5 w-full py-0.5 px-4 border-b-[0.5px] z-10">
      <h3 v-if="!showSearchInput" class="flex justify-center w-full items-center text-black text-[0.6rem] font-extralight truncate">会员列表</h3>

      <!-- 搜索框 -->
      <input
        v-else
        v-model="searchKeyword"
        type="text"
        placeholder="请输入关键词"
        class="w-full h-4 ps-2 text-[0.4rem] border-b-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
        @click.stop
      />

      <!-- 搜索图标按钮 -->
      <button
        class="ml-2 text-gray-500 hover:text-blue-500 transition-colors"
        @click.stop="toggleSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>

    <!-- 可滚动的会员列表 -->
    <ul class="w-full mt-2 overflow-y-auto flex-1 px-1 space-y-1 pb-2">
      <li v-for="(member, index) in filteredMembers" :key="index"
          class="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between">
          <span class="text-[0.4rem] font-extralight">{{ member.name }}</span>
          <span class="text-[0.4rem] text-gray-500 font-extralight">{{ member.id }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const members = [
  { id: '001', name: '张三' },
  { id: '002', name: '李四' },
  { id: '003', name: '王五' },
  { id: '001', name: '张三' },
  { id: '002', name: '李四' },
  { id: '003', name: '王五' },
  { id: '001', name: '张三' },
  { id: '002', name: '李四' },
  { id: '003', name: '王五' },
  { id: '001', name: '张三' },
  { id: '002', name: '李四' },
  { id: '003', name: '王五' },
];

const showSearchInput = ref(false);
const searchKeyword = ref('');

// 过滤后的会员列表
const filteredMembers = computed(() => {
  if (!searchKeyword.value) return members;
  const keyword = searchKeyword.value.toLowerCase();
  return members.filter(member =>
    member.name.toLowerCase().includes(keyword) || member.id.includes(keyword)
  );
});

const toggleSearch = () => {
  showSearchInput.value = !showSearchInput.value;
};
</script>

<style scoped>
/* 自定义样式 */
</style>
