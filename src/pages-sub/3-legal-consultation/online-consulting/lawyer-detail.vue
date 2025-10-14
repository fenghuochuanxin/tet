<script setup lang="ts">
import { ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '律师详情',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 律师信息 - 直接设置默认值，确保页面总是有内容显示
const lawyerInfo = ref({
  id: '1',
  name: '王鹏年',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangpengnian',
  organization: '庆阳仲裁委员会调解中心',
  expertise: ['借款纠纷', '买卖纠纷', '租赁纠纷', '建设工程', '交通事故'],
  isOnline: true,
  接待量: 80,
  rating: 5.0,
  description: '暂无信息',
  region: '甘肃省,庆阳市,西峰区',
})

// 页面加载时获取律师信息
function onLoad(options: any) {
  console.log('Lawyer detail page loaded with options:', options)

  // 模拟律师数据 - 包含多个律师信息，确保与列表页完全一致
  const mockLawyers = [
    {
      id: '1',
      name: '王鹏年',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangpengnian',
      organization: '庆阳仲裁委员会调解中心',
      expertise: ['借款纠纷', '买卖纠纷', '租赁纠纷', '交通事故'],
      isOnline: true,
      接待量: 80,
      rating: 5.0,
      description: '暂无信息',
      region: '甘肃省,庆阳市,西峰区',
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
      description: '暂无信息',
      region: '甘肃省,庆阳市,西峰区',
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
      description: '暂无信息',
      region: '甘肃省,庆阳市,西峰区',
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
      description: '暂无信息',
      region: '甘肃省,庆阳市,西峰区',
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
      description: '暂无信息',
      region: '甘肃省,庆阳市,西峰区',
    },
  ]

  // 根据传入的id查找对应的律师信息，如果没有id或未找到，则使用默认值
  let selectedLawyer = mockLawyers[0] // 默认使用第一个律师

  console.log('Received options:', options)

  if (options && options.id) {
    // 确保ID是字符串类型
    const receivedId = String(options.id)
    console.log('Received ID (string):', receivedId)

    // 使用严格相等进行比较
    const found = mockLawyers.find(lawyer => lawyer.id === receivedId)
    console.log('Found lawyer:', found)

    if (found) {
      selectedLawyer = found
    }
    else {
      console.log('Lawyer not found, available IDs:', mockLawyers.map(l => l.id))
    }

    console.log('Selected lawyer:', selectedLawyer)
  }

  // 使用Object.assign确保响应式更新正确生效
  Object.assign(lawyerInfo.value, selectedLawyer)
  console.log('Updated lawyerInfo:', lawyerInfo.value)
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 跳转到聊天页面
function goToChat() {
  console.log('Navigating to chat with:', lawyerInfo.value)
  // 传递完整的律师信息作为JSON字符串
  const lawyerInfoStr = encodeURIComponent(JSON.stringify(lawyerInfo.value))
  uni.navigateTo({
    url: `/pages-sub/services/chat-room?id=${lawyerInfo.value.id}&name=${encodeURIComponent(lawyerInfo.value.name)}&lawyerInfo=${lawyerInfoStr}`,
  })
}
</script>

<template>
  <view class="lawyer-detail-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        {{ lawyerInfo.name }}
      </view>
      <view class="header-right" />
    </view>

    <!-- 律师基本信息 -->
    <view class="lawyer-basic-info">
      <image :src="lawyerInfo.avatar" class="lawyer-avatar" mode="aspectFill" />
      <view class="lawyer-name-section">
        <text class="lawyer-name">{{ lawyerInfo.name }}</text>
        <view class="lawyer-badge">
          已实名
        </view>
      </view>
      <text class="lawyer-organization">所属机构：{{ lawyerInfo.organization }}</text>
    </view>

    <!-- 满意度 -->
    <view class="satisfaction-section">
      <text class="section-title">满意度：</text>
      <view class="lawyer-rating">
        <text v-for="i in 5" :key="i" class="star" :class="{ active: i <= lawyerInfo.rating }">★</text>
      </view>
    </view>

    <!-- 简介 -->
    <view class="info-section">
      <text class="section-title">简介：</text>
      <text class="section-content">{{ lawyerInfo.description }}</text>
    </view>

    <!-- 擅长领域 -->
    <view class="info-section">
      <text class="section-title">擅长领域：</text>
      <text class="section-content">{{ lawyerInfo.expertise.length > 0 ? lawyerInfo.expertise.join(',') : '暂无信息' }}</text>
    </view>

    <!-- 所在地区 -->
    <view class="info-section">
      <text class="section-title">所在地区：</text>
      <text class="section-content">{{ lawyerInfo.region }}</text>
    </view>

    <!-- 咨询按钮 -->
    <view class="bottom-button-container">
      <button class="consultation-button" @click="goToChat">
        去咨询
      </button>
    </view>
  </view>
</template>

<style scoped>
.lawyer-detail-container {
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

.lawyer-basic-info {
  background-color: #ffffff;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.lawyer-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.lawyer-name-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lawyer-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

.lawyer-badge {
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

.lawyer-organization {
  font-size: 14px;
  color: #666666;
}

.satisfaction-section {
  background-color: #ffffff;
  margin-top: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-section {
  background-color: #ffffff;
  margin-top: 12px;
  padding: 16px;
}

.section-title {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
}

.section-content {
  font-size: 14px;
  color: #666666;
  display: block;
  margin-top: 8px;
}

.lawyer-rating {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: #dddddd;
}

.star.active {
  color: #ffb400;
}

.bottom-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: #f8f8f8;
  border-top: 1px solid #f0f0f0;
}

.consultation-button {
  background-color: #1890ff;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 24px;
  line-height: 1.5;
  width: 100%;
}
</style>
