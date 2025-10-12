<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = ref(route.query.caseId as string || '')

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '案件详情',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 案件详情数据接口
interface CaseDetail {
  id: string
  status: '已申请' | '已结束' | '已撤销' | '待处理'
  description: string
  createTime: string
  applicantInfo: {
    name: string
    ethnicity: string
    birthDate: string
    idNumber: string
    address: string
    phone: string
    idCardFront: string
    idCardBack: string
  }
  respondentInfo: {
    name: string
    ethnicity: string
    birthDate: string
    idNumber: string
    address: string
    phone: string
    idCardFront: string
    idCardBack: string
  }
  confirmationRequest: string
  factsAndReasons: string
  agreement: string
  evidence: {
    images: string[]
    pdfs: string[]
  }
  isCompleted: boolean
}

// 案件详情数据
const caseDetail = ref<CaseDetail>({
  id: caseId.value,
  status: '已申请',
  description: '立案待审核',
  createTime: '2024-09-25 10:42:10',
  isCompleted: false,
  applicantInfo: {
    name: '张三',
    ethnicity: '汉族',
    birthDate: '1990-01-01',
    idNumber: '110101199001011234',
    address: '北京市朝阳区某某街道',
    phone: '13800138000',
    idCardFront: '',
    idCardBack: '',
  },
  respondentInfo: {
    name: '李四',
    ethnicity: '汉族',
    birthDate: '1992-02-02',
    idNumber: '110101199202024321',
    address: '北京市海淀区某某街道',
    phone: '13900139000',
    idCardFront: '',
    idCardBack: '',
  },
  confirmationRequest: '1、请求依法确认申请人张三与被申请人李四于2024年9月1日就合同纠纷达成的《调解协议》合法有效并依据该协议制作调解书；\n2、申请人张三委托贵会承办本案的办案秘书指定本案仲裁员；\n3、本案仲裁费用由被申请人负担。',
  factsAndReasons: '申请人张三与被申请人李四于2024年5月1日签订了《房屋租赁合同》，约定被申请人将位于北京市朝阳区的房屋出租给申请人使用，租期为一年。申请人按照合同约定支付了租金，但被申请人未按照合同约定交付房屋，经多次协商无果，申请人向调解委员会申请调解，双方于2024年9月1日达成调解协议。',
  agreement: '调解协议编号：2024-TJ-001',
  evidence: {
    images: [],
    pdfs: [],
  },
})

// 折叠状态
const collapsedSections = ref({
  applicantInfo: false,
  respondentInfo: false,
  confirmationRequest: false,
  factsAndReasons: false,
  agreement: false,
  applicantEvidence: false,
  respondentEvidence: false,
  applicantSignature: false,
})

// 切换折叠状态
function toggleSection(section: string) {
  if (collapsedSections.value[section as keyof typeof collapsedSections.value] !== undefined) {
    collapsedSections.value[section as keyof typeof collapsedSections.value] = !collapsedSections.value[section as keyof typeof collapsedSections.value]
  }
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 确认提交案件
function confirmSubmit() {
  // 跳转到签名确认页面
  router.push({
    path: '/pages-sub/services/arbitration-signature',
    query: { caseId: caseDetail.value.id },
  })
}

// 撤销案件
function revokeCase() {
  // 显示警告提示框
  uni.showModal({
    title: '撤销案件',
    content: '确认要撤销此案件吗？一经撤销无法再次发起。',
    success: (res) => {
      if (res.confirm) {
        // 实际应用中这里应该调用API撤销案件
        console.log('撤销案件:', caseDetail.value.id)
        uni.showToast({
          title: '案件已撤销',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 返回案件列表页面
            setTimeout(() => {
              router.push('/pages-sub/services/arbitration-case-list')
            }, 2000)
          },
        })
      }
    },
  })
}

// 模拟从API获取案件详情
function fetchCaseDetail() {
  // 实际应用中这里应该调用API获取案件详情
  console.log('获取案件详情:', caseId.value)
  // 模拟数据已在初始化时设置
}

// 页面加载时获取案件详情
onMounted(() => {
  fetchCaseDetail()
})
</script>

