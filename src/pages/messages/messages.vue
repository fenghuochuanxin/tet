<script setup lang="ts">
import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

// 定义页面配置
defineOptions({
  name: 'Messages',
})

// 定义页面配置和生命周期
definePage({
  // 页面配置
  style: {
    navigationBarTitleText: '消息',
    enablePullDownRefresh: false,
    navigationStyle: 'custom',
  },
})

// 统一的导航函数
function navigateTo(url: string) {
  // 在所有平台统一使用uni.navigateTo进行应用内导航
  uni.navigateTo({ url })
}

// 引入 store
const userStore = useUserStore()
const tokenStore = useTokenStore()

// 模拟消息列表数据
const messages = ref<any[]>([
  {
    id: '1',
    title: '系统通知',
    content: '您的账户已完成实名认证',
    time: '10:30',
    unread: true,
  },
  {
    id: '2',
    title: '服务提醒',
    content: '您的法律咨询服务即将到期',
    time: '昨天',
    unread: false,
  },
  {
    id: '3',
    title: '合同更新',
    content: '您的电子合同已更新，请查收',
    time: '2023-11-10',
    unread: true,
  },
  {
    id: '4',
    title: '活动通知',
    content: '新用户专享优惠活动已上线',
    time: '2023-11-09',
    unread: true,
  },
])

// 点击事件处理函数
function handleMoreClick() {
  console.log('点击更多按钮')
}

function handleMinusClick() {
  console.log('点击减号按钮')
}

function handleSettingsClick() {
  console.log('点击设置按钮')
}

// 点击消息项处理函数
function handleMessageClick(message: any) {
  console.log('点击消息项:', message)
  // 导航到消息详情页，传递消息ID
  navigateTo(`/pages/messages/detail?id=${message.id}`)

  // 标记消息为已读
  if (message.unread) {
    message.unread = false
    // 这里可以添加标记消息为已读的API调用
  }
}
</script>

<template>
  <view class="page-messages">
    <!-- 顶部导航栏 -->
    <view class="header">
      <text class="header-title">调E调</text>
      <view class="header-actions">
        <view class="action-btn" @tap="handleMoreClick">
          <image src="/static/images/more.png" class="action-icon" mode="aspectFit" />
        </view>
        <view class="action-btn" @tap="handleMinusClick">
          <image src="/static/images/minus.png" class="action-icon" mode="aspectFit" />
        </view>
        <view class="action-btn" @tap="handleSettingsClick">
          <image src="/static/images/settings.png" class="action-icon" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 消息内容区域 -->
    <view class="message-content">
      <!-- 空状态显示 -->
      <view v-if="messages.length === 0" class="empty-state">
        <view class="empty-icon">
          <uni-icons type="chat" size="80" color="#CCCCCC" />
        </view>
        <view class="empty-text">
          暂无内容
        </view>
      </view>

      <!-- 消息列表，当有消息时显示 -->
      <view v-else class="message-list">
        <view
          v-for="message in messages"
          :key="message.id"
          class="message-item"
          @tap="handleMessageClick(message)"
        >
          <view class="message-left">
            <view class="message-title">
              {{ message.title }}
            </view>
            <view class="message-content">
              {{ message.content }}
            </view>
          </view>
          <view class="message-right">
            <view class="message-time">
              {{ message.time }}
            </view>
            <view v-if="message.unread" class="message-unread-dot" />
          </view>
        </view>
      </view>
    </view>

    <!-- 底部 tabbar 占位 -->
    <view class="tabbar-placeholder" />
  </view>
</template>

<style lang="scss" scoped>
.page-messages {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  height: 88rpx;
  background-color: #ffffff;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 30rpx;
}

.action-btn {
  width: 44rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon {
  width: 100%;
  height: 100%;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #cccccc;
  margin-top: 200rpx;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 40rpx;
}

.empty-image {
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.empty-text {
  font-size: 32rpx;
  color: #999999;
}

.tabbar-placeholder {
  height: 100rpx;
}

/* 消息列表样式 */
.message-list {
  flex: 1;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.message-left {
  flex: 1;
  padding-right: 20rpx;
}

.message-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-content {
  font-size: 28rpx;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-time {
  font-size: 24rpx;
  color: #cccccc;
  margin-bottom: 10rpx;
}

.message-unread-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #ff3b30;
  border-radius: 50%;
}
</style>
