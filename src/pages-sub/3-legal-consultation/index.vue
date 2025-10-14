<script setup lang="ts">
// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '法律咨询',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: true,
})

// 跳转到在线咨询页面
function navigateToOnlineConsultation() {
  uni.navigateTo({
    url: '/pages-sub/3-legal-consultation/online-consulting/lawyer-list',
  })
}

// 跳转到智能咨询
function navigateToSmartConsultation() {
  console.log('跳转到DeepSeek智能咨询')
  // 直接跳转到DeepSeek网页
  window.location.href = 'https://deepseek.com/'
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="legal-consultation-container">
    <!-- 返回按钮 -->
    <view class="back-button" @click="navigateBack">
      <text class="back-icon">←</text>
    </view>

    <!-- 页面标题 -->
    <view class="page-title">
      法律咨询
    </view>

    <!-- 咨询选项卡 -->
    <view class="consultation-options">
      <!-- 在线咨询 -->
      <view class="option-card online" @click="navigateToOnlineConsultation">
        <view class="option-icon">
          💬
        </view>
        <view class="option-title">
          在线咨询
        </view>
        <view class="option-subtitle">
          线上律师咨询
        </view>
      </view>

      <!-- 智能咨询 -->
      <view class="option-card smart" @click="navigateToSmartConsultation">
        <view class="option-icon">
          🤖
        </view>
        <view class="option-title">
          智能咨询
        </view>
        <view class="option-subtitle">
          深度合成-AI问答
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.legal-consultation-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 10px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-icon {
  font-size: 18px;
  color: #333333;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 30px;
  padding-top: 10px;
}

.consultation-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 0 10px;
}

.option-card {
  flex: 1;
  max-width: 200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.option-card:active {
  transform: scale(0.98);
}

.option-card.online {
  background-color: #ff6b6b;
}

.option-card.smart {
  background-color: #ffa502;
}

.option-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.option-title {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 3px;
}

.option-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}
</style>
