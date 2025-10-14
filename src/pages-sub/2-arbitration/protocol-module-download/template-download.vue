<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '仲裁确认',
  },
})

// 返回上一页
function navigateBack() {
  router.back()
}

// 处理模板下载
function handleDownload() {
  uni.showLoading({
    title: '下载中...',
  })

  // 模拟下载延迟
  setTimeout(() => {
    uni.hideLoading()

    // 显示下载成功提示
    uni.showToast({
      title: '下载成功',
      icon: 'success',
      duration: 2000,
    })
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-white">
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

    <!-- 主要内容区域 -->
    <view class="content">
      <view class="section-title">
        确认协议模板
      </view>

      <!-- 文件列表 -->
      <view class="file-list">
        <view class="file-item">
          <view class="file-info">
            <view class="file-icon">
              <image src="/static/images/product4.svg" mode="aspectFit" class="icon-image" />
            </view>
            <view class="file-details">
              <text class="file-name">确认协议模板.docx</text>
            </view>
          </view>
          <button class="download-button" @click="handleDownload">
            查看下载
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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
  font-weight: 600;
  color: #333333;
}

.content {
  padding: 20px 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 20px;
}

.file-list {
  width: 100%;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 16px;
}

.file-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.file-icon {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.icon-image {
  width: 24px;
  height: 24px;
}

.file-details {
  flex: 1;
}

.file-name {
  font-size: 14px;
  color: #333333;
}

.download-button {
  background-color: #07c160;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  padding: 6px 16px;
  min-height: 32px;
  line-height: 32px;
}

.download-button:active {
  background-color: #06ad56;
}
</style>
