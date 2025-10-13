<script lang="ts" setup>
import type { IUploadSuccessInfo } from '@/api/types/login'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'
import { useUpload } from '@/utils/uploadFile'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)

// #ifndef MP-WEIXIN
// 上传头像
const { run: uploadAvatar } = useUpload<IUploadSuccessInfo>(
  '/upload',
  {},
  {
    onSuccess: (res) => {
      console.log('h5头像上传成功', res)
      useUserStore().setUserAvatar(res.url)
    },
  },
)
// #endif

// 微信小程序下登录
async function handleLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}

// #ifdef MP-WEIXIN
// 微信小程序下选择头像事件
function onChooseAvatar(e: any) {
  console.log('选择头像', e.detail)
  const { avatarUrl } = e.detail
  const { run } = useUpload<IUploadSuccessInfo>(
    '/upload',
    {},
    {
      onSuccess: (res) => {
        console.log('wx头像上传成功', res)
        useUserStore().setUserAvatar(res.url)
      },
    },
    avatarUrl,
  )
  run()
}
// #endif
// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
function getUserInfo(e: any) {
  console.log(e.detail)
}
// #endif

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useTokenStore().logout()
        // 执行退出登录逻辑
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        // uni.navigateTo({ url: LOGIN_PAGE })
        // #endif
      }
    },
  })
}
</script>

<template>
  <view class="profile-container">
    <!-- 登录状态显示 -->
    <view>
      <!-- 已登录状态 - 个人资料页面 -->
      <view class="profile-header">
        <view class="header-title">
          个人资料
        </view>
      </view>

      <view class="profile-content">
        <!-- 用户信息卡片 -->
        <view class="profile-card">
          <!-- 头像 -->
          <view class="profile-item">
            <view class="item-label">
              头像
            </view>
            <view class="item-content">
              <!-- #ifdef MP-WEIXIN -->
              <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image :src="userInfo.avatar" mode="scaleToFill" class="h-full w-full" />
              </button>
              <!-- #endif -->
              <!-- #ifndef MP-WEIXIN -->
              <view class="avatar-wrapper">
                <image :src="userInfo.avatar" mode="scaleToFill" class="h-full w-full" />
              </view>
              <!-- #endif -->
            </view>
          </view>

          <!-- 昵称 -->
          <view class="profile-item">
            <view class="item-label">
              昵称
            </view>
            <view class="item-content">
              <!-- #ifdef MP-WEIXIN -->
              <input
                v-model="userInfo.username"
                type="nickname"
                placeholder="请输入昵称"
              >
              <!-- #endif -->
              <!-- #ifndef MP-WEIXIN -->
              <view class="username">
                {{ userInfo.username }}
              </view>
              <!-- #endif -->
            </view>
          </view>

          <!-- 电话 -->
          <view class="profile-item">
            <view class="item-label">
              电话
            </view>
            <view class="item-content">
              <text class="item-value">{{ userInfo.phone }}</text>
              <text class="arrow">→</text>
            </view>
          </view>

          <!-- 实名认证 -->
          <view class="profile-item">
            <view class="item-label">
              实名认证
            </view>
            <view class="item-content">
              <text class="verified-text">已认证</text>
            </view>
          </view>
        </view>

        <!-- 退出登录按钮 -->
        <view class="mt-20">
          <wd-button v-if="tokenStore.hasLogin" type="error" size="large" block @click="handleLogout">
            退出登录
          </wd-button>
          <wd-button v-else type="primary" size="large" block @click="handleLogin">
            登录
          </wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 基础样式 */
.profile-container {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  min-height: 100vh;
  background-color: #f8f8f8;
}

/* 登录状态样式 */
.login-container {
  padding: 20rpx;
}

/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 40rpx;
  margin: 30rpx 30rpx 20rpx;
  background-color: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin-right: 40rpx;
  overflow: hidden;
  border: 4rpx solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.avatar-button {
  height: 160rpx;
  width: 160rpx;
  padding: 0;
  margin-right: 40rpx;
  overflow: hidden;
  border: 4rpx solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.user-details {
  flex: 1;
}

.user-id {
  font-size: 28rpx;
  color: #666;
}

/* 已登录状态 - 个人资料页面样式 */
.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.header-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.profile-content {
  padding: 30rpx;
}

.profile-card {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.profile-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 32rpx;
  color: #333;
}

.item-content {
  display: flex;
  align-items: center;
}

.avatar-small {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.item-value {
  font-size: 32rpx;
  color: #666;
  margin-right: 10rpx;
}

.arrow {
  font-size: 28rpx;
  color: #ccc;
}

.verified-text {
  font-size: 32rpx;
  color: #07c160;
}

.logout-button {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 32rpx;
  background-color: #fff;
  border: 1rpx solid #e0e0e0;
  color: #e64340;
  border-radius: 12rpx;
}
</style>
