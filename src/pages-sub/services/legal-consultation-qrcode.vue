<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '法律咨询二维码',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 返回上一页
function navigateBack() {
  router.back()
}

// 下载二维码
function downloadQrCode() {
  uni.showToast({
    title: '二维码已保存到相册',
    icon: 'success',
  })
}
</script>

<template>
  <view class="qrcode-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        法律咨询二维码
      </view>
      <view class="header-right" />
    </view>

    <!-- 二维码内容区域 -->
    <view class="qrcode-content">
      <view class="qrcode-wrapper">
        <image
          src="/static/images/product3.svg"
          alt="法律咨询二维码"
          class="qrcode-image"
        />
        <view class="qrcode-label">
          扫码加入法律咨询服务
        </view>
      </view>

      <view class="qrcode-tips">
        <text class="tip-text">请使用微信扫描上方二维码，加入我们的法律咨询服务平台，获取专业的法律建议。</text>
      </view>

      <button class="download-button" @click="downloadQrCode">
        保存二维码到相册
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.qrcode-container {
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

.qrcode-content {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.qrcode-wrapper {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.qrcode-label {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.qrcode-tips {
  text-align: center;
  padding: 0 10px;
}

.tip-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

.download-button {
  width: 100%;
  height: 48px;
  background-color: #ff4d4f;
  color: #ffffff;
  font-size: 16px;
  border-radius: 24px;
  margin-top: 20px;
}

.download-button:active {
  background-color: #cf1322;
}
</style>
