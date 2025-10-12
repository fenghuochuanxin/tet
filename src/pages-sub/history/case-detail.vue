<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = route.query.id as string

// 展开状态管理
const expandedSections = ref<Record<string, boolean>>({
  applicant: true,
  respondent: false,
  request: false,
  facts: false,
  evidenceApplicant: false,
  evidenceRespondent: false,
  defense: false,
  payment: false,
  agreement: false,
})

// 模拟案件详情数据映射表
const mockCaseDetails: Record<string, any> = {
  1: {
    caseNumber: '2024-WT690号',
    caseName: 'kings撤销案件',
    createTime: '2024-09-25 10:24:54',
    status: 'canceled',
    applicant: {
      name: 'kings',
      phone: '138****5678',
      idNumber: '1****************X',
      address: '北京市海淀区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '张三',
      phone: '139****1234',
      idNumber: '2****************X',
      address: '北京市朝阳区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人返还借款共计人民币5000元整。',
    factsAndReasons: '申请人与被申请人于2024年9月1日签订了《借款协议》，约定申请人向被申请人出借人民币5000元整，借款期限为1个月。借款期限届满后，被申请人未按约定返还借款，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '借款协议.pdf', type: 'pdf' },
      { id: '2', name: '转账记录.jpg', type: 'jpg' },
    ],
    respondentEvidence: [],
    defenseOpinion: '',
    paymentInfo: {
      status: '未支付',
      amount: '0',
      dueDate: '',
    },
    agreementFiles: [],
  },
  2: {
    caseNumber: '2024-WT689号',
    caseName: '调解协议签署已完成',
    createTime: '2024-09-24 17:55:50',
    status: 'success',
    applicant: {
      name: '张三',
      phone: '138****1234',
      idNumber: '3****************X',
      address: '北京市朝阳区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '李四',
      phone: '139****5678',
      idNumber: '4****************X',
      address: '上海市浦东新区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人支付拖欠的货款共计人民币10000元整，并承担本案的调解费用。',
    factsAndReasons: '申请人与被申请人于2024年3月15日签订了《货物买卖合同》，约定申请人向被申请人供应一批电子产品，总价为人民币10000元整。申请人已按合同约定履行了交货义务，但被申请人至今未支付货款，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '货物买卖合同.pdf', type: 'pdf' },
      { id: '2', name: '交货凭证.jpg', type: 'jpg' },
      { id: '3', name: '催款记录.pdf', type: 'pdf' },
    ],
    respondentEvidence: [
      { id: '1', name: '质量异议函.pdf', type: 'pdf' },
    ],
    defenseOpinion: '申请人提供的货物存在质量问题，不符合合同约定的标准，因此暂未支付货款。',
    paymentInfo: {
      status: '未支付',
      amount: '1000',
      dueDate: '2024-10-10',
    },
    agreementFiles: [
      { id: '1', name: '调解协议.pdf', type: 'pdf' },
    ],
  },
  3: {
    caseNumber: '2024-WT688号',
    caseName: '调解员刘永庆待受理',
    createTime: '2024-09-23 17:16:27',
    status: 'applied',
    applicant: {
      name: '王五',
      phone: '137****9876',
      idNumber: '5****************X',
      address: '广州市天河区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '赵六',
      phone: '136****4567',
      idNumber: '6****************X',
      address: '深圳市南山区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人支付拖欠的工资共计人民币8000元整。',
    factsAndReasons: '申请人于2024年5月1日至2024年8月31日期间在被申请人处工作，担任销售顾问一职。被申请人至今未支付申请人2024年8月份的工资共计人民币8000元整，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '劳动合同.pdf', type: 'pdf' },
      { id: '2', name: '工资条.jpg', type: 'jpg' },
      { id: '3', name: '考勤记录.pdf', type: 'pdf' },
    ],
    respondentEvidence: [],
    defenseOpinion: '',
    paymentInfo: {
      status: '未支付',
      amount: '500',
      dueDate: '2024-10-05',
    },
    agreementFiles: [],
  },
  4: {
    caseNumber: '2024-WT687号',
    caseName: '当前案件已仲裁确认，案件号为2024-WQ258号',
    createTime: '2024-09-23 14:39:28',
    status: 'success',
    applicant: {
      name: '赵六',
      phone: '135****8765',
      idNumber: '7****************X',
      address: '成都市锦江区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '孙七',
      phone: '134****3456',
      idNumber: '8****************X',
      address: '重庆市渝中区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人返还房屋定金共计人民币15000元整。',
    factsAndReasons: '申请人与被申请人于2024年7月15日签订了《房屋买卖合同》，约定申请人购买被申请人位于成都市锦江区的一套房屋，并支付定金人民币15000元整。后因被申请人原因，房屋无法按约定过户，申请人要求返还定金，被申请人拒绝，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '房屋买卖合同.pdf', type: 'pdf' },
      { id: '2', name: '定金收据.jpg', type: 'jpg' },
    ],
    respondentEvidence: [],
    defenseOpinion: '',
    paymentInfo: {
      status: '已支付',
      amount: '1500',
      dueDate: '2024-09-25',
    },
    agreementFiles: [
      { id: '1', name: '调解协议.pdf', type: 'pdf' },
      { id: '2', name: '仲裁确认书.pdf', type: 'pdf' },
    ],
  },
  5: {
    caseNumber: '2024-WT675号',
    caseName: '合同解除纠纷',
    createTime: '2024-09-22 09:15:36',
    status: 'canceled',
    applicant: {
      name: '孙七',
      phone: '133****7654',
      idNumber: '9****************X',
      address: '武汉市江汉区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '周八',
      phone: '132****2345',
      idNumber: '10****************X',
      address: '长沙市芙蓉区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求解除与被申请人签订的《服务合同》，并要求被申请人返还已支付的服务费共计人民币6000元整。',
    factsAndReasons: '申请人与被申请人于2024年6月1日签订了《服务合同》，约定被申请人为申请人提供法律咨询服务，申请人支付服务费人民币6000元整。被申请人未按合同约定提供服务，经多次沟通无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '服务合同.pdf', type: 'pdf' },
      { id: '2', name: '付款凭证.jpg', type: 'jpg' },
    ],
    respondentEvidence: [],
    defenseOpinion: '',
    paymentInfo: {
      status: '未支付',
      amount: '0',
      dueDate: '',
    },
    agreementFiles: [],
  },
}

