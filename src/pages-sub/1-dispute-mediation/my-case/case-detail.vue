<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = route.query.id as string

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '案件详情',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

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

// 案件详情数据接口
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
    caseNumber: '2024-TJ001号',
    caseName: '买卖合同纠纷',
    createTime: '2024-09-25 10:24:54',
    status: 'applied',
    applicant: {
      name: '张三',
      phone: '138****5678',
      idNumber: '1****************X',
      address: '北京市海淀区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '李四',
      phone: '139****1234',
      idNumber: '2****************X',
      address: '北京市朝阳区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人返还货款共计人民币10000元整，并承担本案的调解费用。',
    factsAndReasons: '申请人与被申请人于2024年9月1日签订了《买卖合同》，约定申请人向被申请人供应一批货物，总价为人民币10000元整。申请人已按合同约定履行了交货义务，但被申请人至今未支付货款，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '买卖合同.pdf', type: 'pdf' },
      { id: '2', name: '交货凭证.jpg', type: 'jpg' },
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
    caseNumber: '2024-TJ002号',
    caseName: '借款合同纠纷',
    createTime: '2024-09-24 17:55:50',
    status: 'success',
    applicant: {
      name: '王五',
      phone: '137****9876',
      idNumber: '3****************X',
      address: '广州市天河区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '赵六',
      phone: '136****4567',
      idNumber: '4****************X',
      address: '深圳市南山区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人返还借款共计人民币5000元整。',
    factsAndReasons: '申请人与被申请人于2024年8月1日签订了《借款协议》，约定申请人向被申请人出借人民币5000元整，借款期限为1个月。借款期限届满后，被申请人未按约定返还借款，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '借款协议.pdf', type: 'pdf' },
      { id: '2', name: '转账记录.jpg', type: 'jpg' },
    ],
    respondentEvidence: [],
    defenseOpinion: '',
    paymentInfo: {
      status: '未支付',
      amount: '5000',
      dueDate: '2024-10-10',
    },
    agreementFiles: [
      { id: '1', name: '调解协议.pdf', type: 'pdf' },
    ],
  },
  3: {
    caseNumber: '2024-TJ003号',
    caseName: '租赁合同纠纷',
    createTime: '2024-09-23 17:16:27',
    status: 'processing',
    applicant: {
      name: '孙七',
      phone: '135****8765',
      idNumber: '5****************X',
      address: '上海市浦东新区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '周八',
      phone: '134****3456',
      idNumber: '6****************X',
      address: '杭州市西湖区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人退还押金共计人民币3000元整，并承担本案的调解费用。',
    factsAndReasons: '申请人与被申请人于2024年7月1日签订了《房屋租赁合同》，约定申请人租赁被申请人位于上海市浦东新区的房屋，租期为6个月，并支付押金人民币3000元整。合同期满后，申请人已按约定返还房屋，但被申请人至今未退还押金，经多次沟通无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '房屋租赁合同.pdf', type: 'pdf' },
      { id: '2', name: '押金收据.jpg', type: 'jpg' },
    ],
    respondentEvidence: [
      { id: '1', name: '房屋检查报告.pdf', type: 'pdf' },
    ],
    defenseOpinion: '申请人在租赁期间损坏了房屋内的家具和设备，需要扣除相应的维修费用后再退还押金。',
    paymentInfo: {
      status: '未支付',
      amount: '0',
      dueDate: '',
    },
    agreementFiles: [],
  },
  4: {
    caseNumber: '2024-TJ004号',
    caseName: '劳动合同纠纷',
    createTime: '2024-09-22 09:15:36',
    status: 'canceled',
    applicant: {
      name: '吴九',
      phone: '133****7654',
      idNumber: '7****************X',
      address: '成都市锦江区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '郑十',
      phone: '132****2345',
      idNumber: '8****************X',
      address: '重庆市渝中区XX街道XX小区XX号楼XX单元XX室',
    },
    mediationRequest: '请求被申请人支付拖欠的工资共计人民币8000元整。',
    factsAndReasons: '申请人于2024年5月1日至2024年8月31日期间在被申请人处工作，担任销售顾问一职。被申请人至今未支付申请人2024年8月份的工资共计人民币8000元整，经多次催讨无果，特申请调解。',
    applicantEvidence: [
      { id: '1', name: '劳动合同.pdf', type: 'pdf' },
      { id: '2', name: '考勤记录.jpg', type: 'jpg' },
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
  5: {
    caseNumber: '2024-TJ005号',
    caseName: '服务合同纠纷',
    createTime: '2024-09-21 14:30:22',
    status: 'applied',
    applicant: {
      name: '钱一',
      phone: '131****6543',
      idNumber: '9****************X',
      address: '武汉市江汉区XX街道XX小区XX号楼XX单元XX室',
    },
    respondent: {
      name: '孙二',
      phone: '130****1234',
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

// 获取当前案件详情
const caseDetail = ref<CaseDetail>(mockCaseDetails[caseId] || mockCaseDetails['1'])

// 切换展开状态
function toggleSection(section: string) {
  if (expandedSections.value[section] !== undefined) {
    expandedSections.value[section] = !expandedSections.value[section]
  }
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 查看案件进度
function handleViewProgress() {
  router.push({
    path: '/pages-sub/1-dispute-mediation/my-case/case-progress',
    query: { id: caseId },
  })
}

// 编辑案件信息 - 根据要求，只能在案件调解成功之前才能更改
function handleEditCase() {
  if (caseDetail.value.status === 'success') {
    uni.showToast({
      title: '案件已调解成功，无法编辑',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  router.push({
    path: '/pages-sub/1-dispute-mediation/my-case/case-edit',
    query: { id: caseId },
  })
}

// 撤销案件
function handleCancelCase() {
  // 如果案件已经是撤销或成功状态，不允许再次撤销
  if (caseDetail.value.status === 'canceled' || caseDetail.value.status === 'success') {
    uni.showToast({
      title: caseDetail.value.status === 'canceled' ? '案件已撤销，无法再次撤销' : '案件已调解成功，无法撤销',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  // 显示确认对话框
  uni.showModal({
    title: '撤销案件',
    content: '确定要撤销此案件吗？撤销后将无法恢复，且不可再次申请仲裁，并且只返回一半的调解费用。',
    success: (res) => {
      if (res.confirm) {
        // 实际应用中这里应该调用API撤销案件
        console.log('撤销案件:', caseId)
        // 模拟撤销成功
        uni.showToast({
          title: '案件已撤销',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 返回案件列表页面
            setTimeout(() => {
              router.push('/pages-sub/1-dispute-mediation/my-case/index')
            }, 2000)
          },
        })
      }
    },
  })
}

// 申请仲裁 - 只能在案件未撤销且未成功的情况下申请
function handleApplyArbitration() {
  if (caseDetail.value.status === 'canceled') {
    uni.showToast({
      title: '案件已撤销，不可再次申请仲裁',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  if (caseDetail.value.status === 'success') {
    uni.showToast({
      title: '案件已调解成功，无需申请仲裁',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  // 第一步：弹出选择申请确认时间的弹窗
  showTimeSelectionModal()
}

// 选择申请确认时间的弹窗
function showTimeSelectionModal() {
  // 创建时间选项 - 未来7天的日期
  const timeOptions = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    timeOptions.push(`${year}年 ${month}月 ${day}日`)
  }

  // 默认选中明天
  let selectedIndex = 1
  if (today.getHours() >= 18) {
    // 如果当前时间晚于18点，默认选中后天
    selectedIndex = 2
  }

  // 使用底部弹窗选择时间
  uni.showActionSheet({
    itemList: timeOptions,
    itemColor: '#000000',
    success: (res) => {
      const selectedTime = timeOptions[res.tapIndex]
      // 第二步：弹出输入标的金额的弹窗
      showAmountInputModal(selectedTime)
    },
    fail: (error) => {
      console.log('选择时间失败:', error)
    },
  })
}

// 输入标的金额的弹窗
function showAmountInputModal(selectedTime: string) {
  // 创建一个临时页面来模拟输入弹窗
  const page = {
    data: {
      amount: '',
    },
    onLoad() {
      // 创建输入弹窗
      uni.showModal({
        title: '输入标的金额',
        content: '',
        editable: true,
        placeholderText: '例如：100',
        success: (res) => {
          if (res.confirm) {
            const amount = res.content.trim()
            // 验证金额格式
            if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
              uni.showToast({
                title: '请输入有效的金额',
                icon: 'none',
                duration: 2000,
                success: () => {
                  // 重新显示金额输入弹窗
                  setTimeout(() => {
                    showAmountInputModal(selectedTime)
                  }, 2000)
                },
              })
              return
            }

            // 提交仲裁申请
            submitArbitrationRequest(selectedTime, amount)
          }
        },
      })
    },
  }

  // 触发onLoad来显示弹窗
  page.onLoad()
}

// 提交仲裁申请
function submitArbitrationRequest(selectedTime: string, amount: string) {
  // 显示最终确认弹窗
  uni.showModal({
    title: '申请仲裁确认',
    content: `您已选择申请确认时间：${selectedTime}\n标的金额：${amount}元\n\n确定要提交仲裁申请吗？`,
    success: (res) => {
      if (res.confirm) {
        // 实际应用中这里应该调用API申请仲裁
        console.log('申请仲裁:', caseId, '时间:', selectedTime, '金额:', amount)
        uni.showToast({
          title: '仲裁申请已提交',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 可以在这里进行页面跳转或其他操作
          },
        })
      }
    },
  })
}

// 获取状态文本
function getStatusText(status: string) {
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

// 获取状态样式
function getStatusClass(status: string) {
  switch (status) {
    case 'applied':
      return 'status-applied'
    case 'processing':
      return 'status-processing'
    case 'success':
      return 'status-success'
    case 'canceled':
      return 'status-canceled'
    default:
      return ''
  }
}

// 页面加载时执行
onMounted(() => {
  console.log('加载案件详情，ID:', caseId)
})
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
      <view class="header-right" />
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="case-number-section">
        <text class="case-number">{{ caseDetail.caseNumber }}</text>
        <text class="case-status" :class="getStatusClass(caseDetail.status)">{{ getStatusText(caseDetail.status) }}</text>
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
          <text class="section-icon" :class="{ expanded: expandedSections.applicant }">
            {{ expandedSections.applicant ? '▼' : '▶' }}
          </text>
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
          <text class="section-icon" :class="{ expanded: expandedSections.respondent }">
            {{ expandedSections.respondent ? '▼' : '▶' }}
          </text>
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
          <text class="section-icon" :class="{ expanded: expandedSections.request }">
            {{ expandedSections.request ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.request" class="section-content">
          <text class="content-text">{{ caseDetail.mediationRequest }}</text>
        </view>
      </view>

      <!-- 事实与理由 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('facts')">
          <text class="section-title">事实与理由</text>
          <text class="section-icon" :class="{ expanded: expandedSections.facts }">
            {{ expandedSections.facts ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.facts" class="section-content">
          <text class="content-text">{{ caseDetail.factsAndReasons }}</text>
        </view>
      </view>

      <!-- 申请人案件证据 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('evidenceApplicant')">
          <text class="section-title">申请人案件证据</text>
          <text class="section-icon" :class="{ expanded: expandedSections.evidenceApplicant }">
            {{ expandedSections.evidenceApplicant ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.evidenceApplicant" class="section-content">
          <view v-if="caseDetail.applicantEvidence.length === 0" class="no-data">
            暂无证据
          </view>
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
          <text class="section-icon" :class="{ expanded: expandedSections.evidenceRespondent }">
            {{ expandedSections.evidenceRespondent ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.evidenceRespondent" class="section-content">
          <view v-if="caseDetail.respondentEvidence.length === 0" class="no-data">
            暂无证据
          </view>
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
          <text class="section-icon" :class="{ expanded: expandedSections.defense }">
            {{ expandedSections.defense ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.defense" class="section-content">
          <text v-if="!caseDetail.defenseOpinion" class="no-data">
            暂无答辩意见
          </text>
          <text class="content-text">{{ caseDetail.defenseOpinion }}</text>
        </view>
      </view>

      <!-- 付款信息 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('payment')">
          <text class="section-title">付款信息</text>
          <text class="section-icon" :class="{ expanded: expandedSections.payment }">
            {{ expandedSections.payment ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.payment" class="section-content">
          <view class="info-item">
            <text class="info-label">付款状态：</text>
            <text class="info-value">{{ caseDetail.paymentInfo.status }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">付款金额：</text>
            <text class="info-value">¥{{ caseDetail.paymentInfo.amount }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">付款期限：</text>
            <text class="info-value">{{ caseDetail.paymentInfo.dueDate || '暂无' }}</text>
          </view>
        </view>
      </view>

      <!-- 调解协议 -->
      <view class="section">
        <view class="section-header" @click="toggleSection('agreement')">
          <text class="section-title">调解协议</text>
          <text class="section-icon" :class="{ expanded: expandedSections.agreement }">
            {{ expandedSections.agreement ? '▼' : '▶' }}
          </text>
        </view>
        <view v-if="expandedSections.agreement" class="section-content">
          <view v-if="caseDetail.agreementFiles.length === 0" class="no-data">
            暂无调解协议
          </view>
          <view v-for="file in caseDetail.agreementFiles" :key="file.id" class="file-item">
            <view class="file-icon">
              <text v-if="file.type === 'pdf'">PDF</text>
              <text v-else>文件</text>
            </view>
            <text class="file-name">{{ file.name }}</text>
            <text class="file-action">查看</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-buttons">
      <button class="btn-secondary" @click="handleViewProgress">
        查看案件进度
      </button>
      <button class="btn-primary" @click="handleEditCase">
        编辑案件信息
      </button>
      <button
        class="btn-danger"
        :disabled="caseDetail.status === 'canceled' || caseDetail.status === 'success'"
        :class="{ 'btn-disabled': caseDetail.status === 'canceled' || caseDetail.status === 'success' }"
        @click="handleCancelCase"
      >
        撤销案件
      </button>
      <button
        v-if="caseDetail.status !== 'success'"
        class="btn-primary"
        :disabled="caseDetail.status === 'canceled'"
        :class="{ 'btn-disabled': caseDetail.status === 'canceled' }"
        @click="handleApplyArbitration"
      >
        申请仲裁
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-detail-container {
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
}

.case-number-section {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.case-number {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-right: 8px;
}

.case-status {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.status-applied {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-processing {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-success {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-canceled {
  background-color: #f5f5f5;
  color: #999999;
}

.case-name-section {
  margin-bottom: 8px;
}

.case-name {
  font-size: 16px;
  color: #333333;
}

.case-time {
  font-size: 12px;
  color: #999999;
}

.info-sections {
  margin-bottom: 12px;
}

.section {
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 15px;
  color: #333333;
  font-weight: 500;
}

.section-icon {
  font-size: 12px;
  color: #999999;
  transition: transform 0.3s;
}

.section-icon.expanded {
  transform: rotate(0deg);
}

.section-content {
  padding: 16px;
  background-color: #ffffff;
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
  width: 80px;
  font-size: 14px;
  color: #666666;
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.content-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
  white-space: pre-wrap;
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

.file-action {
  font-size: 14px;
  color: #1890ff;
}

.no-data {
  font-size: 14px;
  color: #999999;
  text-align: center;
  padding: 20px 0;
}

.action-buttons {
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 12px;
}

.btn-primary {
  background-color: #1890ff;
  color: #ffffff;
  border: none;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #666666;
  border: none;
}

.btn-danger {
  background-color: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.btn-primary:active {
  background-color: #40a9ff;
}

.btn-secondary:active {
  background-color: #e6e6e6;
}

.btn-danger:active {
  background-color: #ffccc7;
}

.btn-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
