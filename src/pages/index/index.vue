<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Home',
})

// 定义页面配置
definePage({
  // 使用 type: "home" 属性设置首页
  type: 'home',
  style: {
    // 保留默认导航栏，只修改标题
    navigationBarTitleText: '调E调法律服务平台',
  },
})

// 获取安全区域信息
const safeAreaInsets = uni.getStorageSync('safeAreaInsets') || { top: 0 }

// 轮播图数据
const swiperList = ref<string[]>([
  'https://placeholder.pics/svg/800x300/409EFF/FFFFFF/专注优质法律服务',
  'https://placeholder.pics/svg/800x300/409EFF/FFFFFF/法律保障权益',
  'https://placeholder.pics/svg/800x300/409EFF/FFFFFF/专业律师在线咨询',
])

// 当前轮播图索引
const current = ref<number>(0)

// 轮播图点击事件处理函数
function handleClick(e: any) {
  console.log('轮播图点击', e)
}

// 轮播图切换事件处理函数
function onChange(e: any) {
  console.log('轮播图切换', e)
  current.value = e.detail
}
</script>

<template>
  <view class="min-h-screen bg-gray-50" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <!-- 使用 wot-design-uni 的轮播图组件（按官方文档正确用法） -->
    <wd-swiper
      v-model:current="current"
      :list="swiperList"
      autoplay
      :indicator="{ type: 'dots', activeColor: '#ffffff', inactiveColor: 'rgba(255, 255, 255, 0.6)' }"
      indicator-position="bottom"
      :interval="3000"
      @click="handleClick"
      @change="onChange"
    />

    <!-- 欢迎加入提示 -->
    <view class="mt-3 flex items-center bg-amber-50 p-3 space-x-2">
      <image src="/static/app/notification.png" mode="aspectFit" class="h-4 w-4" />
      <text class="text-sm text-amber-800">我啦！欢迎律师、调解员、合同管理员加入平台，共同打造专业法律服务网络</text>
    </view>

    <!-- 我要调解、仲裁区块 -->
    <view class="mt-4">
      <text class="px-4 text-gray-800 font-medium">我要调解、仲裁</text>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 纠纷调解卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-blue-500 p-4 shadow-md">
          <image src="/static/app/mediation.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">纠纷调解</text>
          <text class="mt-1 text-xs text-white/90">线上调解，方便省事</text>
        </view>
        <!-- 仲裁办理卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-blue-400 p-4 shadow-md">
          <image src="/static/app/arbitration.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">仲裁办理</text>
          <text class="mt-1 text-xs text-white/90">确认产生法律强制力</text>
        </view>
      </view>
    </view>

    <!-- 我的服务区块 -->
    <view class="mt-4">
      <text class="px-4 text-gray-800 font-medium">我的服务</text>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 法律咨询卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-red-500 p-4 shadow-md">
          <image src="/static/app/consultation.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">法律咨询</text>
          <text class="mt-1 text-xs text-white/90">立即咨询，高效准确</text>
        </view>
        <!-- 合同服务卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-orange-500 p-4 shadow-md">
          <image src="/static/app/contract.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">合同服务</text>
          <text class="mt-1 text-xs text-white/90">预防纠纷，合同保障</text>
        </view>
        <!-- 案件代理卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-teal-500 p-4 shadow-md">
          <image src="/static/app/case.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">案件代理</text>
          <text class="mt-1 text-xs text-white/90">代理人查看案件</text>
        </view>
        <!-- 服务指南卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-blue-400 p-4 shadow-md">
          <image src="/static/app/guide.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">服务指南</text>
          <text class="mt-1 text-xs text-white/90">小程序使用指南</text>
        </view>
      </view>
    </view>

    <!-- 服务反馈区块 -->
    <view class="mt-4">
      <text class="px-4 text-gray-800 font-medium">服务反馈</text>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 服务评价卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-green-500 p-4 shadow-md">
          <image src="/static/app/evaluation.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">服务评价</text>
          <text class="mt-1 text-xs text-white/90">小程序服务评价</text>
        </view>
        <!-- 线上互动卡片 -->
        <view class="flex flex-col items-center rounded-xl bg-indigo-500 p-4 shadow-md">
          <image src="/static/app/interactive.png" mode="aspectFit" class="mb-2 h-10 w-10" />
          <text class="text-white font-medium">线上互动</text>
          <text class="mt-1 text-xs text-white/90">扫码进群在线互动</text>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="mb-4 mt-6 px-4">
      <text class="block text-center text-xs text-gray-500">本小程序由庆阳仲裁委员会提供支持，西安案件咨询有限公司开发，努力建设全业务、全时空的法律服务网络，为社会提供便捷高效的法律服务。</text>
    </view>
  </view>
</template>
