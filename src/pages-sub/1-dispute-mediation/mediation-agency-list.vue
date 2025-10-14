<script setup lang="ts">
import { ref } from 'vue'

// 调解机构数据类型
interface MediationAgency {
  id: string
  name: string
  mediatorCount: number
  address: string
  distance?: string
  hasLocationService: boolean
}

// 调解机构列表数据
const agencies = ref<MediationAgency[]>([
  {
    id: '1',
    name: '南阳市卧龙区商事金融纠纷调解中心',
    mediatorCount: 1,
    address: 'null-null-null',
    hasLocationService: false,
  },
  {
    id: '2',
    name: '内蒙古立信多元纠纷调解中心',
    mediatorCount: 1,
    address: '内蒙古自治区-呼和浩特市-新城区',
    hasLocationService: false,
  },
  {
    id: '3',
    name: '庆阳仲裁委员会调解中心',
    mediatorCount: 53,
    address: '甘肃省-庆阳市-西峰区',
    distance: '1146.22公里',
    hasLocationService: true,
  },
  {
    id: '4',
    name: '调解组织',
    mediatorCount: 6,
    address: '甘肃省-庆阳市-西峰区',
    distance: '1145.57公里',
    hasLocationService: true,
  },
  {
    id: '5',
    name: '律师所',
    mediatorCount: 10,
    address: '甘肃省-庆阳市-西峰区',
    distance: '1145.57公里',
    hasLocationService: true,
  },
])

// 页面加载时的逻辑
function onLoad() {
  console.log('调解机构列表页面加载')
}

// 跳转到调解机构详情页面
function navigateToAgencyDetail(agency: MediationAgency) {
  uni.navigateTo({
    url: `/pages-sub/1-dispute-mediation/mediation-agency-detail?id=${agency.id}&name=${encodeURIComponent(agency.name)}`,
  })
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="mediation-agency-list">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @click="navigateBack">
        <text class="nav-back-icon">←</text>
      </view>
      <text class="nav-title">调E调</text>
      <view class="nav-right">
        <text class="ellipsis-icon">...</text>
        <text class="minimize-icon">−</text>
        <text class="close-icon">ⓧ</text>
      </view>
    </view>

    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">调解机构</text>
    </view>

    <!-- 调解机构列表 -->
    <view class="agency-list">
      <view
        v-for="agency in agencies"
        :key="agency.id"
        class="agency-item"
        @click="navigateToAgencyDetail(agency)"
      >
        <view class="agency-icon">
          <image src="/static/images/building-icon.png" mode="aspectFit" />
        </view>
        <view class="agency-info">
          <text class="agency-name">{{ agency.name }}</text>
          <text class="mediator-count">共有{{ agency.mediatorCount }}位调解员</text>
          <text class="agency-address">地址:{{ agency.address }}</text>
          <text v-if="!agency.hasLocationService" class="no-location-tip">该机构暂未提供位置服务</text>
          <text v-if="agency.distance" class="distance-tip">距离您{{ agency.distance }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mediation-agency-list {
  min-height: 100vh;
  background-color: #f5f5f5;

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    background-color: #fff;
    padding: 0 16px;
    border-bottom: 1px solid #eee;

    .nav-back {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-back-icon {
        font-size: 18px;
        color: #333;
      }
    }

    .nav-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ellipsis-icon,
    .minimize-icon,
    .close-icon {
      font-size: 16px;
      color: #333;
    }
  }

  .page-header {
    padding: 16px;
    background-color: #fff;
    margin-bottom: 10px;

    .page-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }

  .agency-list {
    padding: 0 16px;
    gap: 10px;
    display: flex;
    flex-direction: column;

    .agency-item {
      background-color: #fff;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      gap: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.2s;

      &:active {
        background-color: #f8f8f8;
      }

      .agency-icon {
        width: 50px;
        height: 50px;
        background-color: #f0f0f0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .agency-icon image {
        width: 30px;
        height: 30px;
      }

      .agency-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .agency-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .mediator-count {
          font-size: 14px;
          color: #666;
        }

        .agency-address {
          font-size: 14px;
          color: #666;
        }

        .no-location-tip,
        .distance-tip {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
