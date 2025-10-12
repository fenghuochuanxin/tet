<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
const activeFilterTab = ref('all') // all, name, field, rating, organization
const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'field', label: '擅长领域' },
  { key: 'rating', label: '好评最多' },
  { key: 'organization', label: '调解机构' },
]

// 擅长领域选项
const expertiseFields = [
  '合同纠纷',
  '房产纠纷',
  '婚姻家庭',
  '劳动争议',
  '知识产权',
  '侵权责任',
  '债务纠纷',
  '继承纠纷',
]

// 调解机构选项
const organizations = [
  '北京市海淀区调解中心',
  '上海市浦东新区调解委员会',
  '广州市天河区人民调解协会',
  '深圳市南山区商事调解中心',
  '杭州市西湖区劳动争议调解委员会',
]

// 当前选中的擅长领域和调解机构
const selectedField = ref('')
const selectedOrganization = ref('')

// 模拟调解员数据
interface Mediator {
  id: string
  name: string
  avatar: string
  title: string
  organization: string
  expertise: string[]
  rating: number
  cases: number
  successRate: number
}

const mediators = ref<Mediator[]>([
  {
    id: '1',
    name: '李明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming',
    title: '高级调解员',
    organization: '北京市海淀区调解中心',
    expertise: ['合同纠纷', '房产纠纷'],
    rating: 4.9,
    cases: 328,
    successRate: 96.8,
  },
  {
    id: '2',
    name: '张华',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhanghua',
    title: '资深调解员',
    organization: '上海市浦东新区调解委员会',
    expertise: ['婚姻家庭', '继承纠纷'],
    rating: 4.8,
    cases: 286,
    successRate: 94.5,
  },
  {
    id: '3',
    name: '王芳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang',
    title: '专家调解员',
    organization: '广州市天河区人民调解协会',
    expertise: ['劳动争议', '侵权责任'],
    rating: 4.9,
    cases: 412,
    successRate: 97.2,
  },
  {
    id: '4',
    name: '刘强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuqiang',
    title: '高级调解员',
    organization: '深圳市南山区商事调解中心',
    expertise: ['债务纠纷', '合同纠纷'],
    rating: 4.7,
    cases: 253,
    successRate: 93.7,
  },
  {
    id: '5',
    name: '赵敏',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaomin',
    title: '资深调解员',
    organization: '杭州市西湖区劳动争议调解委员会',
    expertise: ['知识产权', '侵权责任'],
    rating: 4.8,
    cases: 198,
    successRate: 95.1,
  },
])

// 过滤后的调解员列表
const filteredMediators = computed(() => {
  let result = [...mediators.value]

  // 按搜索关键词过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(mediator =>
      mediator.name.toLowerCase().includes(query)
      || mediator.title.toLowerCase().includes(query)
      || mediator.organization.toLowerCase().includes(query)
      || mediator.expertise.some(field => field.toLowerCase().includes(query)),
    )
  }

  // 按筛选条件过滤
  if (activeFilterTab.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  }
  else if (activeFilterTab.value === 'field' && selectedField.value) {
    result = result.filter(mediator =>
      mediator.expertise.includes(selectedField.value),
    )
  }
  else if (activeFilterTab.value === 'organization' && selectedOrganization.value) {
    result = result.filter(mediator =>
      mediator.organization === selectedOrganization.value,
    )
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

  // 重置其他筛选条件
  if (key !== 'field') {
    selectedField.value = ''
  }
  if (key !== 'organization') {
    selectedOrganization.value = ''
  }
}

// 处理擅长领域选择
function handleFieldSelect(field: string) {
  selectedField.value = selectedField.value === field ? '' : field
}

// 处理调解机构选择
function handleOrganizationSelect(org: string) {
  selectedOrganization.value = selectedOrganization.value === org ? '' : org
}

// 处理调解员点击
function handleMediatorClick(mediatorId: string) {
  console.log('handleMediatorClick called with id:', mediatorId)
  // 使用uni-app的页面跳转API，确保参数正确传递
  uni.navigateTo({
    url: `/pages-sub/services/mediator-detail?id=${mediatorId}`,
    success: () => {
      console.log('成功跳转到调解员详情页，ID:', mediatorId)
    },
    fail: (err) => {
      console.error('跳转到调解员详情页失败:', err)
    },
  })
}

// 处理申请调解
function handleApplyMediation() {
  // 跳转到申请调解页面
  uni.navigateTo({
    url: '/pages-sub/services/application-mediation',
    success: () => {
      console.log('成功跳转到申请调解页面')
    },
    fail: (err) => {
      console.error('跳转到申请调解页面失败:', err)
      uni.showToast({
        title: '跳转失败，请稍后重试',
        icon: 'none',
      })
    },
  })
}

