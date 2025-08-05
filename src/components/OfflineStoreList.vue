<script setup lang="ts">

import OfflineStoreApi from '@/api/offlinestore'
import { useRouter } from 'vue-router'
const router = useRouter()

// 定义OfflineStore接口
interface OfflineStore {
  id?: number;
  name: string;
  icon?: string;
  [key: string]: any; // 允许其他属性
}

const offStoreList = ref<OfflineStore[]>([])





const getOfflineStoreList = async() => {
  try{
    const offlineStoreData = await OfflineStoreApi.getOfflineStoreListByMerchant();
    offStoreList.value = offlineStoreData.data || []
    console.log(offStoreList)
  } catch(error) {
    console.error('获取门店列表失败:', error);
    offStoreList.value = [];
  }
}


// 跳转到会员列表页面
const goToMemberList = (storeId: number | undefined) => {
  if (storeId !== undefined) {
    router.push({
      name: 'memberList',
      query: {
        storeId: storeId
      }
    });
  }
}


onMounted(async () => {
  console.log("mount")
  await getOfflineStoreList();
})


</script>

<template>
  <div class="contain-content h-[100vh] w-full p-1">
    <div class="flex justify-center w-full pb-1 border-b-[0.5px] h-5">
      <h3 class="text-black font-extralight text-[0.6rem]">门店列表</h3>
    </div>
    <!-- 门店列表 -->
    <div class=" grid grid-cols-2 gap-2 overflow-y-auto mt-2">
      <div v-for="(offStore,index) in offStoreList"
           :key="index"
           @click="goToMemberList(offStore.id)"
           class="flex flex-col items-center bg-white p-1 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <img :src="offStore.icon" alt="门店图片" class="w-12 h-12 object-cover mb-1 bg-gray-100">
        <span class="text-[0.3rem] text-center">{{ offStore.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>