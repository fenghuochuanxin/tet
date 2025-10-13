<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import ServiceEvaluationItem from './components/ServiceEvaluationItem.vue'

const router = useRouter()
const userStore = useUserStore()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '服务评价',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 服务评价项数据
const evaluationItems = ref([
  {
    id: 'dispute-mediation',
    title: '纠纷调解',
    description: '查看平台客户二维码',
    icon: '👥',
    color: '#1989fa',
    isEnabled: true,
    onClick: () => handleEvaluationClick('dispute-mediation'),
  },
  {
    id: 'arbitration-confirmation',
    title: '仲裁确认',
    description: '查看平台客户二维码',
    icon: '📜',
    color: '#4096ff',
    isEnabled: true,
    onClick: () => handleEvaluationClick('arbitration-confirmation'),
  },
  {
    id: 'legal-consultation',
    title: '法律咨询',
    description: '查看平台客户二维码',
    icon: '💬',
    color: '#ff4d4f',
    isEnabled: true,
    onClick: () => handleEvaluationClick('legal-consultation'),
  },
])

// 处理服务评价项点击
function handleEvaluationClick(evaluationId: string) {
  const evaluation = evaluationItems.value.find(item => item.id === evaluationId)

  if (!evaluation) {
    uni.showToast({
      title: '未找到该项服务',
      icon: 'none',
    })
    return
  }

  if (!evaluation.isEnabled) {
    uni.showToast({
      title: '该功能暂未开发',
      icon: 'none',
    })
    return
  }

  // 根据不同的服务类型跳转到对应的二维码页面
  switch (evaluationId) {
    case 'dispute-mediation':
      // 跳转到纠纷调解二维码页面
      uni.navigateTo({
        url: '/pages-sub/services/dispute-mediation-qrcode',
      })
      break
    case 'arbitration-confirmation':
      // 跳转到仲裁确认二维码页面
      uni.navigateTo({
        url: '/pages-sub/services/arbitration-confirmation-qrcode',
      })
      break
    case 'legal-consultation':
      // 跳转到法律咨询二维码页面
      uni.navigateTo({
        url: '/pages-sub/services/legal-consultation-qrcode',
      })
      break
    default:
      uni.showToast({
        title: '即将开放',
        icon: 'none',
      })
  }
}
</script>

<template>
  <view class="service-evaluation-container">
    <!-- 服务评价列表 -->
    <view class="evaluations-container">
      <ServiceEvaluationItem
        v-for="item in evaluationItems"
        :key="item.id"
        :item="item"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.service-evaluation-container {
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

.evaluations-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
