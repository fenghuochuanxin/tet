<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '我的案件',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 案件接口定义
interface Case {
  id: string
  caseNumber: string
  caseName: string
  createTime: string
  status: string
  extraStatus?: string
}

// 模拟案件数据
const cases = ref<Case[]>([
  {
    id: '1',
    caseNumber: '2024-TJ001号',
    caseName: '买卖合同纠纷',
    createTime: '2024-09-25 10:24:54',
    status: 'applied',
    extraStatus: '待受理',
  },
  {
    id: '2',
    caseNumber: '2024-TJ002号',
    caseName: '借款合同纠纷',
    createTime: '2024-09-24 17:55:50',
    status: 'success',
    extraStatus: '调解成功',
  },
  {
    id: '3',
    caseNumber: '2024-TJ003号',
    caseName: '租赁合同纠纷',
    createTime: '2024-09-23 17:16:27',
    status: 'processing',
    extraStatus: '调解中',
  },
  {
    id: '4',
    caseNumber: '2024-TJ004号',
    caseName: '劳动合同纠纷',
    createTime: '2024-09-22 09:15:36',
    status: 'canceled',
    extraStatus: '已撤销',
  },
  {
    id: '5',
    caseNumber: '2024-TJ005号',
    caseName: '服务合同纠纷',
    createTime: '2024-09-21 14:30:22',
    status: 'applied',
    extraStatus: '待受理',
  },
])

// 搜索关键词
const searchQuery = ref('')

// 筛选状态
const filterTabs = ['全部', '待受理', '调解中', '调解成功', '已撤销']
const activeFilterTab = ref('全部')

// 过滤后的案件列表
const filteredCases = computed(() => {
  let filtered = [...cases.value]

  // 根据搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.caseNumber.toLowerCase().includes(query)
      || item.caseName.toLowerCase().includes(query)
      || item.createTime.includes(query),
    )
  }

  // 根据状态筛选
  if (activeFilterTab.value !== '全部') {
    filtered = filtered.filter(item =>
      (activeFilterTab.value === '待受理' && item.status === 'applied')
      || (activeFilterTab.value === '调解中' && item.status === 'processing')
      || (activeFilterTab.value === '调解成功' && item.status === 'success')
      || (activeFilterTab.value === '已撤销' && item.status === 'canceled'),
    )
  }

  return filtered
})

// 处理搜索
function handleSearch() {
  console.log('搜索关键词:', searchQuery.value)
  // 搜索逻辑已在computed中处理
}

// 处理筛选标签切换
function handleFilterTabChange(tab: string) {
  activeFilterTab.value = tab
}

// 处理案件点击
function handleCaseClick(caseId: string) {
  router.push({
    path: '/pages-sub/1-dispute-mediation/my-case/case-detail',
    query: { id: caseId },
  })
}

// 处理案件进度查看
function handleViewProgress(caseId: string) {
  router.push({
    path: '/pages-sub/1-dispute-mediation/my-case/case-progress',
    query: { id: caseId },
  })
}

// 获取状态样式
function getStatusClass(status: string) {
  switch (status) {
    case 'applied':
      return 'status-applied'
    case 'processing':
      return 'status-processing'
    case 'success':
      return 'status-success'
    case 'canceled':
      return 'status-canceled'
    default:
      return ''
  }
}

// 获取状态文本
function getStatusText(status: string) {
  switch (status) {
    case 'applied':
      return '待受理'
    case 'processing':
      return '调解中'
    case 'success':
      return '调解成功'
    case 'canceled':
      return '已撤销'
    default:
      return status
  }
}
</script>

<template>
  <view class="my-cases-container">
    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          v-model="searchQuery"
          class="search-input"
          type="text"
          placeholder="搜索案件编号/案件名称"
          placeholder-class="search-placeholder"
          @confirm="handleSearch"
        >
        <text v-if="searchQuery" class="clear-icon" @click="searchQuery = ''">×</text>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-tabs">
      <scroll-view class="filter-scroll" scroll-x>
        <view
          v-for="tab in filterTabs"
          :key="tab"
          class="tab-item"
          :class="{ active: activeFilterTab === tab }"
          @click="handleFilterTabChange(tab)"
        >
          {{ tab }}
        </view>
      </scroll-view>
    </view>

    <!-- 案件列表 -->
    <view class="cases-list">
      <view v-if="filteredCases.length === 0" class="empty-state">
        <text class="empty-text">暂无符合条件的案件</text>
      </view>

      <view
        v-for="caseItem in filteredCases"
        :key="caseItem.id"
        class="case-item"
        @click="handleCaseClick(caseItem.id)"
      >
        <view class="case-header">
          <view class="case-number-section">
            <text class="case-icon">案</text>
            <text class="case-number">{{ caseItem.caseNumber }}</text>
          </view>
          <view class="case-statuses">
            <text class="status-tag" :class="getStatusClass(caseItem.status)">{{ getStatusText(caseItem.status) }}</text>
          </view>
        </view>

        <view class="case-info">
          <text class="case-name">{{ caseItem.caseName }}</text>
          <text class="case-time">{{ caseItem.createTime }}</text>

          <view class="action-buttons">
            <button class="progress-btn" size="mini" @click.stop="handleViewProgress(caseItem.id)">
              案件进度
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.my-cases-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 搜索栏样式 */
.search-container {
  padding: 12px;
  background-color: #ffffff;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 8px 16px;
}

.search-icon {
  font-size: 16px;
  color: #999999;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 32px;
  font-size: 14px;
  background-color: transparent;
}

.search-placeholder {
  color: #999999;
}

.clear-icon {
  font-size: 16px;
  color: #999999;
  padding: 4px;
}

/* 筛选标签样式 */
.filter-tabs {
  background-color: #ffffff;
  margin-bottom: 12px;
}

.filter-scroll {
  white-space: nowrap;
  padding: 0 12px;
}

.tab-item {
  display: inline-block;
  padding: 12px 16px;
  font-size: 14px;
  color: #666666;
  position: relative;
}

.tab-item.active {
  color: #1e90ff;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #1e90ff;
  border-radius: 1.5px;
}

/* 案件列表样式 */
.cases-list {
  padding: 0 12px 12px;
}

.empty-state {
  background-color: #ffffff;
  padding: 40px 0;
  text-align: center;
  border-radius: 8px;
}

.empty-text {
  font-size: 14px;
  color: #999999;
}

.case-item {
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.case-number-section {
  display: flex;
  align-items: center;
}

.case-icon {
  width: 24px;
  height: 24px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 8px;
}

.case-number {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.case-statuses {
  display: flex;
  gap: 8px;
}

.status-tag {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.status-applied {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-processing {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-success {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-canceled {
  background-color: #f5f5f5;
  color: #999999;
}

.case-info {
  position: relative;
}

.case-name {
  display: block;
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
}

.case-time {
  font-size: 12px;
  color: #999999;
}

.action-buttons {
  position: absolute;
  right: 0;
  top: 0;
}

.progress-btn {
  font-size: 12px;
  padding: 4px 12px;
  background-color: #f0f0f0;
  color: #666666;
  border: none;
  border-radius: 4px;
}
</style>