// 根据案件ID获取案件详情数据
const caseDetail = ref(mockCaseDetails[caseId] || {
  caseNumber: '未知案件',
  caseName: '未知状态',
  createTime: '',
  status: 'unknown',
  applicant: {
    name: '',
    phone: '',
    idNumber: '',
    address: '',
  },
  respondent: {
    name: '',
    phone: '',
    idNumber: '',
    address: '',
  },
  mediationRequest: '',
  factsAndReasons: '',
  applicantEvidence: [],
  respondentEvidence: [],
  defenseOpinion: '',
  paymentInfo: {
    status: '',
    amount: '',
    dueDate: '',
  },
  agreementFiles: [],
})

// 处理部分展开/折叠
function toggleSection(section: string) {
  expandedSections.value[section] = !expandedSections.value[section]
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 查看案件进度
function viewCaseProgress() {
  router.push({
    path: '/pages-sub/history/case-progress',
    query: { id: caseId },
  })
}

// 申请确认
function applyConfirm() {
  // 实际项目中可以调用API提交确认
  console.log('申请确认')
  uni.showToast({
    title: '确认成功',
    icon: 'success',
  })
}

// 选择确认时间
function selectConfirmTime() {
  // 实际项目中可以调用日期时间选择器
  console.log('选择确认时间')
}

// 撤销案件
function handleCancelCase() {
  // 检查案件状态，已调解成功或完成的案件不允许撤销
  const caseStatus = caseDetail.value?.status
  // 根据模拟数据，判断案件是否已成功或完成
  if (caseStatus === 'completed' || caseStatus === 'success' || caseStatus === '已完成' || caseStatus === '已调解成功') {
    uni.showToast({
      title: '该案件已完成调解，不允许撤销',
      icon: 'none',
    })
    return
  }

  uni.showModal({
    title: '撤销案件',
    content: '确定要撤销该案件吗？撤销后将无法恢复。',
    success: (res) => {
      if (res.confirm) {
        try {
          // 这里应该是实际的API调用，现在用模拟数据代替
          console.log('撤销案件:', caseDetail.value)

          // 更新案件状态为已撤销
          if (caseDetail.value) {
            caseDetail.value.status = '已撤销'
          }

          // 显示撤销成功提示
          uni.showToast({
            title: '案件已撤销',
            icon: 'success',
            duration: 2000,
            complete: () => {
              // 成功后返回上一页
              setTimeout(() => {
                router.back()
              }, 2000)
            },
          })
        }
        catch (error) {
          console.error('撤销案件失败:', error)
          uni.showToast({
            title: '撤销失败，请稍后重试',
            icon: 'none',
          })
        }
      }
    },
  })
}
</script>

<template>
  <view class="case-detail-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        案件详情
      </view>
      <view class="header-right">
        <button class="progress-btn" size="mini" @click="viewCaseProgress">
          案件进度
        </button>
      </view>
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="case-number-section">
        <text class="case-number">{{ caseDetail.caseNumber }}</text>
        <text class="case-status">调解成功</text>
      </view>
      <view class="case-name-section">
        <text class="case-name">{{ caseDetail.caseName }}</text>
      </view>
      <view class="case-time-section">
        <text class="case-time">{{ caseDetail.createTime }}</text>
      </view>
    </view>

    <!-- 信息部分 -->
    <view class="info-sections">
      <!-- 申请人信息 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('applicant')">
          <text class="section-title">申请人信息</text>
          <text class="section-icon" :class="{ expanded: expandedSections.applicant }">{{ expandedSections.applicant ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.applicant" class="section-content">
          <view class="info-item">
            <text class="info-label">姓名：</text>
            <text class="info-value">{{ caseDetail.applicant.name }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">电话：</text>
            <text class="info-value">{{ caseDetail.applicant.phone }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">身份证号：</text>
            <text class="info-value">{{ caseDetail.applicant.idNumber }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">地址：</text>
            <text class="info-value">{{ caseDetail.applicant.address }}</text>
          </view>
        </view>
      </view>

      <!-- 被申请人信息 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('respondent')">
          <text class="section-title">被申请人信息</text>
          <text class="section-icon" :class="{ expanded: expandedSections.respondent }">{{ expandedSections.respondent ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.respondent" class="section-content">
          <view class="info-item">
            <text class="info-label">姓名：</text>
            <text class="info-value">{{ caseDetail.respondent.name }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">电话：</text>
            <text class="info-value">{{ caseDetail.respondent.phone }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">身份证号：</text>
            <text class="info-value">{{ caseDetail.respondent.idNumber }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">地址：</text>
            <text class="info-value">{{ caseDetail.respondent.address }}</text>
          </view>
        </view>
      </view>

      <!-- 调解请求 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('request')">
          <text class="section-title">调解请求</text>
          <text class="section-icon" :class="{ expanded: expandedSections.request }">{{ expandedSections.request ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.request" class="section-content">
          <text class="content-text">{{ caseDetail.mediationRequest }}</text>
        </view>
      </view>

      <!-- 事实与理由 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('facts')">
          <text class="section-title">事实与理由</text>
          <text class="section-icon" :class="{ expanded: expandedSections.facts }">{{ expandedSections.facts ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.facts" class="section-content">
          <text class="content-text">{{ caseDetail.factsAndReasons }}</text>
        </view>
      </view>

      <!-- 申请人案件证据 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('evidenceApplicant')">
          <text class="section-title">申请人案件证据</text>
          <text class="section-icon" :class="{ expanded: expandedSections.evidenceApplicant }">{{ expandedSections.evidenceApplicant ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.evidenceApplicant" class="section-content">
          <view v-for="file in caseDetail.applicantEvidence" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">PDF</text>
              <text v-else-if="file.type === 'jpg'">图片</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <text class="file-action">查看</text>
          </view>
        </view>
      </view>

      <!-- 被申请人案件证据 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('evidenceRespondent')">
          <text class="section-title">被申请人案件证据</text>
          <text class="section-icon" :class="{ expanded: expandedSections.evidenceRespondent }">{{ expandedSections.evidenceRespondent ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.evidenceRespondent" class="section-content">
          <view v-for="file in caseDetail.respondentEvidence" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">PDF</text>
              <text v-else-if="file.type === 'jpg'">图片</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <text class="file-action">查看</text>
          </view>
        </view>
      </view>

      <!-- 被申请人答辩意见 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('defense')">
          <text class="section-title">被申请人答辩意见</text>
          <text class="section-icon" :class="{ expanded: expandedSections.defense }">{{ expandedSections.defense ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.defense" class="section-content">
          <text class="content-text">{{ caseDetail.defenseOpinion }}</text>
        </view>
      </view>

      <!-- 缴费 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('payment')">
          <text class="section-title">缴费</text>
          <text class="section-icon" :class="{ expanded: expandedSections.payment }">{{ expandedSections.payment ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.payment" class="section-content">
          <view class="info-item">
            <text class="info-label">状态：</text>
            <text class="info-value">{{ caseDetail.paymentInfo.status }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">金额：</text>
            <text class="info-value">￥{{ caseDetail.paymentInfo.amount }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">截止日期：</text>
            <text class="info-value">{{ caseDetail.paymentInfo.dueDate }}</text>
          </view>
        </view>
      </view>

      <!-- 调解协议 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('agreement')">
          <text class="section-title">调解协议</text>
          <text class="section-icon" :class="{ expanded: expandedSections.agreement }">{{ expandedSections.agreement ? '▼' : '▶' }}</text>
        </view>
        <view v-if="expandedSections.agreement" class="section-content">
          <view v-for="file in caseDetail.agreementFiles" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">PDF</text>
              <text v-else-if="file.type === 'jpg'">图片</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <text class="file-action">查看</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 确认按钮 -->
    <view class="confirm-section">
      <!-- 条件渲染申请确认按钮，仅在案件未完成、未撤销时显示 -->
      <button v-if="caseDetail?.status !== 'completed' && caseDetail?.status !== 'success' && caseDetail?.status !== '已完成' && caseDetail?.status !== '已调解成功' && caseDetail?.status !== '已撤销'" class="confirm-btn" @click="applyConfirm">
        申请确认
      </button>
      <!-- 条件渲染撤销案件按钮，仅在案件未完成、未撤销时显示 -->
      <button v-if="caseDetail?.status !== 'completed' && caseDetail?.status !== 'success' && caseDetail?.status !== '已完成' && caseDetail?.status !== '已调解成功' && caseDetail?.status !== '已撤销'" class="cancel-btn" @click="handleCancelCase">
        撤销案件
      </button>
      <!-- 条件渲染时间选择器，仅在案件未完成、未撤销时显示 -->
      <view v-if="caseDetail?.status !== 'completed' && caseDetail?.status !== 'success' && caseDetail?.status !== '已完成' && caseDetail?.status !== '已调解成功' && caseDetail?.status !== '已撤销'" class="time-selector" @click="selectConfirmTime">
        <text class="time-selector-text">请选择申请确认的时间</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-detail-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

/* 顶部导航栏 */
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
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.back-icon {
  font-size: 18px;
  color: #333333;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.progress-btn {
  background-color: #07c160;
  color: #ffffff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

/* 案件基本信息 */
.case-basic-info {
  padding: 20px 16px;
  background-color: #ffffff;
  margin-bottom: 12px;
}

.case-number-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.case-number {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-right: 12px;
}

.case-status {
  font-size: 12px;
  color: #ffffff;
  background-color: #07c160;
  padding: 2px 8px;
  border-radius: 12px;
}

.case-name-section {
  margin-bottom: 8px;
}

.case-name {
  font-size: 16px;
  color: #333333;
}

.case-time-section {
}

.case-time {
  font-size: 14px;
  color: #999999;
}

/* 信息部分 */
.info-sections {
  background-color: #ffffff;
}

.section {
  border-bottom: 1px solid #f0f0f0;
}

.section:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
}

.section-title {
  font-size: 15px;
  color: #333333;
}

.section-icon {
  font-size: 12px;
  color: #999999;
  transition: transform 0.3s ease;
}

.section-icon.expanded {
  transform: rotate(0deg);
}

.section-content {
  padding: 0 16px 16px 16px;
  background-color: #fafafa;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 14px;
  color: #999999;
  min-width: 80px;
}

.info-value {
  font-size: 14px;
  color: #666666;
  flex: 1;
}

.content-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

/* 文件列表 */
.file-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.file-item:last-child {
  border-bottom: none;
}

.file-icon {
  width: 40px;
  height: 40px;
  background-color: #07c160;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 12px;
  font-size: 12px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.file-action {
  font-size: 14px;
  color: #07c160;
}

/* 确认按钮 */
.confirm-section {
  padding: 20px 16px;
  background-color: #ffffff;
  margin-top: 12px;
}

.confirm-btn {
  width: 100%;
  height: 48px;
  background-color: #07c160;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.cancel-btn {
  width: 100%;
  height: 48px;
  background-color: #f5f5f5;
  color: #666666;
  border: 1px solid #dddddd;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.time-selector {
  text-align: center;
}

.time-selector-text {
  font-size: 14px;
  color: #999999;
}
</style>
