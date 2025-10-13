<script setup lang="ts">
import { computed } from 'vue'

interface ExampleCardProps {
  title: string
  description: string
  icon?: string
  type?: 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<ExampleCardProps>(), {
  icon: '📝',
  type: 'primary',
})

const bgColor = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'bg-blue-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    danger: 'bg-red-50',
  }
  return colorMap[props.type]
})

const textColor = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  }
  return colorMap[props.type]
})

const borderColor = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'border-blue-200',
    success: 'border-green-200',
    warning: 'border-yellow-200',
    danger: 'border-red-200',
  }
  return colorMap[props.type]
})

function handleClick() {
  console.log('Card clicked:', props.title)
  // #ifdef H5
  uni.showToast({
    title: `点击了卡片：${props.title}`,
    icon: 'none',
  })
  // #endif
  // #ifdef MP-WEIXIN
  uni.showToast({
    title: `点击了卡片：${props.title}`,
    icon: 'none',
  })
  // #endif
}
</script>

<template>
  <view
    class="example-card flex cursor-pointer items-center gap-3 border rounded-lg p-4 transition-all hover:shadow-md"
    :class="[bgColor, borderColor]"
    @click="handleClick"
  >
    <view class="text-2xl" :class="textColor">
      {{ icon }}
    </view>
    <view class="flex-1">
      <view class="mb-1 font-semibold" :class="textColor">
        {{ title }}
      </view>
      <view class="text-sm text-gray-600">
        {{ description }}
      </view>
    </view>
    <view class="text-gray-400">
      <uni-icons name="arrowright" size="16" />
    </view>
  </view>
</template>

<style scoped>
.example-card {
  border: 1px solid #e5e7eb;
}

.example-card:active {
  transform: scale(0.98);
}
</style>
