<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationStyle: 'custom', // 隐藏默认导航栏
  },
})

// 搜索相关
const searchQuery = ref('')
const isSearchFocused = ref(false)

// 筛选相关
const activeFilterTab = ref('all') // all, applied, responding, success, failed, canceled
const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'applied', label: '已申请' },
  { key: 'responding', label: '被申请' },
  { key: 'success', label: '调解成功' },
  { key: 'failed', label: '调解失败' },
  { key: 'canceled', label: '已撤销' },
]

// 案件类型定义
interface Case {
  id: string
  caseNumber: string
  caseName: string
  caseType: string
  status: 'applied' | 'responding' | 'success' | 'failed' | 'canceled'
  createTime: string
  mediatorName: string
  respondentName: string
  claimAmount: string
  // 添加额外的状态标签
  extraStatus?: string
}

// 模拟案件数据，更贴近用户提供的图片样式
const cases = ref<Case[]>([
  {
    id: '1',
    caseNumber: '2024-WT690号',
    caseName: 'kings撤销案件',
    caseType: '合同纠纷',
    status: 'applied',
    extraStatus: '已撤销',
    createTime: '2024-09-25 10:24:54',
    mediatorName: '李明',
    respondentName: '张三',
    claimAmount: '5000',
  },
  {
    id: '2',
    caseNumber: '2024-WT689号',
    caseName: '调解协议签署已完成',
    caseType: '债务纠纷',
    status: 'applied',
    extraStatus: '调解成功',
    createTime: '2024-09-24 17:55:50',
    mediatorName: '刘永庆',
    respondentName: '李四',
    claimAmount: '10000',
  },
  {
    id: '3',
    caseNumber: '2024-WT688号',
    caseName: '调解员刘永庆待受理',
    caseType: '劳动纠纷',
    status: 'applied',
    createTime: '2024-09-23 17:16:27',
    mediatorName: '刘永庆',
    respondentName: '王五',
    claimAmount: '8000',
  },
  {
    id: '4',
    caseNumber: '2024-WT687号',
    caseName: '当前案件已仲裁确认，案件号为2024-WQ258号',
    caseType: '房产纠纷',
    status: 'applied',
    extraStatus: '调解成功',
    createTime: '2024-09-23 14:39:28',
    mediatorName: '赵敏',
    respondentName: '赵六',
    claimAmount: '15000',
  },
  {
    id: '5',
    caseNumber: '2024-WT675号',
    caseName: '合同解除纠纷',
    caseType: '合同纠纷',
    status: 'applied',
    extraStatus: '已撤销',
    createTime: '2024-09-22 09:15:36',
    mediatorName: '张华',
    respondentName: '孙七',
    claimAmount: '6000',
  },
])

// 过滤后的案件列表
const filteredCases = computed(() => {
  let result = [...cases.value]

  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(caseItem =>
      caseItem.caseNumber.toLowerCase().includes(query)
      || caseItem.caseName.toLowerCase().includes(query)
      || caseItem.respondentName.toLowerCase().includes(query)
      || caseItem.mediatorName.toLowerCase().includes(query),
    )
  }

  // 按状态筛选
  if (activeFilterTab.value !== 'all') {
    result = result.filter(caseItem => caseItem.status === activeFilterTab.value)
  }

  return result
})

// 处理搜索
function handleSearch() {
  isSearchFocused.value = false
}

// 处理筛选标签切换
function handleFilterTabChange(key: string) {
  activeFilterTab.value = key
}

// 处理案件点击
function handleCaseClick(caseId: string) {
  // 跳转到案件详情页
  console.log('查看案件详情:', caseId)
  uni.navigateTo({
    url: `/pages-sub/history/case-detail?id=${caseId}`,
  })
}

// 处理案件进度查看
function handleViewProgress(caseId: string) {
  // 跳转到案件进度页
  console.log('查看案件进度:', caseId)
  uni.navigateTo({
    url: `/pages-sub/history/case-progress?id=${caseId}`,
  })
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 获取状态对应的中文名称
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    applied: '已申请',
    responding: '被申请',
    success: '调解成功',
    failed: '调解失败',
    canceled: '已撤销',
  }
  return statusMap[status] || '未知状态'
}

// 获取状态对应的样式类名
function getStatusClass(status: string): string {
  const statusClassMap: Record<string, string> = {
    applied: 'status-applied',
    responding: 'status-responding',
    success: 'status-success',
    failed: 'status-failed',
    canceled: 'status-canceled',
  }
  return statusClassMap[status] || ''
}
</script>

<template>
  <view class="my-cases-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        我的案件
      </view>
      <view class="header-right" />
    </view>

    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="search-bar" :class="{ focused: isSearchFocused }">
        <text class="search-icon">🔍</text>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="案件编号/当事人姓名/当事人电话"
          @focus="isSearchFocused = true"
          @confirm="handleSearch"
        >
        <text v-if="searchQuery" class="clear-icon" @click="searchQuery = ''">×</text>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-tabs">
      <scroll-view :scroll-x="true" :show-scrollbar="false" class="tabs-scroll">
        <view
          v-for="tab in filterTabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeFilterTab === tab.key }"
          @click="handleFilterTabChange(tab.key)"
        >
          {{ tab.label }}
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
            <text class="status-tag applied">已申请</text>
            <text v-if="caseItem.extraStatus" class="status-tag" :class="{ success: caseItem.extraStatus === '调解成功', canceled: caseItem.extraStatus === '已撤销' }">{{ caseItem.extraStatus }}</text>
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
  background-color: #f8f8f8;
}

/* 顶部导航栏 */
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
}

/* 搜索栏 */
.search-container {
  padding: 12px 16px;
  background-color: #ffffff;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  background-color: #f5f5f5;
  border-radius: 18px;
  transition: all 0.3s ease;
}

.search-bar.focused {
  background-color: #ffffff;
  border: 1px solid #07c160;
}

.search-icon {
  font-size: 14px;
  color: #999999;
  margin-right: 8px;
}

.search-bar input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333333;
}

.clear-icon {
  font-size: 16px;
  color: #999999;
  padding: 4px;
}

/* 筛选标签 */
.filter-tabs {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-scroll {
  white-space: nowrap;
  padding: 0 8px;
}

.tab-item {
  display: inline-block;
  padding: 12px 16px;
  font-size: 14px;
  color: #666666;
  position: relative;
}

.tab-item.active {
  color: #07c160;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: #07c160;
}

/* 案件列表 */
.cases-list {
  padding: 12px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

.empty-text {
  font-size: 14px;
  color: #999999;
}

.case-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.case-number-section {
  display: flex;
  align-items: center;
}

.case-icon {
  width: 24px;
  height: 24px;
  background-color: #ff6b6b;
  color: #ffffff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 8px;
}

.case-number {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}

.case-statuses {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.status-tag.applied {
  background-color: #e6f7ff;
  color: #1989fa;
}

.status-tag.success {
  background-color: #f6ffed;
  color: #07c160;
}

.status-tag.canceled {
  background-color: #f5f5f5;
  color: #999999;
}

.case-info {
  position: relative;
}

.case-name {
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
  display: block;
  line-height: 1.4;
}

.case-time {
  font-size: 12px;
  color: #999999;
  display: block;
}

.action-buttons {
  position: absolute;
  right: 0;
  top: 0;
}

.progress-btn {
  background-color: #f6ffed;
  color: #07c160;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid #b7eb8f;
}
</style>
