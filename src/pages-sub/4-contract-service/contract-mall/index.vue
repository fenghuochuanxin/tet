<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 页面配置已通过route-block自动生成到pages.json
// 禁用页面滚动已在style中通过CSS实现

// 点击允许按钮，跳转到京东小程序
function handleAllow() {
  console.log('跳转到京东小程序')
  // 使用uni-app提供的打开小程序API
  // 注意：这里的appId和path需要根据实际情况填写
  // 由于是模拟环境，这里仅做演示
  try {
    if (uni.navigateToMiniProgram) {
      uni.navigateToMiniProgram({
        appId: 'wx1234567890', // 假设的京东小程序appId
        path: 'pages/index/index', // 京东小程序首页路径
        success: () => {
          console.log('跳转到京东小程序成功')
        },
        fail: (err) => {
          console.error('跳转到京东小程序失败', err)
          // 如果跳转失败，可以提供一个替代方案
          uni.showToast({
            title: '跳转失败，请稍后再试',
            icon: 'none',
          })
          // 返回上一页
          setTimeout(() => {
            router.back()
          }, 1500)
        },
      })
    }
    else {
      // 如果环境不支持跳转到小程序，显示提示
      uni.showToast({
        title: '当前环境不支持跳转到小程序',
        icon: 'none',
      })
      // 返回上一页
      setTimeout(() => {
        router.back()
      }, 1500)
    }
  }
  catch (error) {
    console.error('跳转小程序时发生错误', error)
    uni.showToast({
      title: '跳转失败，请稍后再试',
      icon: 'none',
    })
    // 返回上一页
    setTimeout(() => {
      router.back()
    }, 1500)
  }
}

// 点击取消按钮，返回上一页
function handleCancel() {
  console.log('取消跳转到京东小程序')
  router.back()
}
</script>

<template>
  <view class="modal-container">
    <!-- 半透明背景遮罩 -->
    <view class="modal-overlay" @click="handleCancel" />

    <!-- 弹窗内容 -->
    <view class="modal-content">
      <view class="modal-title">
        提示
      </view>
      <view class="modal-message">
        即将打开"京东购物 | 点外卖领国补"小程序
      </view>
      <view class="modal-buttons">
        <button class="cancel-button" @click="handleCancel">
          取消
        </button>
        <button class="allow-button" @click="handleAllow">
          允许
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 300px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 12px;
}

.modal-message {
  font-size: 16px;
  color: #666666;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
}

.modal-buttons {
  display: flex;
  gap: 16px;
}

.cancel-button,
.allow-button {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  outline: none;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #666666;
}

.allow-button {
  background-color: #07c160;
  color: #ffffff;
}
</style>
