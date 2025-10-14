<script setup lang="ts">
import { ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '码上互动',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 二维码数据
const qrcodeItems = ref([
  {
    id: 'consultation',
    title: '咨询与交流',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+咨询与交流',
  },
  {
    id: 'mediation',
    title: '调解组织、调解员管理',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+调解组织',
  },
  {
    id: 'lawyer',
    title: '律师管理',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+律师管理',
  },
  {
    id: 'operation',
    title: '运营中心管理',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+运营中心',
  },
  {
    id: 'arbitrator',
    title: '仲裁员管理',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+仲裁员管理',
  },
  {
    id: 'secretary',
    title: '办案秘书管理',
    image: 'https://placeholder.pics/svg/160x160/FFFFFF/000000/QRCODE+办案秘书',
  },
])
</script>

<template>
  <view class="online-interaction-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left">
        <text class="back-icon" @click="() => window.history.back()">←</text>
      </view>
      <view class="header-title">
        码上互动
      </view>
      <view class="header-right" />
    </view>

    <!-- 页面介绍 -->
    <view class="page-intro">
      <text class="intro-text">扫描二维码，快速进入对应功能</text>
    </view>

    <!-- 二维码列表 -->
    <view class="qrcode-container">
      <view class="qrcode-grid">
        <view v-for="item in qrcodeItems" :key="item.id" class="qrcode-item">
          <view class="qrcode-image">
            <image :src="item.image" mode="aspectFill" />
            <view class="qrcode-border" />
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
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
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

.page-intro {
  padding: 12px 16px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.intro-text {
  font-size: 14px;
  color: #666666;
}

.qrcode-container {
  flex: 1;
  padding: 12px 16px 24px;
  overflow-y: auto;
}

.qrcode-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 100%;
  margin: 0 auto;
}

.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.qrcode-item:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.qrcode-image {
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px;
  border: 1px solid #f0f0f0;
}

.qrcode-image image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.qrcode-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  pointer-events: none;
}

.qrcode-title {
  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: 1.4;
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 36px;
  display: flex;
  align-items: center;
}

/* 媒体查询，适配不同屏幕 */
@media (max-width: 320px) {
  .qrcode-image {
    width: 100px;
    height: 100px;
  }

  .qrcode-title {
    font-size: 12px;
  }
}

@media (min-width: 414px) {
  .qrcode-grid {
    gap: 20px;
  }

  .qrcode-item {
    padding: 16px;
  }

  .qrcode-image {
    width: 140px;
    height: 140px;
  }
}
</style>
