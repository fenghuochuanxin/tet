<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '平台管理制度',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    navigationBarBackButtonText: '',
  },
})

// 文档类型接口
export interface DocumentItem {
  id: string
  title: string
  type: 'word' | 'pdf'
  icon: string
  iconColor: string
  backgroundColor: string
}

// 文档数据
const documents = ref<DocumentItem[]>([
  {
    id: 'doc-1',
    title: '商铺租赁合同管理办法',
    type: 'word',
    icon: 'mdi:file-word-box',
    iconColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  {
    id: 'doc-2',
    title: '商铺租赁纠纷调解规则',
    type: 'word',
    icon: 'mdi:file-word-box',
    iconColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  {
    id: 'doc-3',
    title: '平台用户管理规定',
    type: 'word',
    icon: 'mdi:file-word-box',
    iconColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  {
    id: 'doc-4',
    title: 'NetSDK使用说明',
    type: 'pdf',
    icon: 'mdi:file-pdf-box',
    iconColor: '#dc2626',
    backgroundColor: '#fee2e2',
  },
  {
    id: 'doc-5',
    title: '平台服务收费标准',
    type: 'pdf',
    icon: 'mdi:file-pdf-box',
    iconColor: '#dc2626',
    backgroundColor: '#fee2e2',
  },
  {
    id: 'doc-6',
    title: '仲裁确认流程规范',
    type: 'pdf',
    icon: 'mdi:file-pdf-box',
    iconColor: '#dc2626',
    backgroundColor: '#fee2e2',
  },
])

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 处理文档点击
function handleDocumentClick(documentId: string) {
  const document = documents.value.find(item => item.id === documentId)

  if (document) {
    uni.showToast({
      title: `即将打开${document.title}`,
      icon: 'none',
    })
    // 这里可以添加实际的文档打开逻辑
  }
}
</script>

<template>
  <view class="platform-management-container min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <view class="management-header h-12 flex items-center border-b bg-white px-4">
      <view class="back-button" @click="navigateBack">
        <Icon icon="mdi:arrow-left" class="h-5 w-5 text-gray-700" />
      </view>
      <text class="flex-1 text-center text-lg font-medium">平台管理制度</text>
      <view class="w-5" /> <!-- 为了标题居中的占位元素 -->
    </view>

    <!-- 内容区域 -->
    <view class="management-content px-4 py-5">
      <!-- 文档网格 -->
      <view class="documents-grid grid grid-cols-3 gap-4">
        <view
          v-for="document in documents"
          :key="document.id"
          class="document-item overflow-hidden rounded-lg shadow-sm"
          :style="{ backgroundColor: document.backgroundColor }"
          @click="handleDocumentClick(document.id)"
        >
          <view class="document-icon-container h-16 flex items-center justify-center">
            <Icon
              :icon="document.icon"
              class="h-10 w-10"
              :style="{ color: document.iconColor }"
            />
          </view>
          <view class="document-title-container px-2 py-3">
            <text class="block truncate text-center text-xs" :style="{ color: document.iconColor }">
              {{ document.title }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.platform-management-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding-top: 12px;
}

.management-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.management-content {
  padding-top: 16px;
  padding-bottom: 20px;
}

.back-button {
  padding: 4px;
}

.documents-grid {
  margin-top: 8px;
}

.document-item {
  display: flex;
  flex-direction: column;
  height: 120px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.document-item:active {
  transform: scale(0.98);
}

.document-icon-container {
  background-color: rgba(255, 255, 255, 0.5);
}

.document-title-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
