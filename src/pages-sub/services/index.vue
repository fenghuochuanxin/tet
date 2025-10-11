<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { FeatureType, handleAuthRequiredFeature } from '@/utils/index'

const userStore = useUserStore()

// 功能列表数据
const features = [
  {
    id: FeatureType['纠纷调解'],
    name: '纠纷调解',
    description: '专业的纠纷调解服务，帮助您快速解决各类争议',
    icon: '⛑️',
  },
  {
    id: FeatureType['仲裁办理'],
    name: '仲裁办理',
    description: '提供专业的仲裁服务，高效解决合同纠纷',
    icon: '⚖️',
  },
  {
    id: FeatureType['法律咨询'],
    name: '法律咨询',
    description: '专业律师在线解答法律问题，提供法律建议',
    icon: '📚',
  },
  {
    id: FeatureType['案件代理'],
    name: '案件代理',
    description: '专业律师团队为您代理各类法律案件',
    icon: '👨‍⚖️',
  },
]

// 处理功能点击
function handleFeatureClick(feature: any) {
  handleAuthRequiredFeature(feature.id, () => {
    // 已认证时的处理逻辑
    console.log(`进入${feature.name}功能`)
    // 这里可以添加实际的功能跳转逻辑
    uni.showToast({
      title: `已进入${feature.name}功能`,
      icon: 'success',
    })
  })
}

// 获取用户认证状态显示文本
function getAuthStatusText(featureId: string): string {
  const isAuth = userStore.checkAuthStatus(featureId)
  return isAuth ? '已认证' : '未认证'
}
</script>

<template>
  <view class="services-container">
    <view class="services-header">
      <text class="services-title">法律服务</text>
      <text class="services-subtitle">请选择您需要的法律服务</text>
    </view>

    <view class="services-list">
      <view
        v-for="feature in features"
        :key="feature.id"
        class="service-item"
        @click="handleFeatureClick(feature)"
      >
        <view class="service-icon">
          <text :class="feature.icon" />
        </view>
        <view class="service-info">
          <text class="service-name">{{ feature.name }}</text>
          <text class="service-description">{{ feature.description }}</text>
          <text class="service-status" :class="userStore.checkAuthStatus(feature.id) ? 'status-auth' : 'status-unauth'">
            {{ getAuthStatusText(feature.id) }}
          </text>
        </view>
      </view>
    </view>

    <view class="services-footer">
      <text class="footer-text">温馨提示：完成任意一个功能的实名认证后，其他功能无需再次实名认证</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.services-container {
  padding: 30px 20px;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.services-header {
  text-align: center;
  margin-bottom: 30px;
}

.services-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
}

.services-subtitle {
  font-size: 14px;
  color: #666;
  display: block;
}

.services-list {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.service-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
}

.service-icon {
  width: 60px;
  height: 60px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.service-icon text {
  font-size: 32px;
}

.service-info {
  flex: 1;
}

.service-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.service-description {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 8px;
  line-height: 1.4;
}

.service-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-auth {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-unauth {
  background-color: #fff1f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.services-footer {
  margin-top: 30px;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: #999;
  display: block;
  line-height: 1.6;
}
</style>
