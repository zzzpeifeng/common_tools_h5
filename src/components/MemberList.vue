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
    <!-- 固定的圆形添加按钮 -->
    <button class="fixed bottom-4 right-4 w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-xl z-10"
            @click="openAddMemberModal">
      +
    </button>
    <!-- 添加会员模态框 -->
    <div
        v-if="showAddMemberModal"
        class="fixed inset-0 z-20 flex items-end justify-center"
    >
      <div
          class="absolute inset-0 bg-black transition-opacity duration-300"
          :class="showAddMemberModal ? 'bg-opacity-50' : 'bg-opacity-0'"
          @click="closeAddMemberModal"
      ></div>

      <div class="relative bg-white w-full  p-2 transform transition-transform duration-300 ease-in-out"
           :class="modalTransitioning ? 'translate-y-0' : 'translate-y-full'">
        <h4  class="text-lg font-extralight mb-2 text-center text-[0.6rem]">添加会员</h4>

        <form @submit.prevent="submitMember">
          <div class="mb-1">
            <label class="block text-gray-700 text-[0.4rem] font-extralight mb-1" for="name">
              名称
            </label>
            <input
                id="name"
                v-model="newMember.name"
                type="text"
                class="shadow appearance-none border text-[0.4rem] w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="请输入会员名称"
                required
            />
          </div>

          <div class="mb-1">
            <label class="block text-gray-700 text-[0.4rem] font-extralight mb-1" for="pin">
              PIN码
            </label>
            <input
                id="pin"
                v-model="newMember.pin"
                type="password"
                class="shadow appearance-none border w-full py-1 px-2 text-[0.4rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="请输入PIN码"
                required
            />
          </div>

          <div class="mb-2">
            <label class="block text-gray-700 text-[0.4rem] font-extralight mb-1" for="confirmPin">
              确认PIN码
            </label>
            <input
                id="confirmPin"
                v-model="newMember.confirmPin"
                type="password"
                class="shadow appearance-none border text-[0.4rem]  w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="请再次输入PIN码"
                required
            />
          </div>

          <div class="flex items-center justify-between">
            <button
                type="button"
                class="bg-gray-500 hover:bg-gray-700 text-white text-[0.4rem] font-extralight py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="closeAddMemberModal"
            >
              取消
            </button>
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white text-[0.4rem] font-extralight py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>

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
const showAddMemberModal = ref(false);
const modalTransitioning = ref(false);

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

const newMember = ref({
  name: '',
  pin: '',
  confirmPin: ''
});

const submitMember = () => {
  // 简单验证PIN码是否一致
  if (newMember.value.pin !== newMember.value.confirmPin) {
    alert('两次输入的PIN码不一致，请重新输入');
    return;
  }
};

const openAddMemberModal = () => {
  showAddMemberModal.value = true;
  // 在下次DOM更新后触发动画
  nextTick(() => {
    modalTransitioning.value = true;
  });
};


  const closeAddMemberModal = () => {
    showAddMemberModal.value = false;
    // 等待动画结束后再隐藏模态框
    setTimeout(() => {
      showAddMemberModal.value = false;
      // 重置表单
      newMember.value = {
        name: '',
        pin: '',
        confirmPin: ''
      };
    }, 300);
  };

</script>

<style scoped>
/* 自定义样式 */
</style>
