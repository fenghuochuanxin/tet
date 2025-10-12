<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

// 定义页面配置
defineOptions({
  name: 'MessageDetail',
})

// 定义变量
const userStore = useUserStore()
const messageDetail = ref<any>(null)
const loading = ref(true)

// 消息详情数据 - 使用字符串作为键，确保与options.id类型一致
const messageDataMap: Record<string, any> = {
  1: {
    id: '1',
    title: '系统通知',
    content: '您的账户已完成实名认证\n\n尊敬的用户，\n\n您的账户已通过我们的实名认证审核。现在您可以享受平台提供的全部法律服务功能，包括法律咨询、合同服务等。\n\n如有任何问题，请联系我们的客服团队。\n\n调E调法律服务平台\n2023年11月11日',
    time: '2023-11-11 10:30',
    type: 'system',
    isRead: false,
  },
  2: {
    id: '2',
    title: '服务提醒',
    content: '您的法律咨询服务即将到期\n\n尊敬的用户，\n\n您的法律咨询服务将在3天后（2023年11月15日）到期。请及时续费以确保您能够继续享受我们的专业法律服务。\n\n续费方式：\n1. 登录调E调APP，在"我的服务"中选择续费\n2. 联系客服热线：400-123-4567\n\n感谢您对调E调的支持！\n\n调E调法律服务平台\n2023年11月12日',
    time: '2023-11-12 15:45',
    type: 'service',
    isRead: true,
  },
  3: {
    id: '3',
    title: '合同更新',
    content: '您的电子合同已更新，请查收\n\n尊敬的用户，\n\n您与北京XX科技有限公司的《服务协议》已于2023年11月10日进行了更新。主要更新内容如下：\n\n1. 服务范围扩展，新增了法律咨询增值服务\n2. 隐私政策部分进行了优化，加强了用户数据保护\n3. 服务条款进行了部分调整，更明确了双方权利义务\n\n请您及时登录平台查看更新后的合同内容。\n\n调E调法律服务平台\n2023年11月10日',
    time: '2023-11-10 09:15',
    type: 'contract',
    isRead: false,
  },
  4: {
    id: '4',
    title: '活动通知',
    content: '新用户专享优惠活动已上线\n\n亲爱的用户，\n\n为了感谢您对调E调的信任与支持，我们特别推出了新用户专享优惠活动！\n\n活动时间：2023年11月9日 - 2023年11月30日\n活动内容：\n1. 首次购买法律咨询服务，享受8折优惠\n2. 签约年度服务套餐，赠送价值500元的合同审核服务\n3. 邀请好友注册，双方均可获得法律咨询体验券\n\n活动详情请登录APP查看或联系客服咨询。\n\n调E调法律服务平台\n2023年11月9日',
    time: '2023-11-09 14:30',
    type: 'activity',
    isRead: false,
  },
}

// 获取页面参数并加载数据
onLoad((options: any) => {
  // 设置导航栏标题
  try {
    uni.setNavigationBarTitle({
      title: '消息详情',
    })
  }
  catch (error) {
    console.error('设置导航栏标题失败:', error)
  }

  // 从options中直接获取路由参数
  const messageId = options.id

  if (messageId) {
    // 确保messageId是字符串类型
    const stringId = String(messageId)
    console.log('Loading message with id:', stringId)

    // 模拟请求延迟
    setTimeout(() => {
      // 处理数字键和字符串键的情况
      messageDetail.value = messageDataMap[stringId] || messageDataMap[Number.parseInt(stringId)]
      console.log('Message loaded:', messageDetail.value)

      if (messageDetail.value && !messageDetail.value.isRead) {
        messageDetail.value.isRead = true
        // 这里可以添加标记消息为已读的API调用
      }
      loading.value = false
    }, 300)
  }
  else {
    console.error('未提供消息ID')
    loading.value = false
  }
})

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="page-message-detail">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-btn" @tap="handleBack">
        <text class="back-icon">←</text>
      </view>
      <text class="header-title">消息详情</text>
      <view class="right-placeholder" />
    </view>

    <!-- 消息详情内容 -->
    <view class="detail-content">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-state">
        <text>加载中...</text>
      </view>

      <!-- 消息详情 -->
      <view v-else-if="messageDetail" class="message-detail-content">
        <view class="detail-header">
          <text class="detail-title">{{ messageDetail.title }}</text>
          <text class="detail-time">{{ messageDetail.time }}</text>
        </view>
        <view class="detail-body">
          <text class="detail-text">{{ messageDetail.content }}</text>
        </view>
      </view>

      <!-- 消息不存在 -->
      <view v-else class="empty-state">
        <text>消息不存在或已被删除</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-message-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  height: 88rpx;
  background-color: #ffffff;
  box-shadow: 0 1rpx 10rpx rgba(0, 0, 0, 0.1);
}

.back-btn {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 36rpx;
  color: #333333;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
}

.right-placeholder {
  width: 88rpx;
}

.detail-content {
  flex: 1;
  padding: 30rpx;
  background-color: #f5f5f5;
}

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 28rpx;
}

.message-detail-content {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.05);
}

.detail-header {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.detail-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.detail-time {
  display: block;
  font-size: 24rpx;
  color: #999999;
}

.detail-body {
  font-size: 28rpx;
  line-height: 1.8;
  color: #333333;
  white-space: pre-wrap;
  word-break: break-word;
}

.detail-text {
  display: block;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 28rpx;
}
</style>
