<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '服务指南',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
  },
})

// 服务指南项数据
interface GuideItem {
  id: string
  title: string
  description: string
  color: string
  icon: string
  isEnabled: boolean
}

const guideItems = ref<GuideItem[]>([
  {
    id: 'operation-guide',
    title: '操作指南',
    description: '小程序平台使用指南',
    color: '#3b82f6',
    icon: 'mdi:compass-outline',
    isEnabled: true,
  },
  {
    id: 'platform-management',
    title: '平台管理制度',
    description: '平台制度管理内容',
    color: '#0ea5e9',
    icon: 'mdi:shield-outline',
    isEnabled: true,
  },
])

// 处理服务指南项点击
function handleGuideClick(guideId: string) {
  const guide = guideItems.value.find(item => item.id === guideId)

  if (!guide) {
    uni.showToast({
      title: '未找到该项指南',
      icon: 'none',
    })
    return
  }

  if (!guide.isEnabled) {
    uni.showToast({
      title: '该功能暂未开发',
      icon: 'none',
    })
    return
  }

  // 根据不同的指南类型跳转到对应的页面
  switch (guideId) {
    case 'operation-guide':
      uni.navigateTo({
        url: '/pages-sub/services/operation-guide',
      })
      break
    case 'platform-management':
      uni.navigateTo({
        url: '/pages-sub/services/platform-management',
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
  <view class="service-guide-container min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <view class="guide-header h-12 flex items-center justify-center border-b bg-white">
      <text class="text-lg font-medium">服务指南</text>
    </view>

    <!-- 指南内容区域 -->
    <view class="guide-content px-4 py-5">
      <view class="guide-items-container grid grid-cols-2 gap-4">
        <view
          v-for="item in guideItems"
          :key="item.id"
          class="guide-item rounded-xl shadow-md"
          :style="{ backgroundColor: item.color }"
          :class="{ 'opacity-50': !item.isEnabled }"
          @click="handleGuideClick(item.id)"
        >
          <div class="guide-inner flex items-center px-5 py-6">
            <div class="guide-icon-container">
              <Icon :icon="item.icon" class="h-10 w-10 text-white" />
            </div>
            <div class="guide-text-container ml-3">
              <text class="block text-base text-white font-medium">{{ item.title }}</text>
              <text class="mt-1 block text-xs text-white/90">{{ item.description }}</text>
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.service-guide-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.guide-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.guide-content {
  padding-top: 20px;
}

.guide-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.guide-item:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.guide-inner {
  width: 100%;
}

.guide-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-text-container {
  flex: 1;
  text-align: left;
}
</style>
