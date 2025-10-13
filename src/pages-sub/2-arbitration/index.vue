<script setup lang="ts">
import { Icon } from '@iconify/vue'

// 定义页面配置
defineOptions({
  name: 'ArbitrationConfirmation',
})

// 定义页面配置，设置标题为仲裁确认
definePage({
  style: {
    navigationBarTitleText: '仲裁办理',
  },
})

/**
 * 申请仲裁确认按钮点击处理函数
 */
function handleApplyArbitration() {
  // 这里可以添加申请仲裁确认的逻辑
  uni.navigateTo({
    url: '/pages-sub/arbitration/apply',
  })
}

/**
 * 我的案件按钮点击处理函数
 */
function handleMyCases() {
  // 这里可以添加查看我的案件的逻辑
  uni.navigateTo({
    url: '/pages-sub/arbitration/cases',
  })
}

/**
 * 确认协议模板下载按钮点击处理函数
 */
function handleDownloadTemplate() {
  // 这里可以添加查看我的案件的逻辑
  uni.navigateTo({
    url: '/pages-sub/arbitration/template-download',
  })
}
</script>

<template>
  <view class="min-h-screen bg-white">
    <view class="box-border h-40 w-full">
      <image src="https://picsum.photos/800/400" mode="aspectFill" class="h-full w-full" />
    </view>
    <!-- 功能按钮区域 -->
    <view class="mx-4 mt-4">
      <!-- 申请仲裁确认按钮 -->
      <view
        class="mb-4 rounded-xl bg-blue-500 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
        @click="handleApplyArbitration"
      >
        <div class="flex items-center">
          <Icon icon="mdi:user-circle" class="mr-3 h-6 w-6 text-white" />
          <div>
            <text class="text-base text-white font-medium">申请仲裁确认</text>
            <text class="mt-1 block text-xs text-white/80">申请仲裁立案</text>
          </div>
        </div>
      </view>

      <!-- 我的案件按钮 -->
      <view
        class="mb-4 rounded-xl bg-blue-400 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
        @click="handleMyCases"
      >
        <div class="flex items-center">
          <Icon icon="mdi:clipboard-list" class="mr-3 h-6 w-6 text-white" />
          <div>
            <text class="text-base text-white font-medium">我的案件</text>
            <text class="mt-1 block text-xs text-white/80">查看全部仲裁确认案件</text>
          </div>
        </div>
      </view>

      <!-- 确认协议模板下载按钮 -->
      <view
        class="rounded-xl bg-teal-500 p-4 shadow-lg transition-transform duration-200 hover:scale-105"
        @click="handleDownloadTemplate"
      >
        <div class="flex items-center">
          <Icon icon="mdi:file-download" class="mr-3 h-6 w-6 text-white" />
          <div>
            <text class="text-base text-white font-medium">确认协议模板下载</text>
            <text class="mt-1 block text-xs text-white/80">下载仲裁确认协议模板</text>
          </div>
        </div>
      </view>
    </view>

    <!-- 温馨提示区域 -->
    <view class="mt-6 px-4">
      <view class="rounded-lg bg-gray-50 p-4">
        <text class="mb-2 block text-gray-700 font-medium">温馨提示：</text>
        <text class="text-sm text-gray-600 leading-6">
          仲裁确认功能旨在为当事人提供其自行达成的调解协议进行仲裁法律文书确认服务，仲裁确认成功后将出具仲裁调解书，该调解书与裁决书具有同等效力，一方当事人不履行调解书确定履行义务时，另一方当事人可向被申请人的财产、户籍所在地中级人民法院申请强制执行。
        </text>
      </view>
    </view>
  </view>
</template>
