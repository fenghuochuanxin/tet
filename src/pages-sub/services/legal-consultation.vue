<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '法律咨询',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 返回上一页
function navigateBack() {
  router.back()
}

// 跳转到在线咨询
function navigateToOnlineConsultation() {
  uni.navigateTo({
    url: '/pages-sub/services/lawyer-list',
  })
}

// 跳转到智能咨询
function navigateToSmartConsultation() {
  uni.showToast({
    title: '即将进入智能咨询',
    icon: 'none',
  })
  // 实际项目中应该跳转到智能咨询页面
  // router.push('/path/to/smart-consultation')
}
</script>

<template>
  <view class="legal-consultation-container">
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

    <!-- 内容区域 -->
    <view class="content">
      <!-- 法律咨询选项卡片 -->
      <view class="consultation-options">
        <!-- 在线咨询卡片 -->
        <view class="consultation-card red-card" @click="navigateToOnlineConsultation">
          <view class="card-icon">
            <text class="icon">💬</text>
          </view>
          <view class="card-content">
            <text class="card-title">在线咨询</text>
            <text class="card-subtitle">线上律师咨询</text>
          </view>
        </view>

        <!-- 智能咨询卡片 -->
        <view class="consultation-card orange-card" @click="navigateToSmartConsultation">
          <view class="card-icon">
            <text class="icon">🤖</text>
          </view>
          <view class="card-content">
            <text class="card-title">智能咨询</text>
            <text class="card-subtitle">深度合成-AI问答</text>
          </view>
        </view>
      </view>

      <!-- 咨询说明 -->
      <view class="consultation-info">
        <view class="info-title">
          <text>咨询说明</text>
        </view>
        <view class="info-content">
          <text class="info-text">我们提供专业的法律咨询服务，帮助您解决各类法律问题。在线咨询由专业律师提供服务，智能咨询由AI系统快速响应您的问题。</text>
        </view>
      </view>

      <!-- 常见问题 -->
      <view class="faq-section">
        <view class="faq-title">
          <text>常见问题</text>
        </view>
        <view class="faq-list">
          <view class="faq-item">
            <view class="faq-question">
              如何选择适合我的咨询方式？
            </view>
            <view class="faq-answer">
              如果您需要专业律师的详细分析，建议选择在线咨询；如果您需要快速了解法律问题，可选择智能咨询。
            </view>
          </view>
          <view class="faq-item">
            <view class="faq-question">
              咨询服务收费吗？
            </view>
            <view class="faq-answer">
              基础咨询服务免费，复杂问题可能需要支付相应费用，具体以实际咨询为准。
            </view>
          </view>
          <view class="faq-item">
            <view class="faq-question">
              咨询结果有法律效力吗？
            </view>
            <view class="faq-answer">
              咨询结果仅供参考，不具备法律效力。正式的法律文书和协议需要专业律师出具。
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.legal-consultation-container {
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

.content {
  padding: 20px 16px;
}

.consultation-options {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 30px;
}

.consultation-card {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.consultation-card:active {
  transform: scale(0.98);
}

.red-card {
  background-color: #ff4d4f;
  color: #ffffff;
}

.orange-card {
  background-color: #fa8c16;
  color: #ffffff;
}

.card-icon {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 24px;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 12px;
  opacity: 0.9;
  display: block;
}

.consultation-info,
.faq-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.info-title,
.faq-title {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.info-content {
  padding: 0 4px;
}

.info-text {
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
}

.faq-list {
  padding: 4px 0;
}

.faq-item {
  margin-bottom: 12px;
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-question {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 4px;
}

.faq-answer {
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
}
</style>
