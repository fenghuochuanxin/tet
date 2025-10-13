<script setup lang="ts">
import { ref } from 'vue'
import ExampleCard from '@/components/ExampleCard.vue'

// 演示数据
const cardData = [
  {
    id: '1',
    title: '合同服务',
    description: '提供各类合同模板下载和定制服务',
    icon: '📄',
    type: 'primary',
  },
  {
    id: '2',
    title: '法律咨询',
    description: '专业律师在线解答法律问题',
    icon: '⚖️',
    type: 'success',
  },
  {
    id: '3',
    title: '仲裁申请',
    description: '快速提交仲裁申请，解决纠纷',
    icon: '🏛️',
    type: 'warning',
  },
  {
    id: '4',
    title: '文书服务',
    description: '法律文书撰写和审查服务',
    icon: '✍️',
    type: 'danger',
  },
]

const searchKeyword = ref('')
const filteredCards = ref(cardData)

function handleSearch() {
  if (!searchKeyword.value) {
    filteredCards.value = cardData
    return
  }
  filteredCards.value = cardData.filter(card =>
    card.title.includes(searchKeyword.value)
    || card.description.includes(searchKeyword.value),
  )
}

function handleReset() {
  searchKeyword.value = ''
  filteredCards.value = cardData
}
</script>

<template>
  <view class="page-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="text-xl font-bold">组件演示</text>
      <text class="text-sm text-gray-500">卡片组件展示</text>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar mb-6 flex items-center gap-2">
      <view class="relative flex-1">
        <uni-icons class="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2" name="search" size="16" />
        <input
          v-model="searchKeyword"
          class="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="搜索服务类型..."
          @input="handleSearch"
        >
      </view>
      <button class="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600" @click="handleReset">
        重置
      </button>
    </view>

    <!-- 卡片列表 -->
    <view class="card-list gap-4">
      <example-card
        v-for="card in filteredCards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :type="card.type"
      />
    </view>

    <!-- 无结果提示 -->
    <view v-if="filteredCards.length === 0" class="no-result py-10 text-center">
      <uni-icons name="empty" size="60" class="mb-2 text-gray-300" />
      <text class="text-gray-500">未找到相关服务</text>
    </view>

    <!-- 操作按钮区 -->
    <view class="action-buttons mb-4 mt-8 flex justify-center gap-4">
      <button class="rounded-full bg-blue-500 px-6 py-3 text-white font-medium">
        查看全部服务
      </button>
      <button class="rounded-full bg-gray-100 px-6 py-3 text-gray-700 font-medium">
        联系客服
      </button>
    </view>
  </view>
</template>

<style scoped>
.page-container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f9fafb;
}

.page-header {
  margin-bottom: 24px;
}

.card-list {
  display: flex;
  flex-direction: column;
}

.action-buttons {
  margin-top: 32px;
}

button {
  transition: all 0.3s ease;
}

button:active {
  opacity: 0.8;
}

.no-result {
  margin-top: 60px;
}
</style>
