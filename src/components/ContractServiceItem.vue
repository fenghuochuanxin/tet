<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  isEnabled: boolean
  onClick: () => void
}

const props = defineProps<{
  item: ServiceItem
}>()

// 计算样式
const itemStyle = computed(() => ({
  backgroundColor: props.item.isEnabled ? props.item.color : '#f5f5f5',
  opacity: props.item.isEnabled ? 1 : 0.7,
  color: '#ffffff',
}))

const iconStyle = computed(() => ({
  backgroundColor: `${props.item.color}1A`, // 10% opacity version of the color
  color: props.item.color,
}))
</script>

<template>
  <view
    class="service-item"
    :style="itemStyle"
    @click="item.onClick"
  >
    <view class="service-icon" :style="iconStyle">
      <text class="icon-text">{{ item.icon }}</text>
    </view>
    <view class="service-info">
      <text class="service-title">{{ item.title }}</text>
      <text class="service-description">{{ item.description }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.service-item {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.service-item:active {
  transform: scale(0.98);
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-text {
  font-size: 24px;
}

.service-info {
  flex: 1;
}

.service-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4px;
}

.service-description {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}
</style>
