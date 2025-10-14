<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

definePage({
  style: {
    navigationBarTitleText: '案件代理',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: true,
})

// 页面加载时自动跳转到案件代理列表页面
onMounted(() => {
  router.push({
    path: '/pages-sub/5-case-representation/case-representation',
  })
})
</script>

<template>
  <view class="arbitration-apply-container">
    <text>正在跳转...</text>
  </view>
</template>

<style lang="scss" scoped>
.arbitration-apply-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
