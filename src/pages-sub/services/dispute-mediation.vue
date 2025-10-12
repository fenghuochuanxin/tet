<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FeatureType, handleAuthRequiredFeature } from '@/utils/index'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '纠纷调解',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 搜索关键词
const searchKeyword = ref('')

// 筛选条件
const filters = reactive({
  specialty: '全部',
  sortBy: '好评最多',
  organization: '全部',
})

// 筛选弹窗状态
const filterDialogs = reactive({
  specialty: false,
  sortBy: false,
  organization: false,
})

// 擅长领域列表
const specialties = ['全部', '借款纠纷', '买卖纠纷', '租赁纠纷', '合同纠纷', '劳动纠纷', '婚姻家庭']

// 调解机构列表
const organizations = ['全部', '南阳市卧龙区商事金融纠纷调解中心', '内蒙古立信多元纠纷调解中心', '庆阳仲裁委员会调解中心']

// 排序选项
const sortOptions = ['好评最多', '接待量最多']

// 模拟调解员数据
const mediators = ref([
  {
    id: 1,
    name: '刘于',
    organization: '庆阳仲裁委员会调解中心',
    specialty: '暂无信息',
    isFree: true,
    caseCount: 143,
    rating: 5,
    avatar: '/static/images/app/mediator1.png',
  },
  {
    id: 2,
    name: '李海琴',
    organization: '庆阳仲裁委员会调解中心',
    specialty: '买卖纠纷,建设工程',
    isFree: true,
    caseCount: 58,
    rating: 5,
    avatar: '/static/images/app/mediator2.png',
  },
  {
    id: 3,
    name: '刘宇',
    organization: '庆阳仲裁委员会调解中心',
    specialty: '暂无信息',
    isFree: true,
    caseCount: 143,
    rating: 5,
    avatar: '/static/images/app/mediator3.png',
  },
])

// 处理搜索
function handleSearch() {
  console.log('搜索关键词:', searchKeyword.value)
  // 实际项目中这里应该调用API进行搜索
}

// 打开筛选弹窗
function openFilterDialog(type: 'specialty' | 'sortBy' | 'organization') {
  filterDialogs[type] = true
}

// 关闭筛选弹窗
function closeFilterDialog(type: 'specialty' | 'sortBy' | 'organization') {
  filterDialogs[type] = false
}

// 应用筛选条件
function applyFilter(type: 'specialty' | 'sortBy' | 'organization', value: string) {
  filters[type] = value
  filterDialogs[type] = false
  // 实际项目中这里应该调用API进行筛选
}

// 处理调解员点击
function handleMediatorClick(mediator: any) {
  console.log('选择调解员:', mediator)
  // 实际项目中这里应该跳转到调解员详情页
}

// 处理去调解
function handleGoMediation(mediator: any) {
  console.log('去调解:', mediator)
  // 检查是否已认证该功能
  handleAuthRequiredFeature(FeatureType['纠纷调解'], () => {
    // 已认证时的处理逻辑
    uni.navigateTo({
      url: '/pages-sub/demo/index', // 这里应该跳转到实际的调解页面
    })
  })
}

// 处理申请调解
function handleApplyMediation() {
  console.log('申请调解')
  // 检查是否已认证该功能
  handleAuthRequiredFeature(FeatureType['纠纷调解'], () => {
    // 已认证时的处理逻辑
    uni.navigateTo({
      url: '/pages-sub/demo/index', // 这里应该跳转到实际的申请调解页面
    })
  })
}

