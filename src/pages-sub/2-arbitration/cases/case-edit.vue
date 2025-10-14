<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = route.query.id as string

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '编辑案件信息',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 案件数据接口
interface CaseDetail {
  caseNumber: string
  caseName: string
  createTime: string
  status: 'applied' | 'processing' | 'success' | 'canceled'
  applicant: {
    name: string
    phone: string
    idNumber: string
    address: string
  }
  respondent: {
    name: string
    phone: string
    idNumber: string
    address: string
  }
  mediationRequest: string
  factsAndReasons: string
  applicantEvidence: Array<{ id: string, name: string, type: string }>
  respondentEvidence: Array<{ id: string, name: string, type: string }>
  defenseOpinion: string
  paymentInfo: {
    status: string
    amount: string
    dueDate: string
  }
  agreementFiles: Array<{ id: string, name: string, type: string }>
}

// 模拟案件详情数据映射表
const mockCaseDetails: Record<string, CaseDetail> = {
  1: {
    caseNumber: '2024-WT690号',
    caseName: 'kings撤销案件',
    createTime: '2024-09-25 10:24:54',
    status: 'applied',
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
    status: 'processing',
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
}

// 获取当前案件详情
const originalCaseDetail = mockCaseDetails[caseId] || mockCaseDetails['1']

// 创建表单数据副本，避免直接修改原始数据
const formData = ref<CaseDetail>({
  ...JSON.parse(JSON.stringify(originalCaseDetail)),
})

// 表单验证状态
const errors = ref<Record<string, string>>({})

// 返回上一页
function navigateBack() {
  // 检查是否有未保存的更改
  if (hasUnsavedChanges()) {
    uni.showModal({
      title: '提示',
      content: '有未保存的更改，确定要离开吗？',
      success: (res) => {
        if (res.confirm) {
          router.back()
        }
      },
    })
  }
  else {
    router.back()
  }
}

// 检查是否有未保存的更改
function hasUnsavedChanges(): boolean {
  // 简化版：仅比较关键字段
  return JSON.stringify(formData.value) !== JSON.stringify(originalCaseDetail)
}

// 验证表单
function validateForm(): boolean {
  // 清空之前的错误
  errors.value = {}

  // 验证申请人信息
  if (!formData.value.applicant.name.trim()) {
    errors.value.applicantName = '申请人姓名不能为空'
  }
  if (!formData.value.applicant.phone.trim()) {
    errors.value.applicantPhone = '申请人电话不能为空'
  }

  // 验证被申请人信息
  if (!formData.value.respondent.name.trim()) {
    errors.value.respondentName = '被申请人姓名不能为空'
  }
  if (!formData.value.respondent.phone.trim()) {
    errors.value.respondentPhone = '被申请人电话不能为空'
  }

  // 验证调解请求
  if (!formData.value.mediationRequest.trim()) {
    errors.value.mediationRequest = '调解请求不能为空'
  }

  // 验证事实与理由
  if (!formData.value.factsAndReasons.trim()) {
    errors.value.factsAndReasons = '事实与理由不能为空'
  }

  // 返回是否有错误
  return Object.keys(errors.value).length === 0
}

// 保存案件信息
function saveCase() {
  // 验证表单
  if (!validateForm()) {
    return
  }

  // 实际应用中这里应该调用API保存案件信息
  console.log('保存案件信息:', formData.value)

  // 模拟保存成功
  uni.showToast({
    title: '保存成功',
    icon: 'success',
    duration: 2000,
    success: () => {
      // 返回案件详情页面
      setTimeout(() => {
        router.push({
          path: '/pages-sub/2-arbitration/cases/case-detail',
          query: { id: caseId },
        })
      }, 2000)
    },
  })
}

// 上传证据文件
function uploadEvidence(type: 'applicant' | 'respondent') {
  // 实际应用中这里应该调用文件上传API
  console.log('上传证据文件，类型:', type)

  // 模拟上传成功
  uni.showToast({
    title: '文件上传成功',
    icon: 'success',
    duration: 2000,
  })
}

// 删除证据文件
function deleteEvidence(type: 'applicant' | 'respondent', fileId: string) {
  // 显示确认对话框
  uni.showModal({
    title: '删除文件',
    content: '确定要删除此文件吗？',
    success: (res) => {
      if (res.confirm) {
        // 实际应用中这里应该调用API删除文件
        if (type === 'applicant') {
          formData.value.applicantEvidence = formData.value.applicantEvidence.filter(file => file.id !== fileId)
        }
        else {
          formData.value.respondentEvidence = formData.value.respondentEvidence.filter(file => file.id !== fileId)
        }

        // 显示删除成功提示
        uni.showToast({
          title: '文件已删除',
          icon: 'success',
          duration: 2000,
        })
      }
    },
  })
}

// 获取状态文本
function getStatusText(status: string): string {
  switch (status) {
    case 'applied':
      return '待受理'
    case 'processing':
      return '调解中'
    case 'success':
      return '调解成功'
    case 'canceled':
      return '已撤销'
    default:
      return status
  }
}

// 页面加载时执行
onMounted(() => {
  console.log('加载编辑案件页面，ID:', caseId)

  // 检查案件状态是否为调解成功或已撤销
  if (originalCaseDetail.status === 'success' || originalCaseDetail.status === 'canceled') {
    uni.showToast({
      title: originalCaseDetail.status === 'success' ? '案件已调解成功，无法编辑' : '案件已撤销，无法编辑',
      icon: 'none',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          router.back()
        }, 2000)
      },
    })
  }
})
</script>

