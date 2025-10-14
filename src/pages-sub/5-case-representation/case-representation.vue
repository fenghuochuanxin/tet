<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '案件代理',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 案件数据接口
interface CaseItem {
  id: string
  status: '进行中' | '已完成' | '已撤销' | '待处理'
  statusColor: string
  statusText: string
  description: string
  createTime: string
  clientName: string
  caseType: string
}

// 搜索关键词
const searchKeyword = ref('')

// 当前选中的筛选条件
const selectedFilter = ref('全部')

// 筛选条件列表
const filterOptions = ['全部', '进行中', '已完成', '已撤销', '待处理']

// 案件类型筛选
const caseTypeFilter = ref('全部')
const caseTypeOptions = ['全部', '合同纠纷', '侵权责任纠纷', '婚姻家庭纠纷', '物权纠纷', '知识产权纠纷', '劳动争议']

// 原始案件列表数据
const caseList = ref<CaseItem[]>([
  {
    id: '2024-DL361号',
    status: '进行中',
    statusColor: '#07c160',
    statusText: '代理中，等待开庭',
    createTime: '2024-09-25 10:42:10',
    description: '申请人与被申请人合同纠纷一案',
    clientName: '张三',
    caseType: '合同纠纷',
  },
  {
    id: '2024-DL360号',
    status: '进行中',
    statusColor: '#07c160',
    statusText: '代理中，准备诉讼材料',
    createTime: '2024-09-25 09:52:03',
    description: '申请人与被申请人物权纠纷一案',
    clientName: '李四',
    caseType: '物权纠纷',
  },
  {
    id: '2024-DL359号',
    status: '已完成',
    statusColor: '#ff9500',
    statusText: '案件已结案',
    createTime: '2024-09-23 15:04:30',
    description: '申请人与被申请人侵权责任纠纷一案',
    clientName: '王五',
    caseType: '侵权责任纠纷',
  },
  {
    id: '2024-DL358号',
    status: '待处理',
    statusColor: '#666666',
    statusText: '等待代理律师确认',
    createTime: '2024-09-23 15:51:38',
    description: '申请人与被申请人婚姻家庭纠纷一案',
    clientName: '赵六',
    caseType: '婚姻家庭纠纷',
  },
  {
    id: '2024-DL350号',
    status: '已撤销',
    statusColor: '#999999',
    statusText: '案件已撤销',
    createTime: '2024-09-20 14:30:22',
    description: '申请人与被申请人劳动争议一案',
    clientName: '钱七',
    caseType: '劳动争议',
  },
])

// 根据筛选条件过滤的案件列表
const filteredCaseList = computed(() => {
  let filtered = [...caseList.value]

  // 状态筛选
  if (selectedFilter.value !== '全部') {
    filtered = filtered.filter(item => item.status === selectedFilter.value)
  }

  // 案件类型筛选
  if (caseTypeFilter.value !== '全部') {
    filtered = filtered.filter(item => item.caseType === caseTypeFilter.value)
  }

  // 搜索关键词筛选
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    filtered = filtered.filter(item =>
      item.id.toLowerCase().includes(keyword)
      || item.clientName.toLowerCase().includes(keyword)
      || item.caseType.toLowerCase().includes(keyword)
      || item.description.toLowerCase().includes(keyword),
    )
  }

  return filtered
})

