<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import ContractServiceItem from './components/ContractServiceItem.vue'

const router = useRouter()
const userStore = useUserStore()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '合同服务',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 横幅图片路径（便于后期更换）
const bannerImage = ref('/static/images/banner-contract-service.svg')

// 服务项目数据
const serviceItems = ref([
  {
    id: 'contract-mall',
    title: '合同商城',
    description: '点击跳转至京东商城',
    icon: '👥',
    color: '#1989fa',
    isEnabled: true,
    onClick: () => handleServiceClick('contract-mall'),
  },

  {
    id: 'electronic-contract',
    title: '电子合同签署',
    description: '暂未开发',
    icon: '📝',
    color: '#4096ff',
    isEnabled: false,
    onClick: () => handleServiceClick('electronic-contract'),
  },
  {
    id: 'free-contract-template',
    title: '免费合同文本下载',
    description: '在线下载合同模板',
    icon: '📄',
    color: '#ff9500',
    isEnabled: true,
    onClick: () => handleServiceClick('free-contract-template'),
  },
])

// 处理服务项点击
function handleServiceClick(serviceId: string) {
  const service = serviceItems.value.find(item => item.id === serviceId)

  if (!service)
    return

  if (!service.isEnabled) {
    uni.showToast({
      title: '该功能暂未开发',
      icon: 'none',
    })
    return
  }

  switch (serviceId) {
    case 'contract-mall':
      // 跳转到合同商城弹窗页面
      uni.navigateTo({
        url: '/pages-sub/4-contract-service/contract-mall/index',
      })
      break
    case 'free-contract-template':
      // 跳转到合同模板下载页面
      uni.navigateTo({
        url: '/pages-sub/4-contract-service/free-contract-download/index',
      })
      break
    default:
      uni.showToast({
        title: '即将开放',
        icon: 'none',
      })
  }
}
</script>

<template>
  <view class="contract-service-container">
    <!-- 横幅图片 -->
    <view class="banner-container">
      <image :src="bannerImage" class="banner-image" mode="aspectFill" />
    </view>

    <!-- 服务项目列表 -->
    <view class="services-container">
      <ContractServiceItem v-for="item in serviceItems" :key="item.id" :item="item" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.contract-service-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

.header-left,
.header-right {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
}

.back-icon {
  font-size: 18px;
  color: #333333;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  flex: 1;
  text-align: center;
}

.banner-container {
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
}

.banner-image {
  width: 100%;
  height: 160px;
}

.services-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