<template>
  <view class="case-edit-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        编辑案件信息
      </view>
      <view class="header-right" />
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="info-item">
        <text class="info-label">案件编号：</text>
        <text class="info-value">{{ formData.caseNumber }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">创建时间：</text>
        <text class="info-value">{{ formData.createTime }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">当前状态：</text>
        <text class="info-value">{{ getStatusText(formData.status) }}</text>
      </view>
    </view>

    <!-- 表单内容 -->
    <view class="form-content">
      <!-- 案件名称 -->
      <view class="form-item">
        <text class="form-label">案件名称</text>
        <input
          v-model="formData.caseName"
          class="form-input"
          placeholder="请输入案件名称"
          :disabled="formData.status === 'success' || formData.status === 'canceled'"
        >
      </view>

      <!-- 申请人信息 -->
      <view class="form-section">
        <text class="section-title">申请人信息</text>

        <view class="form-item">
          <text class="form-label">姓名</text>
          <input
            v-model="formData.applicant.name"
            class="form-input"
            placeholder="请输入申请人姓名"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
          <text v-if="errors.applicantName" class="error-text">{{ errors.applicantName }}</text>
        </view>

        <view class="form-item">
          <text class="form-label">电话</text>
          <input
            v-model="formData.applicant.phone"
            class="form-input"
            placeholder="请输入申请人电话"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
          <text v-if="errors.applicantPhone" class="error-text">{{ errors.applicantPhone }}</text>
        </view>

        <view class="form-item">
          <text class="form-label">身份证号</text>
          <input
            v-model="formData.applicant.idNumber"
            class="form-input"
            placeholder="请输入申请人身份证号"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
        </view>

        <view class="form-item">
          <text class="form-label">地址</text>
          <input
            v-model="formData.applicant.address"
            class="form-input"
            placeholder="请输入申请人地址"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
        </view>
      </view>

      <!-- 被申请人信息 -->
      <view class="form-section">
        <text class="section-title">被申请人信息</text>

        <view class="form-item">
          <text class="form-label">姓名</text>
          <input
            v-model="formData.respondent.name"
            class="form-input"
            placeholder="请输入被申请人姓名"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
          <text v-if="errors.respondentName" class="error-text">{{ errors.respondentName }}</text>
        </view>

        <view class="form-item">
          <text class="form-label">电话</text>
          <input
            v-model="formData.respondent.phone"
            class="form-input"
            placeholder="请输入被申请人电话"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
          <text v-if="errors.respondentPhone" class="error-text">{{ errors.respondentPhone }}</text>
        </view>

        <view class="form-item">
          <text class="form-label">身份证号</text>
          <input
            v-model="formData.respondent.idNumber"
            class="form-input"
            placeholder="请输入被申请人身份证号"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
        </view>

        <view class="form-item">
          <text class="form-label">地址</text>
          <input
            v-model="formData.respondent.address"
            class="form-input"
            placeholder="请输入被申请人地址"
            :disabled="formData.status === 'success' || formData.status === 'canceled'"
          >
        </view>
      </view>

      <!-- 调解请求 -->
      <view class="form-item">
        <text class="form-label">调解请求</text>
        <textarea
          v-model="formData.mediationRequest"
          class="form-textarea"
          placeholder="请输入调解请求"
          rows="4"
          :disabled="formData.status === 'success' || formData.status === 'canceled'"
        />
        <text v-if="errors.mediationRequest" class="error-text">{{ errors.mediationRequest }}</text>
      </view>

      <!-- 事实与理由 -->
      <view class="form-item">
        <text class="form-label">事实与理由</text>
        <textarea
          v-model="formData.factsAndReasons"
          class="form-textarea"
          placeholder="请输入事实与理由"
          rows="6"
          :disabled="formData.status === 'success' || formData.status === 'canceled'"
        />
        <text v-if="errors.factsAndReasons" class="error-text">{{ errors.factsAndReasons }}</text>
      </view>

      <!-- 申请人案件证据 -->
      <view class="form-section">
        <text class="section-title">申请人案件证据</text>

        <view class="evidence-list">
          <view v-for="file in formData.applicantEvidence" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">{{ file.type.toUpperCase() }}</text>
              <text v-else-if="file.type === 'jpg'">图片</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <view class="file-actions">
              <text class="file-action-view">查看</text>
              <text class="file-action-delete" @click="deleteEvidence('applicant', file.id)">删除</text>
            </view>
          </view>
        </view>

        <view class="upload-btn" :class="{ disabled: formData.status === 'success' || formData.status === 'canceled' }" @click="uploadEvidence('applicant')">
          <text>+ 上传文件</text>
        </view>
      </view>

      <!-- 被申请人案件证据 -->
      <view class="form-section">
        <text class="section-title">被申请人案件证据</text>

        <view class="evidence-list">
          <view v-for="file in formData.respondentEvidence" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">{{ file.type.toUpperCase() }}</text>
              <text v-else-if="file.type === 'jpg'">图片</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <view class="file-actions">
              <text class="file-action-view">查看</text>
              <text class="file-action-delete" @click="deleteEvidence('respondent', file.id)">删除</text>
            </view>
          </view>
        </view>

        <view class="upload-btn" :class="{ disabled: formData.status === 'success' || formData.status === 'canceled' }" @click="uploadEvidence('respondent')">
          <text>+ 上传文件</text>
        </view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-buttons">
      <button class="btn-primary" :disabled="formData.status === 'success' || formData.status === 'canceled'" @click="saveCase">
        保存更改
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-edit-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left,
.header-right {
  width: 44px;
  height: 44px;
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

.case-basic-info {
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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

.form-content {
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 16px;
}

.form-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 12px;
  display: block;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 44px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  color: #333333;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #1890ff;
  outline: none;
}

.form-input:disabled {
  background-color: #f5f5f5;
  color: #999999;
}

.form-textarea {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  color: #333333;
  box-sizing: border-box;
  resize: none;
}

.form-textarea:focus {
  border-color: #1890ff;
  outline: none;
}

.form-textarea:disabled {
  background-color: #f5f5f5;
  color: #999999;
}

.error-text {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.evidence-list {
  margin-bottom: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 8px;
}

.file-item:last-child {
  margin-bottom: 0;
}

.file-icon {
  width: 40px;
  height: 40px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 12px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.file-actions {
  display: flex;
  align-items: center;
}

.file-action-view {
  font-size: 14px;
  color: #1890ff;
  margin-right: 16px;
}

.file-action-delete {
  font-size: 14px;
  color: #ff4d4f;
}

.upload-btn {
  width: 100%;
  height: 40px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999999;
}

.upload-btn:active {
  background-color: #f5f5f5;
}

.upload-btn.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.action-buttons {
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  position: sticky;
  bottom: 0;
}

.btn-primary {
  width: 100%;
  height: 44px;
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
}

.btn-primary:active {
  background-color: #40a9ff;
}

.btn-primary:disabled {
  background-color: #d9d9d9;
  color: #ffffff;
}
</style>
