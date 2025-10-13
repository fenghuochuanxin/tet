<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '仲裁确认',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 案件数据接口
interface CaseItem {
  id: string
  status: '已申请' | '已结束' | '已撤销' | '待处理'
  statusColor: string
  statusText: string
  description: string
  createTime: string
}

// 搜索关键词
const searchKeyword = ref('')

// 当前选中的筛选条件
const selectedFilter = ref('全部')

// 筛选条件列表
const filterOptions = ['全部', '已申请', '被申请', '已结束', '已撤销']

// 案件列表数据
const caseList = ref<CaseItem[]>([
  {
    id: '2024-WQ261号',
    status: '已申请',
    statusColor: '#07c160',
    statusText: '立案待审核',
    createTime: '2024-09-25 10:42:10',
    description: '',
  },
  {
    id: '2024-WQ260号',
    status: '已申请',
    statusColor: '#07c160',
    statusText: '仲裁员admin起草调解书',
    createTime: '2024-09-25 09:52:03',
    description: '',
  },
  {
    id: '2024-WQ259号',
    status: '已申请',
    statusColor: '#07c160',
    statusText: '案件修改',
    createTime: '2024-09-23 15:04:30',
    description: '',
  },
  {
    id: '2024-WQ258号',
    status: '已申请',
    statusColor: '#07c160',
    statusText: '案件修改',
    createTime: '2024-09-23 15:51:38',
    description: '',
  },
  {
    id: '2024-WQ250号',
    status: '已结束',
    statusColor: '#ff9500',
    statusText: '被申请人送达回执签署已完成',
    createTime: '2024-09-20 14:30:22',
    description: '',
  },
])

// 案件进度记录
const caseProgressRecords = ref([
  {
    type: 'update',
    content: '仲裁秘书JooLun修改了案件详情',
    time: '2024-09-23 15:51:38',
  },
  {
    type: 'update',
    content: 'nullJooLun修改了案件详情',
    time: '2024-09-23 15:08:36',
  },
  {
    type: 'confirm',
    content: '申请人kings已同意申请仲裁确认并修改案件信息',
    time: '2024-09-23 15:07:40',
  },
])

// 是否显示案件进度弹窗
const showProgressModal = ref(false)

// 当前选中的案件
const currentCase = ref<CaseItem | null>(null)

// 返回上一页
function navigateBack() {
  router.back()
}

// 处理搜索
function handleSearch() {
  // 实际应用中这里应该调用API进行搜索
  console.log('搜索关键词:', searchKeyword.value)
  // 模拟搜索功能
  // 这里可以根据关键词过滤案件列表
}

// 处理筛选条件变化
function handleFilterChange(filter: string) {
  selectedFilter.value = filter
  // 实际应用中这里应该根据筛选条件过滤案件列表
  console.log('筛选条件:', filter)
}

// 处理案件进度点击
function handleCaseProgressClick(caseItem: CaseItem) {
  currentCase.value = caseItem
  showProgressModal.value = true
}

// 关闭案件进度弹窗
function closeProgressModal() {
  showProgressModal.value = false
}

// 处理案件点击，进入案件详情
function handleCaseClick(caseItem: CaseItem) {
  // 跳转到案件详情页面
  router.push({
    path: '/pages-sub/services/arbitration-case-detail',
    query: { caseId: caseItem.id },
  })
}

// 模拟从API获取案件列表
function fetchCaseList() {
  // 实际应用中这里应该调用API获取案件列表
  console.log('获取案件列表')
  // 模拟数据已在初始化时设置
}

// 页面加载时获取案件列表
onMounted(() => {
  fetchCaseList()
})
</script>

