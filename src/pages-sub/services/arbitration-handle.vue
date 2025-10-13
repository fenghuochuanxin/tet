<script setup lang="ts">
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

// 返回上一页
function navigateBack() {
  router.back()
}

// 处理申请仲裁确认
function handleApplyArbitrationConfirmation() {
  console.log('申请仲裁确认')
  // 跳转到仲裁申请表单页面
  uni.navigateTo({
    url: '/pages-sub/services/arbitration-application',
    success: () => {
      console.log('成功跳转到仲裁申请表单页面')
    },
    fail: (err) => {
      console.error('跳转到仲裁申请表单页面失败:', err)
      uni.showToast({
        title: '跳转失败，请稍后重试',
        icon: 'none',
      })
    },
  })
}

// 处理我的案件
function handleMyCases() {
  console.log('我的案件')
  // 这里应该跳转到我的案件页面
  uni.navigateTo({
    url: '/pages-sub/history/index',
    success: () => {
      console.log('成功跳转到我的案件页面')
    },
    fail: (err) => {
      console.error('跳转到我的案件页面失败:', err)
      uni.showToast({
        title: '跳转失败，请稍后重试',
        icon: 'none',
      })
    },
  })
}

// 处理下载确认协议模板
function handleDownloadTemplate() {
  console.log('下载确认协议模板')
  // 模拟下载操作
  uni.showToast({
    title: '模板下载中，请稍候...',
    icon: 'loading',
    duration: 2000,
  })

  // 模拟下载完成
  setTimeout(() => {
    uni.showToast({
      title: '模板下载成功',
      icon: 'success',
    })
  }, 2000)
}
</script>

<template>
  <view class="arbitration-handle-container">
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

    <!-- Banner区域 -->
    <view class="banner">
      <view class="banner-content">
        <image src="/static/images/product2.svg" alt="仲裁确认" class="banner-image" />
        <view class="banner-text">
          <view class="banner-title">
            高效仲裁确认
          </view>
          <view class="banner-subtitle">
            稳固权益保障
          </view>
          <view class="banner-committee">
            庆阳仲裁委员会
          </view>
        </view>
      </view>
      <!-- 调E调Logo -->
      <view class="banner-logo">
        <text class="banner-logo-text">调E调</text>
      </view>
    </view>

    <!-- 功能按钮区域 -->
    <view class="buttons-container">
      <button class="primary-button" @click="handleApplyArbitrationConfirmation">
        <view class="button-icon">
          <text>⚖️</text>
        </view>
        <view class="button-text">
          申请仲裁确认
        </view>
        <view class="button-subtext">
          申请仲裁立案
        </view>
      </button>

      <button class="primary-button" @click="handleMyCases">
        <view class="button-icon">
          <text>📋</text>
        </view>
        <view class="button-text">
          我的案件
        </view>
        <view class="button-subtext">
          查看全部仲裁确认案件
        </view>
      </button>

      <button class="secondary-button" @click="handleDownloadTemplate">
        <view class="button-icon">
          <text>📥</text>
        </view>
        <view class="button-text">
          确认协议模板下载
        </view>
        <view class="button-subtext">
          下载仲裁确认协议模板
        </view>
      </button>
    </view>

    <!-- 温馨提示区域 -->
    <view class="tips-container">
      <view class="tips-title">
        温馨提示：
      </view>
      <view class="tips-content">
        <text class="tip-text">
          仲裁确认功能旨在为当事人提供其自行达成的调解协议进行仲裁法律文书确认服务。仲裁确认成功后将出具仲裁调解书，该调解书与裁决书具有同等效力，一方当事人不履行调解书确定履行义务时，另一方当事人可向被申请人的财产、户籍所在地中级人民法院申请强制执行。
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.arbitration-handle-container {
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
  background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
  padding: 30px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDUwQzIwIDM1IDMwIDI1IDUwIDI1czMwIDEwIDUwIDI1czMwIDI1IDUwIDI1VjUwSDBWMCA1MFYzMFYyMFYzMFYzMCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0wIDMwQzIwIDE1IDMwIDUgNTAgNXM1MCAxMCA3MCAyNSA1MCAyNSA3MCAyNSA3MC01UzEwMCAzMCA3MCAxNVMzMCA1IDMwIDAgMCAxNSAwIDMwVjMwWiIvPjwvZz48L3N2Zz4=');
  opacity: 0.2;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner-image {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
}

.banner-text {
  color: #ffffff;
}

.banner-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.banner-subtitle {
  font-size: 16px;
  margin-bottom: 12px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.banner-committee {
  font-size: 14px;
  opacity: 0.9;
}

/* 调E调Logo - 新增 */
.banner-logo {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.banner-logo-text {
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.buttons-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.primary-button,
.secondary-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
}

.primary-button {
  background-color: #1890ff;
  color: #ffffff;
}

.primary-button:active {
  background-color: #096dd9;
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.secondary-button {
  background-color: #52c41a;
  color: #ffffff;
}

.secondary-button:active {
  background-color: #389e0d;
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.button-icon {
  font-size: 24px;
  margin-right: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
}

.button-subtext {
  font-size: 12px;
  opacity: 0.8;
  text-align: right;
  min-width: 120px;
}

.tips-container {
  padding: 20px;
  background-color: #ffffff;
  margin: 0 20px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.tips-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #1890ff;
}

.tips-title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
  padding-left: 10px;
}

.tip-text {
  font-size: 13px;
  color: #666666;
  line-height: 1.8;
  padding-left: 10px;
}
</style>