// 案件进度记录
const caseProgressRecords = ref([
  {
    type: 'update',
    content: '代理律师提交了诉讼材料',
    time: '2024-09-23 15:51:38',
  },
  {
    type: 'update',
    content: '法院受理案件',
    time: '2024-09-23 15:08:36',
  },
  {
    type: 'confirm',
    content: '委托人确认代理协议',
    time: '2024-09-23 15:07:40',
  },
  {
    type: 'create',
    content: '案件代理申请已提交',
    time: '2024-09-20 14:30:22',
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

// 处理状态筛选条件变化
function handleFilterChange(filter: string) {
  selectedFilter.value = filter
  // 实际应用中这里应该根据筛选条件过滤案件列表
  console.log('状态筛选条件:', filter)
}

// 处理案件类型筛选变化
function handleCaseTypeChange(type: string) {
  caseTypeFilter.value = type
  // 实际应用中这里应该根据案件类型过滤案件列表
  console.log('案件类型筛选:', type)
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

// 处理案件点击，进入案件修改页面
function handleCaseClick(caseItem: CaseItem) {
  // 跳转到案件修改页面（与仲裁办理-我的案件修改页面代码基本一致）
  router.push({
    path: '/pages-sub/services/arbitration-case-detail',
    query: { caseId: caseItem.id, mode: 'edit' },
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
  <view class="case-representation-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        案件代理
      </view>
      <view class="header-right" />
    </view>

    <!-- 搜索区域 -->
    <view class="search-container">
      <input
        v-model="searchKeyword"
        class="search-input"
        type="text"
        placeholder="案件编号/委托人姓名/案件类型"
        placeholder-class="placeholder-style"
      >
      <button class="search-button" @click="handleSearch">
        搜索
      </button>
    </view>

    <!-- 综合筛选条件 -->
    <view class="filter-container">
      <!-- 状态筛选 -->
      <view
        v-for="filter in filterOptions"
        :key="filter"
        class="filter-item"
        :class="selectedFilter === filter ? 'active' : ''"
        @click="handleFilterChange(filter)"
      >
        {{ filter }}
      </view>

      <!-- 分隔符 -->
      <view class="filter-divider">
        |
      </view>

      <!-- 案件类型筛选 -->
      <view
        v-for="type in caseTypeOptions"
        :key="type"
        class="filter-item"
        :class="caseTypeFilter === type ? 'active' : ''"
        @click="handleCaseTypeChange(type)"
      >
        {{ type }}
      </view>
    </view>

    <!-- 案件列表 -->
    <view class="case-list-container">
      <view
        v-for="caseItem in filteredCaseList"
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
            :style="{ backgroundColor: caseItem.statusColor }"
          >
            {{ caseItem.status }}
          </view>
        </view>
        <view class="case-description">
          {{ caseItem.description }}
        </view>
        <view class="case-info">
          <text class="case-client">委托人：{{ caseItem.clientName }}</text>
          <text class="case-type">案件类型：{{ caseItem.caseType }}</text>
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
.case-representation-container {
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
  display: flex;
  padding: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.search-input {
  flex: 1;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  padding: 0 12px;
  font-size: 14px;
}

.placeholder-style {
  color: #999999;
}

.search-button {
  width: 80px;
  height: 40px;
  background-color: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 14px;
}

.filter-container {
  display: flex;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

/* 隐藏滚动条但保留滚动功能 */
.filter-container::-webkit-scrollbar {
  display: none;
}

.filter-item {
  padding: 8px 16px;
  margin-right: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666666;
}

.filter-item.active {
  background-color: #07c160;
  color: #ffffff;
}

.filter-divider {
  display: flex;
  align-items: center;
  color: #e0e0e0;
  margin: 0 8px;
  font-size: 16px;
}

.case-list-container {
  padding: 12px;
}

.case-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.case-id {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.case-id-icon {
  margin-right: 4px;
}

.case-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #ffffff;
}

.case-description {
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
  line-height: 1.5;
}

.case-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.case-client,
.case-type {
  font-size: 12px;
  color: #666666;
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
  padding: 6px 16px;
  background-color: #f0f0f0;
  color: #666666;
  border: none;
  border-radius: 4px;
  font-size: 12px;
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
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 8px;
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
  font-size: 24px;
  color: #999999;
}

.progress-modal-body {
  max-height: 40vh;
  padding: 16px;
}

.progress-record {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
  position: relative;
}

.progress-dot.active {
  background-color: #07c160;
}

.progress-dot-active {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ffffff;
}

.progress-content {
  flex: 1;
}

.progress-text {
  display: block;
  font-size: 14px;
  color: #333333;
  margin-bottom: 4px;
}

.progress-time {
  display: block;
  font-size: 12px;
  color: #999999;
}

.progress-modal-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.progress-modal-close-button {
  padding: 8px 32px;
  background-color: #07c160;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}
</style>
