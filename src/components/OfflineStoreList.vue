<script setup lang="ts">
const offStoreList = [
  { icon: new URL('../assets/memberIcon.png', import.meta.url).href, storeName: '门店名称A' },
  { icon: new URL('../assets/vue.svg', import.meta.url).href, storeName: '门店名称B' },
  { icon: new URL('../assets/memberIcon.png', import.meta.url).href, storeName: '门店名称C' },
  { icon: new URL('../assets/memberIcon.png', import.meta.url).href, storeName: '门店名称D' },
];




</script>

<template>
  <div class="contain-content h-[100vh] w-full p-1">
    <div class="flex justify-center w-full pb-1 border-b-[0.5px] h-5">
      <h3 class="text-black font-extralight text-[0.6rem]">门店列表</h3>
    </div>
    <!-- 门店列表 -->
    <div class=" grid grid-cols-2 gap-2 overflow-y-auto mt-2">
      <div v-for="(offStore,index) in offStoreList" :key="index" class="flex flex-col items-center bg-white p-1 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <img :src="offStore.icon" alt="门店图片" class="w-12 h-12 object-cover mb-1 bg-gray-100">
        <span class="text-[0.3rem] text-center">{{ offStore.storeName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>