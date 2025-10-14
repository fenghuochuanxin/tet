<script setup lang="ts">
import { ref } from 'vue'

// 调解机构详情数据类型
interface AgencyDetail {
  id: string
  name: string
  contactPerson: string
  creationDate: string
  description: string
  address: string
  email: string
  phone: string
  mediatorCount: number
  isPaid: boolean
}

// 调解员信息类型
interface Mediator {
  name: string
  gender: string
  phone: string
  caseCount: number
  successRate: string
}

// 调解机构详情数据
const agencyDetail = ref<AgencyDetail>({
  id: '',
  name: '',
  contactPerson: '',
  creationDate: '',
  description: 'null',
  address: '',
  email: 'null',
  phone: '',
  mediatorCount: 0,
  isPaid: false,
})

// 调解员数据
const mediator = ref<Mediator>({
  name: '',
  gender: '',
  phone: '',
  caseCount: 0,
  successRate: '',
})

function onLoad(options: any) {
  // 获取参数
  const { id, name } = options

  // 设置页面标题
  if (name) {
    const title = name || '调解机构详情'
    // #ifdef H5
    document.title = title
    // #endif
    // #ifdef MP-WEIXIN || APP-PLUS
    uni.setNavigationBarTitle({
      title,
    })
    // #endif
  }

  // 根据id设置调解机构详情和调解员信息
  if (id === '1') {
    // 南阳市卧龙区商事金融纠纷调解中心
    agencyDetail.value = {
      id: '1',
      name: '南阳市卧龙区商事金融纠纷调解中心',
      contactPerson: '范明轩',
      creationDate: '2025-05-21',
      description: 'null',
      address: 'nullnullnullnullnull',
      email: 'null',
      phone: '13137777777',
      mediatorCount: 1,
      isPaid: false,
    }
    mediator.value = {
      name: '范明轩',
      gender: '男',
      phone: '13137777777',
      caseCount: 0,
      successRate: '0%',
    }
  }
  else if (id === '2') {
    // 内蒙古立信多元纠纷调解中心
    agencyDetail.value = {
      id: '2',
      name: '内蒙古立信多元纠纷调解中心',
      contactPerson: '栗军',
      creationDate: '2025-04-27',
      description: 'null',
      address: '内蒙古自治区呼和浩特市新城区null',
      email: 'null',
      phone: '14747392777',
      mediatorCount: 1,
      isPaid: false,
    }
    mediator.value = {
      name: '栗军',
      gender: '男',
      phone: '14747392777',
      caseCount: 0,
      successRate: '0%',
    }
  }
  else if (id === '3') {
    // 庆阳仲裁委员会调解中心
    agencyDetail.value = {
      id: '3',
      name: '庆阳仲裁委员会调解中心',
      contactPerson: '庆阳仲裁委员会调解中心',
      creationDate: '2024-05-24',
      description: 'null',
      address: '甘肃省-庆阳市-西峰区',
      email: 'null',
      phone: '15319666666',
      mediatorCount: 53,
      isPaid: false,
    }
    mediator.value = {
      name: '庆阳仲裁委员会调解中心',
      gender: '男',
      phone: '15319666666',
      caseCount: 0,
      successRate: '0%',
    }
  }
  else if (id === '4') {
    // 调解组织
    agencyDetail.value = {
      id: '4',
      name: '调解组织',
      contactPerson: '调解组织',
      creationDate: '2024-03-15',
      description: 'null',
      address: '甘肃省-庆阳市-西峰区',
      email: 'null',
      phone: '13893456789',
      mediatorCount: 6,
      isPaid: false,
    }
    mediator.value = {
      name: '调解组织',
      gender: '男',
      phone: '13893456789',
      caseCount: 0,
      successRate: '0%',
    }
  }
  else if (id === '5') {
    // 律师所
    agencyDetail.value = {
      id: '5',
      name: '律师所',
      contactPerson: '律师所',
      creationDate: '2024-01-05',
      description: 'null',
      address: '甘肃省-庆阳市-西峰区',
      email: 'null',
      phone: '13909345678',
      mediatorCount: 10,
      isPaid: false,
    }
    mediator.value = {
      name: '律师所',
      gender: '男',
      phone: '13909345678',
      caseCount: 0,
      successRate: '0%',
    }
  }
}

