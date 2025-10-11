<script setup lang="ts">
import { Icon } from '@iconify/vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '操作指南',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    navigationBarBackButtonText: '',
  },
})

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 播放视频（暂时模拟）
function playVideo() {
  uni.showToast({
    title: '视频播放功能待实现',
    icon: 'none',
  })
}

// 查看文档
function viewDocument() {
  uni.showToast({
    title: '查看文档功能待实现',
    icon: 'none',
  })
}
</script>

<template>
  <view class="operation-guide-container min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <view class="guide-header h-12 flex items-center border-b bg-white px-4">
      <view class="back-button" @click="navigateBack">
        <Icon icon="mdi:arrow-left" class="h-5 w-5 text-gray-700" />
      </view>
      <text class="flex-1 text-center text-lg font-medium">操作指南</text>
      <view class="w-5" /> <!-- 为了标题居中的占位元素 -->
    </view>

    <!-- 内容区域 -->
    <view class="guide-content px-4 py-5">
      <!-- 视频演示区域 -->
      <view class="video-section mb-6">
        <view class="video-title mb-3 flex items-center">
          <Icon icon="mdi:video-outline" class="mr-2 h-5 w-5 text-blue-500" />
          <text class="text-base font-medium">小程序操作流程视频演示：</text>
        </view>

        <!-- 视频播放区域 -->
        <view class="video-player relative h-48 overflow-hidden rounded-lg bg-black" @click="playVideo">
          <view class="video-play-button absolute inset-0 flex items-center justify-center">
            <div class="play-icon h-16 w-16 flex items-center justify-center rounded-full bg-white/30">
              <Icon icon="mdi:play" class="h-8 w-8 text-white" />
            </div>
          </view>
          <text class="absolute bottom-2 left-1/2 transform text-sm text-white -translate-x-1/2">00:00</text>
        </view>
      </view>

      <!-- 文档链接区域 -->
      <view class="document-section mb-8">
        <text
          class="text-base text-blue-500 underline"
          @click="viewDocument"
        >
          点击查看《微信小程序"调E调"法律服务平台调解、仲裁确认收费管理办法》
        </text>
      </view>

      <!-- 分隔线 -->
      <view class="divider mb-6 flex items-center justify-center">
        <view class="h-px flex-1 bg-gray-200" />
        <text class="px-4 text-blue-500 font-medium">调E调法律服务平台</text>
        <view class="h-px flex-1 bg-gray-200" />
      </view>

      <!-- 说明文本 -->
      <view class="description-section mb-8">
        <text class="text-sm text-gray-600 leading-6">
          本服务指南提供了一份关于小程序的操作流程视频，旨在帮助您创建一份完善、易于理解的该小程序,通过该视频，您可以明确小程序的操作流程。
        </text>
      </view>

      <!-- 联系信息 -->
      <view class="contact-section">
        <view class="contact-items">
          <view class="contact-item flex items-center justify-between border-b border-gray-100 py-3">
            <text class="text-gray-600">调解咨询：</text>
            <text class="text-gray-800">0934-3228898</text>
          </view>
          <view class="contact-item flex items-center justify-between border-b border-gray-100 py-3">
            <text class="text-gray-600">仲裁咨询：</text>
            <text class="text-gray-800">0934-3228898</text>
          </view>
          <view class="contact-item flex items-center justify-between border-b border-gray-100 py-3">
            <text class="text-gray-600">法律咨询：</text>
            <text class="text-gray-800">0934-8888683</text>
          </view>
          <view class="contact-item flex items-center justify-between py-3">
            <text class="text-gray-600">合同服务：</text>
            <text class="text-gray-800">0934-8888683</text>
          </view>
        </view>
      </view>

      <!-- 二维码区域 -->
      <view class="qrcode-section mt-8 flex justify-center">
        <view class="qrcode-container flex flex-col items-center">
          <view class="qrcode rounded-lg bg-white p-3 shadow-sm">
            <!-- 模拟二维码 -->
            <view class="h-32 w-32 flex items-center justify-center rounded bg-gray-100">
              <Icon icon="mdi:qrcode" class="h-16 w-16 text-gray-400" />
            </view>
          </view>
          <text class="mt-2 text-xs text-gray-500">详情咨询扫描二维码</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.operation-guide-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding-top: 12px;
}

.guide-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.guide-content {
  padding-top: 16px;
}

.back-button {
  padding: 4px;
}

.video-player {
  cursor: pointer;
}

.video-play-button {
  cursor: pointer;
}

.contact-section {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.contact-items {
  padding: 4px 16px;
}

.contact-item {
  font-size: 14px;
}

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
}

.qrcode-section {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