// 处理我的案件
function handleMyCases() {
  console.log('我的案件')
  // 检查是否已认证该功能
  handleAuthRequiredFeature(FeatureType['纠纷调解'], () => {
    // 已认证时的处理逻辑
    uni.navigateTo({
      url: '/pages-sub/demo/index', // 这里应该跳转到实际的我的案件页面
    })
  })
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="dispute-mediation-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        纠纷调解
      </view>
      <view class="header-right" />
    </view>

    <!-- 页面内容 -->
    <view class="page-content">
      <!-- 顶部banner -->
      <view class="banner">
        <image src="/static/images/product1.svg" alt="纠纷调解服务" class="banner-image" />
        <view class="banner-text">
          <view class="banner-title">
            纠纷调解 仲裁确认
          </view>
          <view class="banner-subtitle">
            调解促和谐·真情暖人心
          </view>
        </view>
      </view>

      <!-- 搜索区域 -->
      <view class="search-container">
        <view class="search-bar">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="请输入调解员姓名"
            class="search-input"
          >
          <text class="search-icon">🔍</text>
        </view>
        <button class="search-button" @click="handleSearch">
          搜索
        </button>
      </view>

      <!-- 筛选条件 -->
      <view class="filter-container">
        <view class="filter-item" @click="openFilterDialog('specialty')">
          <text class="filter-text">擅长领域</text>
          <text class="filter-value">{{ filters.specialty }}</text>
          <text class="filter-arrow">↓</text>
        </view>
        <view class="filter-item" @click="openFilterDialog('sortBy')">
          <text class="filter-text">好评最多</text>
          <text class="filter-value">{{ filters.sortBy }}</text>
          <text class="filter-arrow">↓</text>
        </view>
        <view class="filter-item" @click="openFilterDialog('organization')">
          <text class="filter-text">调解机构</text>
          <text class="filter-value">{{ filters.organization }}</text>
          <text class="filter-arrow">↓</text>
        </view>
      </view>

      <!-- 调解员列表 -->
      <view class="mediators-list">
        <view v-for="mediator in mediators" :key="mediator.id" class="mediator-item">
          <view class="mediator-info" @click="handleMediatorClick(mediator)">
            <view class="mediator-avatar">
              <image :src="mediator.avatar" :alt="mediator.name" mode="aspectFill" />
            </view>
            <view class="mediator-details">
              <view class="mediator-name">
                {{ mediator.name }}
              </view>
              <view class="mediator-org">
                所属调解组织：{{ mediator.organization }}
              </view>
              <view class="mediator-specialty">
                擅长领域：{{ mediator.specialty }}
              </view>
              <view class="mediator-stats">
                <view v-if="mediator.isFree" class="free-tag">
                  免费
                </view>
                <view class="case-count">
                  接待量 {{ mediator.caseCount }}
                </view>
                <view class="rating">
                  <text v-for="i in 5" :key="i" class="star" :class="{ active: i <= mediator.rating }">★</text>
                </view>
              </view>
            </view>
          </view>
          <button class="mediate-button" @click.stop="handleGoMediation(mediator)">
            去调解
          </button>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="bottom-buttons">
        <button class="bottom-button apply-button" @click="handleApplyMediation">
          申请调解
        </button>
        <button class="bottom-button cases-button" @click="handleMyCases">
          我的案件
        </button>
      </view>
    </view>

    <!-- 筛选弹窗 -->
    <!-- 擅长领域弹窗 -->
    <uni-popup v-model="filterDialogs.specialty" mode="bottom" class="filter-popup">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">擅长领域</text>
          <text class="popup-close" @click="closeFilterDialog('specialty')">取消</text>
        </view>
        <view class="popup-options">
          <view v-for="specialty in specialties" :key="specialty" class="popup-option" @click="applyFilter('specialty', specialty)">
            <text class="option-text">{{ specialty }}</text>
            <text v-if="filters.specialty === specialty" class="option-check">✓</text>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 排序弹窗 -->
    <uni-popup v-model="filterDialogs.sortBy" mode="bottom" class="filter-popup">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">排序方式</text>
          <text class="popup-close" @click="closeFilterDialog('sortBy')">取消</text>
        </view>
        <view class="popup-options">
          <view v-for="option in sortOptions" :key="option" class="popup-option" @click="applyFilter('sortBy', option)">
            <text class="option-text">{{ option }}</text>
            <text v-if="filters.sortBy === option" class="option-check">✓</text>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 调解机构弹窗 -->
    <uni-popup v-model="filterDialogs.organization" mode="bottom" class="filter-popup">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">调解机构</text>
          <text class="popup-close" @click="closeFilterDialog('organization')">取消</text>
        </view>
        <view class="popup-options">
          <view v-for="org in organizations" :key="org" class="popup-option" @click="applyFilter('organization', org)">
            <text class="option-text">{{ org }}</text>
            <text v-if="filters.organization === org" class="option-check">✓</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss">
.dispute-mediation-container {
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

.page-content {
  padding-bottom: 20px;
}

.banner {
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.banner-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.banner-text {
  text-align: center;
  z-index: 1;
}

.banner-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.banner-subtitle {
  font-size: 14px;
  color: #666666;
}

.search-container {
  padding: 0 20px;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  color: #333333;
  border: none;
  outline: none;
}

.search-icon {
  font-size: 16px;
  color: #999999;
}

.search-button {
  width: 100%;
  height: 40px;
  background-color: #1989fa;
  color: #ffffff;
  font-size: 14px;
  border-radius: 20px;
}

.filter-container {
  display: flex;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  position: relative;
}

.filter-text {
  font-size: 14px;
  color: #333333;
  margin-right: 4px;
}

.filter-value {
  font-size: 14px;
  color: #666666;
  margin-right: 4px;
}

.filter-arrow {
  font-size: 12px;
  color: #999999;
}

.mediators-list {
  background-color: #ffffff;
  padding: 0 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.mediator-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.mediator-item:last-child {
  border-bottom: none;
}

.mediator-info {
  flex: 1;
  display: flex;
  align-items: center;
}

.mediator-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  background-color: #f0f0f0;
}

.mediator-avatar image {
  width: 100%;
  height: 100%;
}

.mediator-details {
  flex: 1;
}

.mediator-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 4px;
}

.mediator-org {
  font-size: 12px;
  color: #666666;
  margin-bottom: 4px;
}

.mediator-specialty {
  font-size: 12px;
  color: #666666;
  margin-bottom: 8px;
}

.mediator-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.free-tag {
  font-size: 12px;
  color: #52c41a;
  background-color: #f6ffed;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #b7eb8f;
}

.case-count {
  font-size: 12px;
  color: #666666;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 12px;
  color: #d9d9d9;
}

.star.active {
  color: #faad14;
}

.mediate-button {
  width: 80px;
  height: 32px;
  background-color: #1989fa;
  color: #ffffff;
  font-size: 14px;
  border-radius: 16px;
  line-height: 32px;
}

.bottom-buttons {
  display: flex;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 30px;
}

.bottom-button {
  flex: 1;
  height: 48px;
  font-size: 16px;
  border-radius: 24px;
}

.apply-button {
  background-color: #1989fa;
  color: #ffffff;
}

.cases-button {
  background-color: #ffffff;
  color: #1989fa;
  border: 1px solid #1989fa;
}

.filter-popup {
  .popup-content {
    background-color: #ffffff;
    border-radius: 12px 12px 0 0;
    padding-bottom: 20px;
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .popup-title {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }

  .popup-close {
    font-size: 16px;
    color: #666666;
  }

  .popup-options {
    max-height: 300px;
    overflow-y: auto;
  }

  .popup-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .popup-option:last-child {
    border-bottom: none;
  }

  .option-text {
    font-size: 14px;
    color: #333333;
  }

  .option-check {
    font-size: 16px;
    color: #1989fa;
  }
}
</style>
