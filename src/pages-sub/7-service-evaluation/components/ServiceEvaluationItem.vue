<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface EvaluationItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  isEnabled: boolean
  onClick: () => void
}

const props = defineProps<{
  item: EvaluationItem
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
    class="evaluation-item"
    :style="itemStyle"
    @click="item.onClick"
  >
    <view class="evaluation-icon" :style="iconStyle">
      <text class="icon-text">{{ item.icon }}</text>
    </view>
    <view class="evaluation-info">
      <text class="evaluation-title">{{ item.title }}</text>
      <text class="evaluation-description">{{ item.description }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.evaluation-item {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.evaluation-item:active {
  transform: scale(0.98);
}

.evaluation-icon {
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

.evaluation-info {
  flex: 1;
}

.evaluation-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4px;
}

.evaluation-description {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}
</style>