// 处理我的案件
function handleMyCases() {
  // 后续功能实现
  console.log('我的案件')
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 页面加载时检查认证状态
onMounted(() => {
  // 实际项目中可以在这里检查用户是否已经实名认证
  // 如果未认证，可以跳转到认证页面
})
</script>

<template>
  <view class="dispute-mediation-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        纠纷调解服务
      </view>
      <view class="header-right" />
    </view>

    <!-- Banner图片 -->
    <view class="banner-section">
      <image src="/static/images/banner-contract-service.svg" mode="aspectFill" class="banner-image" />
    </view>

    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="search-bar" :class="{ focused: isSearchFocused }">
        <text class="search-icon">🔍</text>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索调解员姓名、擅长领域、机构"
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

    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <button class="primary-button" @click="handleApplyMediation">
        申请调解
      </button>
      <button class="secondary-button" @click="handleMyCases">
        我的案件
      </button>
    </view>

    <!-- 筛选条件面板 -->
    <view class="filter-panel">
      <!-- 擅长领域筛选 -->
      <view v-if="activeFilterTab === 'field'" class="filter-content">
        <view class="filter-title">
          选择擅长领域
        </view>
        <view class="filter-options">
          <view
            v-for="field in expertiseFields"
            :key="field"
            class="filter-option"
            :class="{ selected: selectedField === field }"
            @click="handleFieldSelect(field)"
          >
            {{ field }}
          </view>
        </view>
      </view>

      <!-- 调解机构筛选 -->
      <view v-if="activeFilterTab === 'organization'" class="filter-content">
        <view class="filter-title">
          选择调解机构
        </view>
        <view class="filter-options">
          <view
            v-for="org in organizations"
            :key="org"
            class="filter-option"
            :class="{ selected: selectedOrganization === org }"
            @click="handleOrganizationSelect(org)"
          >
            {{ org }}
          </view>
        </view>
      </view>
    </view>

    <!-- 调解员列表 -->
    <view class="mediators-list">
      <view class="section-title">
        <text>调解员列表 ({{ filteredMediators.length }})</text>
      </view>

      <view v-if="filteredMediators.length === 0" class="empty-state">
        <text class="empty-text">暂无符合条件的调解员</text>
      </view>

      <view
        v-for="mediator in filteredMediators"
        :key="mediator.id"
        class="mediator-item"
        @click="handleMediatorClick(mediator.id)"
      >
        <image :src="mediator.avatar" alt="{{ mediator.name }}" class="mediator-avatar" />
        <view class="mediator-info">
          <view class="mediator-header">
            <text class="mediator-name">{{ mediator.name }}</text>
            <text class="mediator-title">{{ mediator.title }}</text>
          </view>
          <text class="mediator-organization">{{ mediator.organization }}</text>
          <view class="mediator-tags">
            <view v-for="field in mediator.expertise" :key="field" class="expertise-tag">
              {{ field }}
            </view>
          </view>
          <view class="mediator-stats">
            <view class="stat-item">
              <text class="stat-value">{{ mediator.rating }}</text>
              <text class="stat-label">评分</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">{{ mediator.cases }}</text>
              <text class="stat-label">案件</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">{{ mediator.successRate }}%</text>
              <text class="stat-label">成功率</text>
            </view>
          </view>
        </view>
        <button class="mediate-button" @click.stop="handleMediatorClick(mediator.id)">
          去调解
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.dispute-mediation-container {
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

.search-bar input::placeholder {
  color: #999999;
}

.clear-icon {
  font-size: 16px;
  color: #999999;
  cursor: pointer;
}

/* 筛选标签 */
.filter-tabs {
  background-color: #ffffff;
  margin-top: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-scroll {
  white-space: nowrap;
}

.tab-item {
  display: inline-block;
  padding: 12px 20px;
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
  border-radius: 1px;
}

/* 筛选面板 */
.filter-panel {
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 8px;
}

.filter-content {
  width: 100%;
}

.filter-title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-option {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 13px;
  color: #666666;
}

.filter-option.selected {
  background-color: #07c160;
  color: #ffffff;
}

/* 调解员列表 */
.mediators-list {
  padding: 0 16px 20px;
}

.section-title {
  padding: 12px 0;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

.empty-text {
  font-size: 14px;
  color: #999999;
}

.mediator-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

.mediator-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
}

.mediator-info {
  flex: 1;
}

.mediator-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.mediator-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-right: 8px;
}

.mediator-title {
  font-size: 12px;
  color: #07c160;
  background-color: #f0fdf4;
  padding: 2px 8px;
  border-radius: 10px;
}

.mediator-organization {
  font-size: 12px;
  color: #999999;
  margin-bottom: 8px;
  display: block;
}

.mediator-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.expertise-tag {
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
  font-size: 12px;
  color: #666666;
}

.mediator-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}

.stat-label {
  font-size: 11px;
  color: #999999;
  margin-top: 2px;
}

.mediate-button {
  background-color: #1e90ff;
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.mediator-arrow {
  color: #999999;
  font-size: 14px;
}

/* Banner样式 */
.banner-section {
  width: 100%;
  margin-bottom: 16px;
}

.banner-image {
  width: 100%;
  height: 160px;
  border-radius: 8px;
}

/* 底部按钮样式 */
.bottom-buttons {
  display: flex;
  gap: 12px;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.primary-button {
  flex: 1;
  height: 48px;
  background-color: #1989fa;
  color: #ffffff;
  font-size: 16px;
  border-radius: 24px;
  border: none;
}

.secondary-button {
  flex: 1;
  height: 48px;
  background-color: #f5f5f5;
  color: #333333;
  font-size: 16px;
  border-radius: 24px;
  border: none;
}
</style>
