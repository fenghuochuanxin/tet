<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const caseId = route.query.id as string

definePage({
  style: {
    navigationBarTitleText: '案件进度',
  },
})
// 案件进度数据
interface ProgressStep {
  id: string
  content: string
  time: string
  status: 'pending' | 'completed'
}

// 模拟案件数据映射表
const mockCaseData: Record<string, { caseInfo: any, progressSteps: ProgressStep[] }> = {
  1: {
    caseInfo: {
      caseNumber: '2024-WT690号',
      caseName: 'kings撤销案件',
      createTime: '2024-09-25 10:24:54',
    },
    progressSteps: [
      {
        id: '1',
        content: '申请人kings提交调解申请',
        time: '2024-09-25 10:24:54',
        status: 'completed',
      },
      {
        id: '2',
        content: '调解员李明已受理',
        time: '2024-09-25 10:30:00',
        status: 'completed',
      },
      {
        id: '3',
        content: '申请人kings撤销案件申请',
        time: '2024-09-25 11:00:00',
        status: 'completed',
      },
      {
        id: '4',
        content: '案件已撤销',
        time: '2024-09-25 11:05:00',
        status: 'completed',
      },
    ],
  },
  2: {
    caseInfo: {
      caseNumber: '2024-WT689号',
      caseName: '调解协议签署已完成',
      createTime: '2024-09-24 17:55:50',
    },
    progressSteps: [
      {
        id: '1',
        content: '调解员为刘永庆的调解协议待审核',
        time: '2024-09-24 17:52:03',
        status: 'completed',
      },
      {
        id: '2',
        content: '待调解员刘永庆发起签署',
        time: '2024-09-24 17:52:09',
        status: 'completed',
      },
      {
        id: '3',
        content: '待调解员刘永庆签字',
        time: '2024-09-24 17:52:14',
        status: 'completed',
      },
      {
        id: '4',
        content: '调解员刘永庆已签字',
        time: '2024-09-24 17:53:12',
        status: 'completed',
      },
      {
        id: '5',
        content: '申请方：张三 已签字',
        time: '2024-09-24 17:55:47',
        status: 'completed',
      },
      {
        id: '6',
        content: '被申请方：李四 已签字',
        time: '2024-09-24 17:55:50',
        status: 'completed',
      },
      {
        id: '7',
        content: '调解协议签署已完成',
        time: '2024-09-24 17:55:50',
        status: 'completed',
      },
    ],
  },
  3: {
    caseInfo: {
      caseNumber: '2024-WT688号',
      caseName: '调解员刘永庆待受理',
      createTime: '2024-09-23 17:16:27',
    },
    progressSteps: [
      {
        id: '1',
        content: '申请人提交调解申请',
        time: '2024-09-23 17:16:27',
        status: 'completed',
      },
      {
        id: '2',
        content: '案件已分配给调解员刘永庆',
        time: '2024-09-23 17:20:00',
        status: 'completed',
      },
      {
        id: '3',
        content: '待调解员刘永庆受理',
        time: '2024-09-23 17:20:00',
        status: 'pending',
      },
    ],
  },
  4: {
    caseInfo: {
      caseNumber: '2024-WT687号',
      caseName: '当前案件已仲裁确认，案件号为2024-WQ258号',
      createTime: '2024-09-23 14:39:28',
    },
    progressSteps: [
      {
        id: '1',
        content: '申请人提交调解申请',
        time: '2024-09-23 14:39:28',
        status: 'completed',
      },
      {
        id: '2',
        content: '案件已分配给调解员赵敏',
        time: '2024-09-23 14:45:00',
        status: 'completed',
      },
      {
        id: '3',
        content: '调解成功，双方达成一致',
        time: '2024-09-23 15:30:00',
        status: 'completed',
      },
      {
        id: '4',
        content: '案件已仲裁确认，案件号为2024-WQ258号',
        time: '2024-09-23 16:00:00',
        status: 'completed',
      },
    ],
  },
  5: {
    caseInfo: {
      caseNumber: '2024-WT675号',
      caseName: '合同解除纠纷',
      createTime: '2024-09-22 09:15:36',
    },
    progressSteps: [
      {
        id: '1',
        content: '申请人提交调解申请',
        time: '2024-09-22 09:15:36',
        status: 'completed',
      },
      {
        id: '2',
        content: '案件已分配给调解员张华',
        time: '2024-09-22 09:20:00',
        status: 'completed',
      },
      {
        id: '3',
        content: '申请人撤销案件申请',
        time: '2024-09-22 10:00:00',
        status: 'completed',
      },
    ],
  },
}

// 获取案件信息
const caseInfo = ref(mockCaseData[caseId]?.caseInfo || {
  caseNumber: '未知案件',
  caseName: '未知状态',
  createTime: '',
})

// 案件进度数据
const progressSteps = ref<ProgressStep[]>(mockCaseData[caseId]?.progressSteps || [])
</script>

<template>
  <view class="case-progress-container">
    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="case-number-section">
        <text class="case-number">{{ caseInfo.caseNumber }}</text>
      </view>
      <view class="case-name-section">
        <text class="case-name">{{ caseInfo.caseName }}</text>
      </view>
      <view class="case-time-section">
        <text class="case-time">{{ caseInfo.createTime }}</text>
      </view>
    </view>

    <!-- 案件进度流程 -->
    <view class="progress-steps">
      <view v-for="(step, index) in progressSteps" :key="step.id" class="progress-step">
        <view class="step-content">
          <view class="step-time">
            {{ step.time }}
          </view>
          <view class="step-text" :class="{ completed: step.status === 'completed' }">
            {{ step.content }}
          </view>
        </view>
        <view v-if="index < progressSteps.length - 1" class="step-line" :class="{ completed: step.status === 'completed' }" />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-progress-container {
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
}

.case-name-section {
  margin-bottom: 8px;
}

.case-name {
  font-size: 16px;
  color: #07c160;
  font-weight: bold;
}

.case-time-section {
}

.case-time {
  font-size: 14px;
  color: #999999;
}

/* 案件进度流程 */
.progress-steps {
  background-color: #ffffff;
  padding: 16px;
  position: relative;
}

.progress-step {
  display: flex;
  position: relative;
  padding-left: 24px;
  margin-bottom: 16px;
}

.progress-step:last-child {
  margin-bottom: 0;
}

.step-content {
  flex: 1;
}

.step-time {
  font-size: 12px;
  color: #999999;
  margin-bottom: 4px;
}

.step-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
}

.step-text.completed {
  color: #333333;
}

/* 连接线 */
.step-line {
  position: absolute;
  left: 8px;
  top: 24px;
  width: 2px;
  height: calc(100% + 16px);
  background-color: #e5e5e5;
}

.step-line.completed {
  background-color: #07c160;
}
</style>
