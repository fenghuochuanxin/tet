<script setup lang="ts">
import { nextTick, ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '律师咨询',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 律师信息
const lawyerInfo = ref({
  id: '',
  name: '',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lawyer',
  organization: '庆阳仲裁委员会调解中心',
  expertise: ['借款纠纷', '买卖纠纷', '租赁纠纷', '建设工程', '交通事故'],
  rating: 5.0,
  description: '暂无信息',
  region: '甘肃省,庆阳市,西峰区',
})

console.log('Initial lawyerInfo:', lawyerInfo.value)

// 聊天消息列表
const messages = ref([
  {
    id: '1',
    content: '您好，我是调E调法律服务平台在线咨询律师，专业解答法律问题，请问您需要咨询什么问题',
    sender: 'lawyer',
    time: '2025-10-13 8:40',
  },
])

console.log('Initial messages:', messages.value)

// 输入框内容
const inputContent = ref('')

// 聊天区域引用
const chatContainer = ref(null)

// 页面加载时获取律师信息
function onLoad(options: any) {
  console.log('Chat room received options:', options)

  if (options) {
    // 确保正确处理URL编码的参数
    const id = options.id || ''
    const name = options.name ? decodeURIComponent(options.name) : ''

    // 如果有完整的律师信息JSON字符串，解析它
    if (options.lawyerInfo) {
      try {
        const parsedInfo = JSON.parse(decodeURIComponent(options.lawyerInfo))
        lawyerInfo.value = { ...lawyerInfo.value, ...parsedInfo }
      }
      catch (e) {
        console.error('Failed to parse lawyerInfo:', e)
        // 解析失败时使用基本信息
        lawyerInfo.value.id = id
        lawyerInfo.value.name = name
      }
    }
    else {
      // 如果没有完整信息，使用基本信息
      lawyerInfo.value.id = id
      lawyerInfo.value.name = name
    }

    console.log('Set lawyer info:', lawyerInfo.value)

    // 更新页面标题
    if (name) {
      uni.setNavigationBarTitle({
        title: `调E调${name}律师`,
      })
    }
  }

  // 页面渲染完成后滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
}

// 发送消息
function sendMessage() {
  const content = inputContent.value.trim()
  if (!content)
    return

  // 添加用户消息
  const userMessage = {
    id: Date.now().toString(),
    content,
    sender: 'user',
    time: getCurrentTime(),
  }
  messages.value.push(userMessage)

  // 清空输入框
  inputContent.value = ''

  // 滚动到底部
  setTimeout(() => {
    scrollToBottom()
  }, 100)

  // 模拟律师回复
  setTimeout(() => {
    const lawyerReply = {
      id: `${Date.now().toString()}1`,
      content: '感谢您的咨询。根据您的描述，我需要了解更多细节以便提供更准确的法律建议。请您详细说明相关情况，我会尽力为您解答。',
      sender: 'lawyer',
      time: getCurrentTime(),
    }
    messages.value.push(lawyerReply)

    // 滚动到底部
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, 1000)
}

// 获取当前时间
function getCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 滚动到底部
function scrollToBottom() {
  console.log('Scrolling to bottom')
  setTimeout(() => {
    try {
      // 使用更简单可靠的方法滚动到底部
      uni.createSelectorQuery().select('.chat-messages').boundingClientRect((rect: any) => {
        if (rect && typeof rect.height !== 'undefined') {
          console.log('Scroll height:', rect.height)
          uni.pageScrollTo({
            scrollTop: rect.height,
            duration: 100,
          })
        }
      }).exec()
    }
    catch (error) {
      console.error('Error scrolling to bottom:', error)
    }
  }, 100)
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view ref="chatContainer" class="chat-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        调E调{{ lawyerInfo.name }}律师
      </view>
      <view class="header-right" />
    </view>

    <!-- 律师详情展示区域 -->
    <view class="lawyer-info-section">
      <image :src="lawyerInfo.avatar" class="lawyer-avatar" mode="aspectFill" />
      <view class="lawyer-details">
        <view class="lawyer-name-row">
          <text class="lawyer-name">{{ lawyerInfo.name }}</text>
          <view class="lawyer-badge">
            已实名
          </view>
        </view>
        <text class="lawyer-organization">所属机构：{{ lawyerInfo.organization }}</text>
        <view class="satisfaction-row">
          <text class="satisfaction-text">满意度：</text>
          <view class="lawyer-rating">
            <text v-for="i in 5" :key="i" class="star" :class="{ active: i <= lawyerInfo.rating }">★</text>
          </view>
        </view>
        <text class="lawyer-description">简介：{{ lawyerInfo.description }}</text>
        <text class="lawyer-expertise">擅长领域：{{ Array.isArray(lawyerInfo.expertise) ? lawyerInfo.expertise.join(',') : lawyerInfo.expertise }}</text>
        <text class="lawyer-region">所在地区：{{ lawyerInfo.region }}</text>
      </view>
    </view>

    <!-- 聊天消息区域 -->
    <view class="chat-messages">
      <view v-for="message in messages" :key="message.id" class="message-item" :class="message.sender">
        <image v-if="message.sender === 'lawyer'" src="/static/images/logo.svg" class="message-avatar" mode="aspectFill" />
        <view class="message-content" :class="message.sender">
          {{ message.content }}
        </view>
        <view class="message-time">
          {{ message.time }}
        </view>
      </view>
    </view>

    <!-- 输入区域 -->
    <view class="input-container">
      <input
        v-model="inputContent"
        type="text"
        placeholder="请输入您的问题..."
        class="message-input"
        @confirm="sendMessage"
      >
      <view class="input-actions">
        <view class="action-icon">
          +
        </view>
        <button class="send-button" @click="sendMessage">
          发送
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.chat-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
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

/* 律师详情区域样式 */
.lawyer-info-section {
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.lawyer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.lawyer-details {
  width: 100%;
  text-align: left;
}

.lawyer-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.lawyer-name {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}

.lawyer-badge {
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

.lawyer-organization {
  font-size: 14px;
  color: #666666;
  display: block;
  margin-bottom: 8px;
}

.satisfaction-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.satisfaction-text {
  font-size: 14px;
  color: #666666;
}

.lawyer-rating {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: #dddddd;
}

.star.active {
  color: #ffb400;
}

.lawyer-description,
.lawyer-expertise,
.lawyer-region {
  font-size: 14px;
  color: #666666;
  display: block;
  margin-bottom: 8px;
  line-height: 1.5;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.message-item {
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message-item.lawyer {
  justify-content: flex-start;
}

.message-item.user {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.message-content {
  max-width: 70%;
  padding: 10px 12px;
  border-radius: 8px;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.5;
}

.message-content.lawyer {
  background-color: #ffffff;
  color: #333333;
}

.message-content.user {
  background-color: #1890ff;
  color: #ffffff;
}

.message-time {
  font-size: 10px;
  color: #999999;
  margin-top: 4px;
}

.input-container {
  background-color: #ffffff;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.message-input {
  flex: 1;
  height: 40px;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 14px;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999999;
}

.send-button {
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  line-height: 1.5;
}
</style>
