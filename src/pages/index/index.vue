<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

// 定义页面配置
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

// 定义卡片配置接口
interface CardItem {
  id: string
  title: string
  subtitle: string
  icon: string
  backgroundColor: string
  route: string
}

// 服务反馈模块卡片配置
const serviceFeedbackCards = ref<CardItem[]>([
  {
    id: 'dispute-mediation',
    title: '纠纷调解',
    subtitle: '线上调解，方便省事',
    icon: 'mdi:handshake',
    backgroundColor: 'bg-blue-500',
    route: '/pages-sub/1-dispute-mediation/index',
  },
  {
    id: 'arbitration',
    title: '仲裁办理',
    subtitle: '确认产生法律强制力',
    icon: 'mdi:gavel',
    backgroundColor: 'bg-blue-400',
    route: '/pages-sub/2-arbitration/index',
  },
])

// 我的服务模块卡片配置
const myServicesCards = ref<CardItem[]>([
  {
    id: 'legal-consultation',
    title: '法律咨询',
    subtitle: '立即咨询，高效准确',
    icon: 'mdi:scale',
    backgroundColor: 'bg-red-500',
    route: '/pages-sub/3-legal-consultation/index',
  },
  {
    id: 'contract-service',
    title: '合同服务',
    subtitle: '预防纠纷，合同保障',
    icon: 'mdi:file-sign',
    backgroundColor: 'bg-orange-500',
    route: '/pages-sub/4-contract-service/index',
  },
  {
    id: 'case-representation',
    title: '案件代理',
    subtitle: '代理人查看案件',
    icon: 'mdi:briefcase',
    backgroundColor: 'bg-teal-500',
    route: '/pages-sub/5-case-representation/index',
  },
  {
    id: 'service-guide',
    title: '服务指南',
    subtitle: '小程序使用指南',
    icon: 'mdi:help-circle',
    backgroundColor: 'bg-blue-400',
    route: '/pages-sub/6-service-guide/index',
  },
])

// 我要调解、仲裁模块卡片配置
const mediationArbitrationCards = ref<CardItem[]>([
  {
    id: 'service-evaluation',
    title: '服务评价',
    subtitle: '小程序服务评价',
    icon: 'mdi:star',
    backgroundColor: 'bg-green-500',
    route: '/pages-sub/7-service-evaluation/index',
  },
  {
    id: 'qrcode',
    title: '码上互动',
    subtitle: '扫码进群在线互动',
    icon: 'mdi:comment',
    backgroundColor: 'bg-indigo-500',
    route: '/pages-sub/8-qrcode/index',
  },
])

// 统一的导航处理函数
function handleCardClick(route: string) {
  uni.navigateTo({
    url: route,
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <!-- 使用 wot-design-uni 的轮播图组件 -->
    <wd-swiper
      v-model:current="current"
      :list="swiperList"
      autoplay
      :indicator="true"
      indicator-position="bottom"
      :interval="3000"
      @click="handleClick"
      @change="onChange"
    />

    <!-- 欢迎加入提示 -->
    <view class="mt-3 flex items-center bg-amber-50 p-3 space-x-2">
      <Icon icon="mdi:bell" class="h-4 w-4 text-amber-800" />
      <text class="text-sm text-amber-800">我啦！欢迎律师、调解员、合同管理员加入平台，共同打造专业法律服务网络</text>
    </view>

    <!-- 服务反馈区块 -->
    <view class="mt-4">
      <view class="flex items-center">
        <view class="ml-4 mr-2 h-5 w-1 bg-blue-500" />
        <text class="px-2 text-gray-800 font-medium">服务反馈</text>
      </view>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 服务反馈卡片 - 通过配置数组渲染 -->
        <view
          v-for="card in serviceFeedbackCards"
          :key="card.id"
          class="flex cursor-pointer items-center rounded-xl p-4 shadow-md"
          :class="card.backgroundColor"
          @click="handleCardClick(card.route)"
        >
          <Icon :icon="card.icon" class="h-10 w-10 text-white" />
          <view class="ml-3">
            <text class="text-white font-medium">{{ card.title }}</text>
            <text class="block text-xs text-white/90">{{ card.subtitle }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 我的服务区块 -->
    <view class="mt-4">
      <view class="flex items-center">
        <view class="ml-4 mr-2 h-5 w-1 bg-blue-500" />
        <text class="px-2 text-gray-800 font-medium">我的服务</text>
      </view>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 我的服务卡片 - 通过配置数组渲染 -->
        <view
          v-for="card in myServicesCards"
          :key="card.id"
          class="flex cursor-pointer items-center rounded-xl p-4 shadow-md"
          :class="card.backgroundColor"
          @click="handleCardClick(card.route)"
        >
          <Icon :icon="card.icon" class="h-10 w-10 text-white" />
          <view class="ml-3">
            <text class="text-white font-medium">{{ card.title }}</text>
            <text class="block text-xs text-white/90">{{ card.subtitle }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 我要调解、仲裁区块 -->
    <view class="mt-4">
      <view class="flex items-center">
        <view class="ml-4 mr-2 h-5 w-1 bg-blue-500" />
        <text class="px-2 text-gray-800 font-medium">我要调解、仲裁</text>
      </view>
      <view class="grid grid-cols-2 mt-2 gap-3 px-4">
        <!-- 我要调解、仲裁卡片 - 通过配置数组渲染 -->
        <view
          v-for="card in mediationArbitrationCards"
          :key="card.id"
          class="flex cursor-pointer items-center rounded-xl p-4 shadow-md"
          :class="card.backgroundColor"
          @click="handleCardClick(card.route)"
        >
          <Icon :icon="card.icon" class="h-10 w-10 text-white" />
          <view class="ml-3">
            <text class="text-white font-medium">{{ card.title }}</text>
            <text class="block text-xs text-white/90">{{ card.subtitle }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="mb-4 mt-6 px-4">
      <text class="block text-center text-xs text-gray-500">本小程序由庆阳仲裁委员会提供支持，西安案件咨询有限公司开发，努力建设全业务、全时空的法律服务网络，为社会提供便捷高效的法律服务。</text>
    </view>
  </view>
</template>
