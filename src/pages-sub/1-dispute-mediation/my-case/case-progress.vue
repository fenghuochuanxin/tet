<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = route.query.id as string

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '案件进度',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 进度步骤接口
interface ProgressStep {
  id: string
  title: string
  content: string
  time: string
  status: 'completed' | 'current' | 'pending'
}

// 案件信息接口
interface CaseInfo {
  caseNumber: string
  caseName: string
  status: string
  applicant: string
  respondent: string
  mediatorName?: string
}

// 模拟案件数据映射表
const mockCaseData: Record<string, { info: CaseInfo, progress: ProgressStep[] }> = {
  1: {
    info: {
      caseNumber: '2024-TJ001号',
      caseName: '买卖合同纠纷',
      status: '待受理',
      applicant: '张三',
      respondent: '李四',
    },
    progress: [
      {
        id: '1',
        title: '申请提交',
        content: '申请人提交了调解申请',
        time: '2024-09-25 10:24:54',
        status: 'completed',
      },
      {
        id: '2',
        title: '案件受理',
        content: '调解机构将对案件进行初步审核',
        time: '',
        status: 'pending',
      },
      {
        id: '3',
        title: '调解员分配',
        content: '将为案件分配合适的调解员',
        time: '',
        status: 'pending',
      },
      {
        id: '4',
        title: '调解进行',
        content: '调解员将组织双方进行调解',
        time: '',
        status: 'pending',
      },
      {
        id: '5',
        title: '调解完成',
        content: '双方达成调解协议或调解失败',
        time: '',
        status: 'pending',
      },
    ],
  },
  2: {
    info: {
      caseNumber: '2024-TJ002号',
      caseName: '借款合同纠纷',
      status: '调解成功',
      applicant: '王五',
      respondent: '赵六',
      mediatorName: '调解员王律师',
    },
    progress: [
      {
        id: '1',
        title: '申请提交',
        content: '申请人提交了调解申请',
        time: '2024-09-24 17:55:50',
        status: 'completed',
      },
      {
        id: '2',
        title: '案件受理',
        content: '调解机构已受理案件',
        time: '2024-09-25 09:15:23',
        status: 'completed',
      },
      {
        id: '3',
        title: '调解员分配',
        content: '已为案件分配调解员王律师',
        time: '2024-09-26 14:30:12',
        status: 'completed',
      },
      {
        id: '4',
        title: '调解进行',
        content: '调解员组织双方进行了两次调解会议',
        time: '2024-09-28 16:45:33',
        status: 'completed',
      },
      {
        id: '5',
        title: '调解完成',
        content: '双方达成调解协议，约定被申请人于2024年10月10日前返还借款共计人民币5000元整',
        time: '2024-10-01 11:20:45',
        status: 'completed',
      },
    ],
  },
  3: {
    info: {
      caseNumber: '2024-TJ003号',
      caseName: '租赁合同纠纷',
      status: '调解中',
      applicant: '孙七',
      respondent: '周八',
      mediatorName: '调解员李律师',
    },
    progress: [
      {
        id: '1',
        title: '申请提交',
        content: '申请人提交了调解申请',
        time: '2024-09-23 17:16:27',
        status: 'completed',
      },
      {
        id: '2',
        title: '案件受理',
        content: '调解机构已受理案件',
        time: '2024-09-24 10:05:36',
        status: 'completed',
      },
      {
        id: '3',
        title: '调解员分配',
        content: '已为案件分配调解员李律师',
        time: '2024-09-25 15:20:41',
        status: 'completed',
      },
      {
        id: '4',
        title: '调解进行',
        content: '第一次调解会议已完成，正在准备第二次调解会议',
        time: '2024-09-29 14:00:00',
        status: 'current',
      },
      {
        id: '5',
        title: '调解完成',
        content: '双方达成调解协议或调解失败',
        time: '',
        status: 'pending',
      },
    ],
  },
  4: {
    info: {
      caseNumber: '2024-TJ004号',
      caseName: '劳动合同纠纷',
      status: '已撤销',
      applicant: '吴九',
      respondent: '郑十',
    },
    progress: [
      {
        id: '1',
        title: '申请提交',
        content: '申请人提交了调解申请',
        time: '2024-09-22 09:15:36',
        status: 'completed',
      },
      {
        id: '2',
        title: '案件撤销',
        content: '申请人撤回了调解申请',
        time: '2024-09-23 16:30:22',
        status: 'completed',
      },
    ],
  },
  5: {
    info: {
      caseNumber: '2024-TJ005号',
      caseName: '服务合同纠纷',
      status: '待受理',
      applicant: '钱一',
      respondent: '孙二',
    },
    progress: [
      {
        id: '1',
        title: '申请提交',
        content: '申请人提交了调解申请',
        time: '2024-09-21 14:30:22',
        status: 'completed',
      },
      {
        id: '2',
        title: '案件受理',
        content: '调解机构将对案件进行初步审核',
        time: '',
        status: 'pending',
      },
      {
        id: '3',
        title: '调解员分配',
        content: '将为案件分配合适的调解员',
        time: '',
        status: 'pending',
      },
      {
        id: '4',
        title: '调解进行',
        content: '调解员将组织双方进行调解',
        time: '',
        status: 'pending',
      },
      {
        id: '5',
        title: '调解完成',
        content: '双方达成调解协议或调解失败',
        time: '',
        status: 'pending',
      },
    ],
  },
}

