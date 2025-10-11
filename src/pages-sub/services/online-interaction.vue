<script setup lang="ts">
import { ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '服务评价',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 二维码数据
const qrcodeItems = ref([
  {
    id: 'consultation',
    title: '咨询与交流',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+咨询与交流',
  },
  {
    id: 'mediation',
    title: '调解组织、调解员管理',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+调解组织',
  },
  {
    id: 'lawyer',
    title: '律师管理',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+律师管理',
  },
  {
    id: 'operation',
    title: '运营中心管理',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+运营中心',
  },
  {
    id: 'arbitrator',
    title: '仲裁员管理',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+仲裁员管理',
  },
  {
    id: 'secretary',
    title: '办案秘书管理',
    image: 'https://placeholder.pics/svg/200x200/FFFFFF/000000/QRCODE+办案秘书',
  },
])

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="online-interaction-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        服务评价
      </view>
      <view class="header-right" />
    </view>

    <!-- 二维码列表 -->
    <view class="qrcode-container">
      <view class="qrcode-grid">
        <view v-for="item in qrcodeItems" :key="item.id" class="qrcode-item">
          <view class="qrcode-image">
            <image :src="item.image" mode="aspectFill" class="h-full w-full" />
          </view>
          <text class="qrcode-title">{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.online-interaction-container {
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

.qrcode-container {
  padding: 16px;
}

.qrcode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.qrcode-image {
  width: 160px;
  height: 160px;
  margin-bottom: 8px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.qrcode-image image {
  width: 100%;
  height: 100%;
}

.qrcode-title {
  font-size: 14px;
  color: #333333;
  text-align: center;
  line-height: 1.4;
}
</style>