<template>
  <view class="arbitration-case-detail-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        案件详情
      </view>
      <view class="header-right" />
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="case-id-container">
        <text class="case-id-icon">🔰</text>
        <text class="case-id">{{ caseDetail.id }}</text>
        <view
          class="case-status"
          :style="{ backgroundColor: caseDetail.status === '已申请' ? '#07c160' : '#ff9500' }"
        >
          {{ caseDetail.status }}
        </view>
      </view>
      <text class="case-description">{{ caseDetail.description }}</text>
      <text class="case-time">{{ caseDetail.createTime }}</text>
    </view>

    <!-- 折叠区域 -->
    <view class="collapsible-sections">
      <!-- 申请人信息 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('applicantInfo')">
          <text class="section-title">申请人信息</text>
          <text class="section-arrow" :class="collapsedSections.applicantInfo ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.applicantInfo" class="section-content">
          <view class="info-item">
            <text class="info-label">姓名：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.name }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">民族：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.ethnicity }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">出生年月：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.birthDate }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">身份证号：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.idNumber }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">住址：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.address }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">电话：</text>
            <text class="info-value">{{ caseDetail.applicantInfo.phone }}</text>
          </view>
        </view>
      </view>

      <!-- 被申请人信息 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('respondentInfo')">
          <text class="section-title">被申请人信息</text>
          <text class="section-arrow" :class="collapsedSections.respondentInfo ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.respondentInfo" class="section-content">
          <view class="info-item">
            <text class="info-label">姓名：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.name }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">民族：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.ethnicity }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">出生年月：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.birthDate }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">身份证号：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.idNumber }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">住址：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.address }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">电话：</text>
            <text class="info-value">{{ caseDetail.respondentInfo.phone }}</text>
          </view>
        </view>
      </view>

      <!-- 确认请求 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('confirmationRequest')">
          <text class="section-title">确认请求</text>
          <text class="section-arrow" :class="collapsedSections.confirmationRequest ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.confirmationRequest" class="section-content">
          <text class="text-content" style="white-space: pre-wrap;">{{ caseDetail.confirmationRequest }}</text>
        </view>
      </view>

      <!-- 事实与理由 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('factsAndReasons')">
          <text class="section-title">事实与理由</text>
          <text class="section-arrow" :class="collapsedSections.factsAndReasons ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.factsAndReasons" class="section-content">
          <text class="text-content" style="white-space: pre-wrap;">{{ caseDetail.factsAndReasons }}</text>
        </view>
      </view>

      <!-- 调解协议 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('agreement')">
          <text class="section-title">调解协议</text>
          <text class="section-arrow" :class="collapsedSections.agreement ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.agreement" class="section-content">
          <text class="text-content">{{ caseDetail.agreement }}</text>
        </view>
      </view>

      <!-- 申请人案件证据 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('applicantEvidence')">
          <text class="section-title">申请人案件证据</text>
          <text class="section-arrow" :class="collapsedSections.applicantEvidence ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.applicantEvidence" class="section-content">
          <text v-if="!caseDetail.evidence.images.length && !caseDetail.evidence.pdfs.length" class="no-data-text">暂无证据</text>
          <!-- 这里可以添加证据展示逻辑 -->
        </view>
      </view>

      <!-- 被申请人案件证据 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('respondentEvidence')">
          <text class="section-title">被申请人案件证据</text>
          <text class="section-arrow" :class="collapsedSections.respondentEvidence ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.respondentEvidence" class="section-content">
          <text class="no-data-text">暂无证据</text>
          <!-- 这里可以添加证据展示逻辑 -->
        </view>
      </view>

      <!-- 申请人签字 -->
      <view class="collapsible-section">
        <view class="section-header" @click="toggleSection('applicantSignature')">
          <text class="section-title">申请人签字</text>
          <text class="section-arrow" :class="collapsedSections.applicantSignature ? 'rotate' : ''">▼</text>
        </view>
        <view v-if="!collapsedSections.applicantSignature" class="section-content">
          <text class="no-data-text">未签字</text>
          <!-- 这里可以添加签字展示逻辑 -->
        </view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view v-if="!caseDetail.isCompleted" class="action-buttons">
      <button class="primary-button" @click="confirmSubmit">
        确认提交
      </button>
      <button class="secondary-button" @click="revokeCase">
        撤销案件
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.arbitration-case-detail-container {
  min-height: 100vh;
  background-color: #f8f8f8;
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

.case-basic-info {
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 12px;
}

.case-id-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.case-id-icon {
  font-size: 16px;
}

.case-id {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.case-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #ffffff;
}

.case-description {
  display: block;
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
}

.case-time {
  display: block;
  font-size: 12px;
  color: #999999;
}

.collapsible-sections {
  padding: 0 0 20px 0;
}

.collapsible-section {
  background-color: #ffffff;
  margin-bottom: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 14px;
  color: #333333;
}

.section-arrow {
  font-size: 12px;
  color: #999999;
  transition: transform 0.3s;
}

.section-arrow.rotate {
  transform: rotate(180deg);
}

.section-content {
  padding: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  width: 80px;
  font-size: 14px;
  color: #666666;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.text-content {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
}

.no-data-text {
  font-size: 14px;
  color: #999999;
  display: block;
  text-align: center;
  padding: 20px 0;
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 16px;
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
  color: #ff4d4f;
  border-radius: 22.5px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ff4d4f;
}

/* 适配不同平台 */
@media screen and (min-width: 768px) {
  .arbitration-case-detail-container {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
  .action-buttons {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