// 获取当前案件信息
const caseData = ref(mockCaseData[caseId] || mockCaseData['1'])
const caseInfo = ref<CaseInfo>(caseData.value.info)
const progressSteps = ref<ProgressStep[]>(caseData.value.progress)

// 返回上一页
function navigateBack() {
  router.back()
}

// 查看案件详情
function viewCaseDetail() {
  router.push({
    path: '/pages-sub/1-dispute-mediation/my-case/case-detail',
    query: { id: caseId },
  })
}

// 获取状态对应的图标
function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return '✓'
    case 'current':
      return '●'
    case 'pending':
      return '○'
    default:
      return '○'
  }
}

// 获取状态对应的样式
function getStatusClass(status: string) {
  switch (status) {
    case 'completed':
      return 'status-completed'
    case 'current':
      return 'status-current'
    case 'pending':
      return 'status-pending'
    default:
      return ''
  }
}

// 页面加载时执行
onMounted(() => {
  console.log('加载案件进度页面，ID:', caseId)
})
</script>

<template>
  <view class="case-progress-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        案件进度
      </view>
      <view class="header-right" />
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info" @click="viewCaseDetail">
      <view class="case-number-section">
        <text class="case-number">{{ caseInfo.caseNumber }}</text>
        <text class="case-status">{{ caseInfo.status }}</text>
      </view>
      <view class="case-name-section">
        <text class="case-name">{{ caseInfo.caseName }}</text>
      </view>
      <view class="case-parties-section">
        <text class="case-parties">申请人：{{ caseInfo.applicant }}</text>
      </view>
      <view class="case-parties-section">
        <text class="case-parties">被申请人：{{ caseInfo.respondent }}</text>
      </view>
      <view v-if="caseInfo.mediatorName" class="case-mediator-section">
        <text class="case-mediator">调解员：{{ caseInfo.mediatorName }}</text>
      </view>
      <view class="view-detail-icon">
        <text>→</text>
      </view>
    </view>

    <!-- 进度时间轴 -->
    <view class="progress-timeline">
      <view
        v-for="(step, index) in progressSteps"
        :key="step.id"
        class="timeline-item"
      >
        <!-- 连接线 -->
        <view v-if="index < progressSteps.length - 1" class="timeline-connector">
          <view
            class="connector-line"
            :class="{
              'connector-completed': step.status === 'completed',
              'connector-current': step.status === 'current',
              'connector-pending': step.status === 'pending',
            }"
          />
        </view>

        <!-- 步骤内容 -->
        <view class="timeline-content">
          <!-- 图标 -->
          <view
            class="step-icon"
            :class="getStatusClass(step.status)"
          >
            <text class="icon-text">{{ getStatusIcon(step.status) }}</text>
          </view>

          <!-- 信息 -->
          <view class="step-info">
            <view class="step-header">
              <text class="step-title">{{ step.title }}</text>
              <text v-if="step.time" class="step-time">{{ step.time }}</text>
            </view>
            <text class="step-content">{{ step.content }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 操作提示 -->
    <view v-if="caseInfo.status === '调解中' || caseInfo.status === '待受理'" class="operation-tips">
      <view class="tip-item">
        <text class="tip-icon">💡</text>
        <text class="tip-text">您可以随时查看案件详情，补充案件材料</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">📱</text>
        <text class="tip-text">请保持电话畅通，调解员可能会与您联系</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">⚖️</text>
        <text class="tip-text">如调解无法达成一致，您可以在案件详情页申请仲裁</text>
      </view>
    </view>

    <!-- 撤销案件提示 -->
    <view v-if="caseInfo.status === '已撤销'" class="operation-tips operation-tips-warning">
      <view class="tip-item">
        <text class="tip-icon">⚠️</text>
        <text class="tip-text">案件已撤销，不可再次申请仲裁</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">📝</text>
        <text class="tip-text">如有新的争议，建议重新提交调解申请</text>
      </view>
    </view>

    <!-- 调解成功提示 -->
    <view v-if="caseInfo.status === '调解成功'" class="operation-tips operation-tips-success">
      <view class="tip-item">
        <text class="tip-icon">✅</text>
        <text class="tip-text">案件已调解成功，请按照调解协议履行相关义务</text>
      </view>
      <view class="tip-item">
        <text class="tip-icon">📄</text>
        <text class="tip-text">您可以在案件详情页查看完整的调解协议</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-progress-container {
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
  position: relative;
  cursor: pointer;
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
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.case-name-section {
  margin-bottom: 8px;
}

.case-name {
  font-size: 16px;
  color: #333333;
}

.case-parties-section {
  margin-bottom: 4px;
}

.case-parties {
  font-size: 14px;
  color: #666666;
}

.case-mediator-section {
  margin-bottom: 4px;
}

.case-mediator {
  font-size: 14px;
  color: #666666;
}

.view-detail-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
}

.progress-timeline {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 32px;
}

.timeline-connector {
  position: absolute;
  left: 15px;
  top: 24px;
  bottom: 0;
  width: 2px;
}

.connector-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
}

.connector-completed {
  background-color: #52c41a;
}

.connector-current {
  background-color: #1890ff;
}

.connector-pending {
  background-color: #d9d9d9;
}

.timeline-content {
  display: flex;
  padding-bottom: 20px;
}

.step-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.status-completed {
  background-color: #f6ffed;
  color: #52c41a;
  border: 2px solid #52c41a;
}

.status-current {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 2px solid #1890ff;
}

.status-pending {
  background-color: #f5f5f5;
  color: #d9d9d9;
  border: 2px solid #d9d9d9;
}

.icon-text {
  font-size: 12px;
  font-weight: bold;
}

.step-info {
  flex: 1;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.step-title {
  font-size: 15px;
  font-weight: 500;
  color: #333333;
}

.step-time {
  font-size: 12px;
  color: #999999;
}

.step-content {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

.operation-tips {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.operation-tips-warning {
  border-left: 4px solid #faad14;
  background-color: #fffbe6;
}

.operation-tips-success {
  border-left: 4px solid #52c41a;
  background-color: #f6ffed;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 16px;
  margin-right: 8px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}
</style>
