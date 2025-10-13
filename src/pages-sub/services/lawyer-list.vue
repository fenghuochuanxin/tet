<script setup lang="ts">
import { computed, ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '法律咨询',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 搜索关键词
const searchKeyword = ref('')

// 筛选条件
const filters = ref({
  caseType: '全部',
  sortBy: '好评最多',
  region: '全部',
})

// 模拟律师数据
const lawyers = ref([
  {
    id: '1',
    name: '王鹏年',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangpengnian',
    organization: '庆阳仲裁委员会调解中心',
    expertise: ['借款纠纷', '买卖纠纷', '租赁纠纷', '交通事故'],
    isOnline: true,
    接待量: 80,
    rating: 5.0,
  },
  {
    id: '2',
    name: '刘宇',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuyu',
    organization: '庆阳仲裁委员会调解中心',
    expertise: [],
    isOnline: false,
    接待量: 143,
    rating: 5.0,
  },
  {
    id: '3',
    name: '李海琴',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lihaiqin',
    organization: '庆阳仲裁委员会调解中心',
    expertise: ['买卖纠纷', '建设工程'],
    isOnline: false,
    接待量: 120,
    rating: 4.8,
  },
  {
    id: '4',
    name: '张伟',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei',
    organization: '庆阳仲裁委员会调解中心',
    expertise: ['婚姻家庭', '继承纠纷'],
    isOnline: true,
    接待量: 95,
    rating: 4.9,
  },
  {
    id: '5',
    name: '王丽',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangli',
    organization: '庆阳仲裁委员会调解中心',
    expertise: ['劳动争议', '侵权责任'],
    isOnline: true,
    接待量: 110,
    rating: 4.7,
  },
])

// 筛选条件选项
const caseTypes = ['全部', '借款纠纷', '买卖纠纷', '租赁纠纷', '交通事故', '婚姻家庭', '劳动争议', '建设工程', '继承纠纷', '侵权责任']
const sortOptions = ['好评最多', '接待量最多', '距离最近']
const regions = ['全部', '北京市', '上海市', '广东省', '江苏省', '浙江省', '四川省', '湖北省', '湖南省', '河南省']

// 筛选状态
const filterStatus = ref({
  caseType: false,
  sortBy: false,
  region: false,
})

// 过滤后的律师列表
const filteredLawyers = computed(() => {
  let result = [...lawyers.value]

  // 按姓名搜索
  if (searchKeyword.value.trim()) {
    result = result.filter(lawyer =>
      lawyer.name.includes(searchKeyword.value.trim()),
    )
  }

  // 按案件类型筛选
  if (filters.value.caseType !== '全部') {
    result = result.filter(lawyer =>
      lawyer.expertise.some(exp => exp.includes(filters.value.caseType)),
    )
  }

  // 按排序方式排序
  if (filters.value.sortBy === '好评最多') {
    result.sort((a, b) => b.rating - a.rating)
  }
  else if (filters.value.sortBy === '接待量最多') {
    result.sort((a, b) => b.接待量 - a.接待量)
  }

  // 按地区筛选（这里仅作示例，实际应用中需要更多地区信息）
  if (filters.value.region !== '全部') {
    // 假设我们有地区信息，这里仅作示例
    result = result.filter(() => Math.random() > 0.2)
  }

  return result
})

// 打开筛选对话框
function openFilterDialog(type: string) {
  // 关闭其他筛选框
  Object.keys(filterStatus.value).forEach((key) => {
    if (key !== type) {
      filterStatus.value[key as keyof typeof filterStatus.value] = false
    }
  })

  // 切换当前筛选框状态
  filterStatus.value[type as keyof typeof filterStatus.value] = !filterStatus.value[type as keyof typeof filterStatus.value]
}

// 选择筛选条件
function selectFilter(type: string, value: string) {
  filters.value[type as keyof typeof filters.value] = value
  filterStatus.value[type as keyof typeof filterStatus.value] = false
}

// 执行搜索
function handleSearch() {
  // 这里可以添加搜索逻辑，目前已经在computed中处理
}

// 跳转到律师详情页面
function goToConsultation(lawyer: any) {
  uni.navigateTo({
    url: `/pages-sub/services/lawyer-detail?id=${lawyer.id}&name=${lawyer.name}`,
  })
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="lawyer-list-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        法律咨询
      </view>
      <view class="header-right" />
    </view>

    <!-- 顶部横幅 -->
    <view class="banner">
      <view class="banner-content">
        <text class="banner-title">专注优质法律服务</text>
        <text class="banner-subtitle">律师覆盖面广 专业咨询指方向</text>
        <button class="banner-button" open-type="share">
          法律咨询
        </button>
      </view>
      <image src="https://img95.699pic.com/xsj/0y/2v/oq.jpg!/fh/300" class="banner-image" mode="aspectFill" />
    </view>

    <!-- 搜索区域 -->
    <view class="search-container">
      <view class="search-bar">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="请输入律师姓名"
          class="search-input"
          @confirm="handleSearch"
        >
        <text class="search-icon">🔍</text>
      </view>
      <button class="search-button" @click="handleSearch">
        搜索
      </button>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-container">
      <view class="filter-item" @click="openFilterDialog('caseType')">
        <text class="filter-text">案件类型</text>
        <text class="filter-value">{{ filters.caseType }}</text>
        <text class="filter-arrow">↓</text>
      </view>
      <view class="filter-item" @click="openFilterDialog('sortBy')">
        <text class="filter-text">好评</text>
        <text class="filter-value">{{ filters.sortBy }}</text>
        <text class="filter-arrow">↓</text>
      </view>
      <view class="filter-item" @click="openFilterDialog('region')">
        <text class="filter-text">省市区</text>
        <text class="filter-value">{{ filters.region }}</text>
        <text class="filter-arrow">↓</text>
      </view>
    </view>

    <!-- 筛选对话框 -->
    <view v-if="filterStatus.caseType" class="filter-dialog">
      <view class="filter-dialog-content">
        <view class="filter-dialog-header">
          <text class="filter-dialog-cancel" @click="filterStatus.caseType = false">取消</text>
          <text class="filter-dialog-confirm" @click="filterStatus.caseType = false">确认</text>
        </view>
        <view class="filter-dialog-body">
          <view
            v-for="type in caseTypes" :key="type"
            class="filter-dialog-item"
            :class="{ active: filters.caseType === type }"
            @click="selectFilter('caseType', type)"
          >
            {{ type }}
          </view>
        </view>
      </view>
    </view>

    <view v-if="filterStatus.sortBy" class="filter-dialog">
      <view class="filter-dialog-content">
        <view class="filter-dialog-header">
          <text class="filter-dialog-cancel" @click="filterStatus.sortBy = false">取消</text>
          <text class="filter-dialog-confirm" @click="filterStatus.sortBy = false">确认</text>
        </view>
        <view class="filter-dialog-body">
          <view
            v-for="option in sortOptions" :key="option"
            class="filter-dialog-item"
            :class="{ active: filters.sortBy === option }"
            @click="selectFilter('sortBy', option)"
          >
            {{ option }}
          </view>
        </view>
      </view>
    </view>

    <view v-if="filterStatus.region" class="filter-dialog">
      <view class="filter-dialog-content">
        <view class="filter-dialog-header">
          <text class="filter-dialog-cancel" @click="filterStatus.region = false">取消</text>
          <text class="filter-dialog-confirm" @click="filterStatus.region = false">确认</text>
        </view>
        <view class="filter-dialog-body">
          <view
            v-for="region in regions" :key="region"
            class="filter-dialog-item"
            :class="{ active: filters.region === region }"
            @click="selectFilter('region', region)"
          >
            {{ region }}
          </view>
        </view>
      </view>
    </view>

    <!-- 律师列表 -->
    <view class="lawyers-list">
      <view v-for="lawyer in filteredLawyers" :key="lawyer.id" class="lawyer-item">
        <view class="lawyer-item-header">
          <image :src="lawyer.avatar" class="lawyer-avatar" mode="aspectFill" style="cursor: pointer;" @click="goToConsultation(lawyer)" />
          <view class="lawyer-info">
            <view class="lawyer-name-section">
              <text class="lawyer-name">{{ lawyer.name }}</text>
              <text v-if="lawyer.isOnline" class="lawyer-status online">在线</text>
              <text v-else class="lawyer-status offline">离线</text>
            </view>
            <text class="lawyer-organization">所属机构：{{ lawyer.organization }}</text>
            <text class="lawyer-expertise">擅长领域：{{ lawyer.expertise.length > 0 ? lawyer.expertise.join('，') : '暂无信息' }}</text>
          </view>
        </view>
        <view class="lawyer-item-footer">
          <view class="lawyer-stats">
            <text class="lawyer-stats-item">免费</text>
            <text class="lawyer-stats-item">接待量{{ lawyer.接待量 }}</text>
            <view class="lawyer-rating">
              <text v-for="i in 5" :key="i" class="star" :class="{ active: i <= lawyer.rating }">{{ i <= lawyer.rating ? '★' : '☆' }}</text>
            </view>
          </view>
          <button class="consultation-button" @click="goToConsultation(lawyer)">
            去咨询
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.lawyer-list-container {
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

.banner {
  position: relative;
  height: 150px;
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
  overflow: hidden;
}

.banner-content {
  flex: 1;
  z-index: 1;
}

.banner-title {
  font-size: 18px;
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

.banner-subtitle {
  font-size: 12px;
  opacity: 0.9;
  display: block;
  margin-bottom: 12px;
}

.banner-button {
  background-color: white;
  color: #1890ff;
  font-size: 12px;
  padding: 4px 16px;
  border-radius: 20px;
  line-height: 1.5;
}

.banner-image {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 120px;
  opacity: 0.3;
}

.search-container {
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-bar {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 16px;
}

.search-input {
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
}

.search-icon {
  margin-left: 8px;
  color: #999999;
}

.search-button {
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  line-height: 1.5;
}

.filter-container {
  display: flex;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.filter-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  cursor: pointer;
  position: relative;
}

.filter-text {
  font-size: 14px;
  color: #333333;
  margin-right: 4px;
}

.filter-value {
  font-size: 14px;
  color: #1890ff;
  margin-right: 4px;
}

.filter-arrow {
  font-size: 12px;
  color: #999999;
}

.filter-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.filter-dialog-content {
  background-color: white;
  width: 100%;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.filter-dialog-header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-dialog-cancel,
.filter-dialog-confirm {
  font-size: 16px;
  padding: 0 16px;
}

.filter-dialog-cancel {
  color: #999999;
}

.filter-dialog-confirm {
  color: #1890ff;
  font-weight: bold;
}

.filter-dialog-body {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
}

.filter-dialog-item {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: #333333;
}

.filter-dialog-item.active {
  color: #1890ff;
  font-weight: bold;
}

.lawyers-list {
  padding: 16px;
  background-color: #f8f8f8;
}

.lawyer-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.lawyer-item-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.lawyer-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.lawyer-info {
  flex: 1;
}

.lawyer-name-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.lawyer-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.lawyer-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

.lawyer-status.online {
  background-color: #f0f9ff;
  color: #1890ff;
}

.lawyer-status.offline {
  background-color: #f5f5f5;
  color: #999999;
}

.lawyer-organization,
.lawyer-expertise {
  font-size: 13px;
  color: #666666;
  display: block;
  margin-bottom: 2px;
}

.lawyer-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.lawyer-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lawyer-stats-item {
  font-size: 12px;
  color: #666666;
  background-color: #f5f5f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.lawyer-rating {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 12px;
  color: #dddddd;
}

.star.active {
  color: #ffb400;
}

.consultation-button {
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  line-height: 1.5;
}
</style>