<template>
  <view class="arbitration-case-list-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        仲裁确认
      </view>
      <view class="header-right" />
    </view>

    <!-- 搜索区域 -->
    <view class="search-container">
      <input
        v-model="searchKeyword"
        class="search-input"
        type="text"
        placeholder="案件编号/申请人姓名/申请人电话"
        placeholder-class="placeholder-style"
      >
      <button class="search-button" @click="handleSearch">
        搜索
      </button>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-container">
      <view
        v-for="filter in filterOptions"
        :key="filter"
        class="filter-item"
        :class="selectedFilter === filter ? 'active' : ''"
        @click="handleFilterChange(filter)"
      >
        {{ filter }}
      </view>
    </view>

    <!-- 案件列表 -->
    <view class="case-list-container">
      <view
        v-for="caseItem in caseList"
        :key="caseItem.id"
        class="case-item"
        @click="handleCaseClick(caseItem)"
      >
        <view class="case-header">
          <view class="case-id">
            <text class="case-id-icon">🔰</text>
            {{ caseItem.id }}
          </view>
          <view
            class="case-status"
            :style="{ backgroundColor: caseItem.status === '已申请' ? '#07c160' : '#ff9500' }"
          >
            {{ caseItem.status }}
          </view>
        </view>
        <view class="case-description">
          {{ caseItem.statusText }}
        </view>
        <view class="case-footer">
          <text class="case-time">{{ caseItem.createTime }}</text>
          <button
            class="case-progress-button"
            @click.stop="handleCaseProgressClick(caseItem)"
          >
            案件进度
          </button>
        </view>
      </view>
    </view>

    <!-- 案件进度弹窗 -->
    <view v-if="showProgressModal" class="progress-modal-overlay" @click="closeProgressModal">
      <view class="progress-modal-content" @click.stop>
        <view class="progress-modal-header">
          <text class="progress-modal-title">{{ currentCase?.id }} 案件进度</text>
          <text class="progress-modal-close" @click="closeProgressModal">×</text>
        </view>
        <scroll-view class="progress-modal-body" scroll-y>
          <view v-for="(record, index) in caseProgressRecords" :key="index" class="progress-record">
            <view class="progress-dot" :class="record.type">
              <view v-if="index === 0" class="progress-dot-active" />
            </view>
            <view class="progress-content">
              <text class="progress-text">{{ record.content }}</text>
              <text class="progress-time">{{ record.time }}</text>
            </view>
          </view>
        </scroll-view>
        <view class="progress-modal-footer">
          <button class="progress-modal-close-button" @click="closeProgressModal">
            关闭
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.arbitration-case-list-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
}

.header-left {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 18px;
  color: #333333;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.header-right {
  width: 40px;
}

.search-container {
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  flex: 1;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 14px;
  color: #333333;
  background-color: #f5f5f5;
}

.search-button {
  height: 40px;
  padding: 0 16px;
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  border: none;
}

.filter-container {
  display: flex;
  padding: 0 16px;
  background-color: #ffffff;
  overflow-x: auto;
  margin-bottom: 12px;
}

.filter-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #666666;
  white-space: nowrap;
  position: relative;
}

.filter-item.active {
  color: #1989fa;
}

.filter-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background-color: #1989fa;
  border-radius: 1px;
}

.case-list-container {
  padding: 0 16px 20px 16px;
}

.case-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.case-id {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 4px;
}

.case-id-icon {
  font-size: 14px;
}

.case-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #ffffff;
}

.case-description {
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
}

.case-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.case-time {
  font-size: 12px;
  color: #999999;
}

.case-progress-button {
  font-size: 14px;
  color: #1989fa;
  background-color: #ecf5ff;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
}

/* 案件进度弹窗样式 */
.progress-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.progress-modal-content {
  width: 90%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
}

.progress-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.progress-modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.progress-modal-close {
  font-size: 20px;
  color: #999999;
}

.progress-modal-body {
  max-height: 400px;
  padding: 16px;
}

.progress-record {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.progress-record:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 10px;
  width: 2px;
  height: calc(100% + 10px);
  background-color: #f0f0f0;
  z-index: 0;
}

.progress-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #f0f0f0;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.progress-dot.update .progress-dot-active {
  background-color: #1989fa;
}

.progress-dot.confirm .progress-dot-active {
  background-color: #07c160;
}

.progress-dot-active {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.progress-content {
  flex: 1;
}

.progress-text {
  font-size: 14px;
  color: #333333;
  display: block;
  margin-bottom: 4px;
}

.progress-time {
  font-size: 12px;
  color: #999999;
}

.progress-modal-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.progress-modal-close-button {
  width: 100%;
  height: 40px;
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  border: none;
}

/* 适配不同平台 */
@media screen and (min-width: 768px) {
  .arbitration-case-list-container {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
}
</style>