// 拨打电话
function makePhoneCall() {
  if (agencyDetail.value.phone && agencyDetail.value.phone !== 'null') {
    uni.makePhoneCall({
      phoneNumber: agencyDetail.value.phone,
      success() {
        console.log('拨打电话成功')
      },
      fail(err) {
        console.log('拨打电话失败', err)
      },
    })
  }
  else {
    uni.showToast({
      title: '暂无联系电话',
      icon: 'none',
    })
  }
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 选择调解员
function selectMediator() {
  // 处理选择调解员的逻辑，跳转到调解申请页面
  console.log('选择调解员', mediator.value)
  uni.navigateTo({
    url: '/pages-sub/1-dispute-mediation/mediation-request-new',
  })
}
</script>

<template>
  <view class="mediation-agency-detail">
    <!-- 返回按钮 -->
    <view class="back-button" @click="navigateBack">
      <text class="back-icon">←</text>
    </view>

    <!-- 页面标题 -->
    <view class="page-title">
      {{ agencyDetail.name }}
    </view>

    <!-- 机构信息卡片 -->
    <view class="agency-info-card">
      <view class="info-row">
        <text class="info-label">负责人：</text>
        <text class="info-value">{{ agencyDetail.contactPerson }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">创建时间：</text>
        <text class="info-value">{{ agencyDetail.creationDate }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">机构简介：</text>
        <text class="info-value">{{ agencyDetail.description }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">机构共有：</text>
        <text class="info-value">{{ agencyDetail.mediatorCount }} 名调解员</text>
      </view>
      <view class="info-row">
        <text class="info-label">地址：</text>
        <text class="info-value">{{ agencyDetail.address }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">机构邮箱：</text>
        <text class="info-value">{{ agencyDetail.email === 'null' ? '' : agencyDetail.email }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">机构咨询电话：</text>
        <text class="info-value phone-number" @click="makePhoneCall">{{ agencyDetail.phone }}（点击在线咨询）</text>
      </view>
    </view>

    <!-- 调解类型选择 -->
    <view class="mediation-type-section">
      <text class="section-title">调解员类型：</text>
      <view class="type-options">
        <view class="type-option">
          <radio value="paid" :checked="agencyDetail.isPaid" disabled />
          <text class="type-text">收费</text>
        </view>
        <view class="type-option">
          <radio value="free" :checked="!agencyDetail.isPaid" disabled />
          <text class="type-text">免费</text>
        </view>
      </view>
    </view>

    <!-- 调解员信息卡片 -->
    <view class="mediator-card">
      <view class="mediator-header">
        <image class="logo" src="/static/logo.svg" mode="aspectFit" />
        <view class="mediator-basic-info">
          <view class="mediator-name-row">
            <text class="mediator-name">姓名：{{ mediator.name }}</text>
            <text class="mediator-gender">性别：{{ mediator.gender }}</text>
          </view>
          <text class="mediator-phone">电话：{{ mediator.phone }}</text>
        </view>
        <button class="select-button" @click="selectMediator">
          选择
        </button>
      </view>
      <view class="mediator-stats">
        <text class="stat-item">共处理{{ mediator.caseCount }}起案件</text>
        <text class="stat-item success-rate">成功率：{{ mediator.successRate }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.mediation-agency-detail {
  padding: 20px;
  background: linear-gradient(180deg, #1a73e8 0%, #4285f4 100%);
  min-height: 100vh;
  color: white;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.back-icon {
  font-size: 24px;
  color: white;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
}

.agency-info-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.info-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  min-width: 100px;
}

.info-value {
  font-size: 16px;
  color: white;
  flex: 1;
}

.phone-number {
  text-decoration: underline;
  color: #ffd700;
}

.mediation-type-section {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  display: block;
}

.type-options {
  display: flex;
  gap: 30px;
}

.type-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-text {
  font-size: 16px;
}

.mediator-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  color: #333;
}

.mediator-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  background-color: white;
  border-radius: 8px;
}

.mediator-basic-info {
  flex: 1;
}

.mediator-name-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mediator-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.mediator-gender {
  font-size: 16px;
  color: #333;
}

.mediator-phone {
  font-size: 14px;
  color: #666;
}

.select-button {
  background-color: #07c160;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  min-width: 60px;
}

.mediator-stats {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.stat-item {
  font-size: 14px;
  color: #666;
}

.success-rate {
  color: #ff4d4f;
  font-weight: 500;
}
</style>
