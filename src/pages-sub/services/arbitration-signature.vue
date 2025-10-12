<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = ref(route.query.caseId as string || '')

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '签名确认',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 画布引用
const canvasRef = ref<HTMLCanvasElement | null>(null)

// 签名数据
const signatureData = ref<string>('')

// 签名相关变量
let ctx: CanvasRenderingContext2D | null = null
const isDrawing = ref(false)
let lastX = 0
let lastY = 0

// 签名粗细
const lineWidth = ref(3)

// 签名颜色
const lineColor = ref('#000000')

// 初始化画布
function initCanvas() {
  if (!canvasRef.value)
    return

  const canvas = canvasRef.value
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  // 设置画布尺寸，考虑设备像素比
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  // 获取绘图上下文
  ctx = canvas.getContext('2d')
  if (!ctx)
    return

  // 设置绘图样式
  ctx.scale(dpr, dpr)
  ctx.lineWidth = lineWidth.value
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = lineColor.value
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, rect.width, rect.height)
}

// 开始绘制
function startDrawing(e: TouchEvent) {
  if (!ctx)
    return

  isDrawing.value = true
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect)
    return

  const touch = e.touches[0]
  lastX = touch.clientX - rect.left
  lastY = touch.clientY - rect.top
}

// 绘制中
function draw(e: TouchEvent) {
  if (!isDrawing.value || !ctx)
    return

  e.preventDefault()
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect)
    return

  const touch = e.touches[0]
  const currentX = touch.clientX - rect.left
  const currentY = touch.clientY - rect.top

  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()

  lastX = currentX
  lastY = currentY
}

// 结束绘制
function stopDrawing() {
  isDrawing.value = false
  if (canvasRef.value) {
    // 保存签名数据
    signatureData.value = canvasRef.value.toDataURL('image/png')
  }
}

// 清除签名
function clearSignature() {
  if (!ctx || !canvasRef.value)
    return

  const rect = canvasRef.value.getBoundingClientRect()
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, rect.width, rect.height)
  signatureData.value = ''
}

// 提交签名
function submitSignature() {
  if (!signatureData.value) {
    uni.showToast({
      title: '请先完成签名',
      icon: 'none',
    })
    return
  }

  // 显示加载提示
  uni.showLoading({
    title: '提交中...',
  })

  // 模拟提交过程
  setTimeout(() => {
    uni.hideLoading()

    // 提交成功提示
    uni.showToast({
      title: '签名提交成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        // 返回案件详情页面
        setTimeout(() => {
          router.push({
            path: '/pages-sub/services/arbitration-case-detail',
            query: { caseId: caseId.value },
          })
        }, 2000)
      },
    })
  }, 1500)
}

// 页面加载时初始化画布
onMounted(() => {
  // 延迟初始化，确保DOM已经渲染
  setTimeout(() => {
    initCanvas()
  }, 100)
})

// 页面尺寸变化时重新初始化画布
function handleResize() {
  initCanvas()
}

// 监听窗口尺寸变化
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <view class="arbitration-signature-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="() => router.back()">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        签名确认
      </view>
      <view class="header-right" />
    </view>

    <!-- 签名区域 -->
    <view class="signature-section">
      <view class="signature-container">
        <canvas
          ref="canvasRef"
          class="signature-canvas"
          style="touch-action: none;"
          @touchstart="startDrawing"
          @touchmove="draw"
          @touchend="stopDrawing"
          @touchcancel="stopDrawing"
        />
      </view>

      <!-- 签名控制 -->
      <view class="signature-controls">
        <slider
          v-model="lineWidth"
          min="1"
          max="10"
          show-value
          class="line-width-slider"
        />
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-buttons">
      <button class="secondary-button" @click="clearSignature">
        重新签名
      </button>
      <button class="primary-button" @click="submitSignature">
        提交签名
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.arbitration-signature-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
}

.header-left {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 18px;
  color: #333333;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.header-right {
  width: 40px;
}

.signature-section {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.signature-container {
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;
  min-height: 300px;
}

.signature-canvas {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.signature-controls {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
}

.line-width-slider {
  width: 100%;
}

.action-buttons {
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
}

.primary-button {
  flex: 1;
  height: 45px;
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 22.5px;
  font-size: 16px;
  font-weight: bold;
  border: none;
}

.secondary-button {
  flex: 1;
  height: 45px;
  background-color: #ffffff;
  color: #666666;
  border-radius: 22.5px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #e0e0e0;
}

/* 适配不同平台 */
@media screen and (min-width: 768px) {
  .arbitration-signature-container {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
}
</style>
