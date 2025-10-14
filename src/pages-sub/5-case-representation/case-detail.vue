<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

definePage({
  style: {
    navigationBarTitleText: '案件详情',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 案件详情数据接口
interface CaseDetail {
  id: string
  status: string
  statusText: string
  caseType: string
  createTime: string
  updateTime: string
  description: string

  // 申请人信息
  applicant: {
    name: string
    phone: string
    idCard: string
    address: string
  }

  // 被申请人信息
  respondent: {
    name: string
    phone: string
    idCard: string
    address: string
  }

  // 请求确认
  requestConfirmation: string

  // 事实与理由
  factReason: string

  // 调解协议
  mediationAgreement: string

  // 证据文件
  evidenceFiles: {
    type: 'image' | 'file'
    name: string
    path: string
  }[]

  // 被申请人证据文件
  respondentEvidenceFiles: {
    type: 'image' | 'file'
    name: string
    path: string
  }[]

  // 被申请人答辩意见
  respondentDefenseOpinion: string
}

// 案件详情数据
const caseDetail = ref<CaseDetail>({
  id: '',
  status: '',
  statusText: '',
  caseType: '',
  createTime: '',
  updateTime: '',
  description: '',
  applicant: {
    name: '',
    phone: '',
    idCard: '',
    address: '',
  },
  respondent: {
    name: '',
    phone: '',
    idCard: '',
    address: '',
  },
  requestConfirmation: '',
  factReason: '',
  mediationAgreement: '',
  evidenceFiles: [],
  respondentEvidenceFiles: [],
  respondentDefenseOpinion: '',
})

// 折叠状态
const collapsedSections = ref({
  applicantInfo: true,
  respondentInfo: true,
  requestConfirmation: true,
  factReason: true,
  mediationAgreement: true,
  applicantEvidence: true,
  respondentEvidence: true,
  respondentDefense: true,
})

// 切换折叠状态
function toggleSection(section: keyof typeof collapsedSections.value) {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// 页面加载时获取案件详情
onLoad((options: any) => {
  console.log('案件详情页面加载，参数:', options)

  // 模拟获取案件详情数据
  const caseId = options.caseId || '2024-WT381号'

  // 根据案件ID设置模拟数据
  caseDetail.value = {
    id: caseId,
    status: '进行中',
    statusText: '案件修改',
    caseType: '纠纷调解',
    createTime: '2024-09-23 17:17:54',
    updateTime: '2024-09-23 17:17:54',
    description: '申请人与被申请人合同纠纷一案',
    applicant: {
      name: '张三',
      phone: '138****1234',
      idCard: '110101********1234',
      address: '北京市海淀区中关村南大街5号',
    },
    respondent: {
      name: '李四',
      phone: '139****5678',
      idCard: '110102********5678',
      address: '北京市朝阳区建国路88号',
    },
    requestConfirmation: '请求调解申请人与被申请人之间的合同纠纷，要求被申请人支付合同款项及违约金。',
    factReason: '申请人与被申请人于2024年6月1日签订了《软件开发合同》，约定申请人为被申请人开发一套管理系统，合同金额为50万元。申请人按照合同约定完成了开发工作，但被申请人未按照合同约定支付全部款项，经多次催讨仍拒不支付。',
    mediationAgreement: '经双方协商，被申请人同意于2024年10月31日前支付剩余合同款项30万元及违约金5万元，共计35万元。',
    evidenceFiles: [
      {
        type: 'image',
        name: '合同照片1',
        path: 'https://via.placeholder.com/300x200?text=合同照片1',
      },
      {
        type: 'image',
        name: '合同照片2',
        path: 'https://via.placeholder.com/300x200?text=合同照片2',
      },
    ],
    respondentEvidenceFiles: [],
    respondentDefenseOpinion: '暂无内容',
  }
})

// 返回上一页
function navigateBack() {
  router.back()
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
      <view class="header-right" />
    </view>

    <!-- 案件基本信息 -->
    <view class="case-basic-info">
      <view class="case-id">
        <text class="case-id-icon">🔰</text>
        {{ caseDetail.id }}
      </view>
      <view class="case-type-tag">
        {{ caseDetail.caseType }}
      </view>
      <view class="case-status">
        {{ caseDetail.statusText }}
      </view>
      <view class="case-time">
        {{ caseDetail.createTime }}
      </view>
    </view>

    <!-- 申请人信息 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('applicantInfo')">
        <text class="section-title">申请人信息</text>
        <text class="section-arrow" :class="collapsedSections.applicantInfo ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.applicantInfo" class="section-content">
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
          <text class="info-value">{{ caseDetail.applicant.idCard }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">地址：</text>
          <text class="info-value">{{ caseDetail.applicant.address }}</text>
        </view>
      </view>
    </view>

    <!-- 被申请人信息 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('respondentInfo')">
        <text class="section-title">被申请人信息</text>
        <text class="section-arrow" :class="collapsedSections.respondentInfo ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.respondentInfo" class="section-content">
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
          <text class="info-value">{{ caseDetail.respondent.idCard }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">地址：</text>
          <text class="info-value">{{ caseDetail.respondent.address }}</text>
        </view>
      </view>
    </view>

    <!-- 请求确认 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('requestConfirmation')">
        <text class="section-title">确认请求</text>
        <text class="section-arrow" :class="collapsedSections.requestConfirmation ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.requestConfirmation" class="section-content">
        <text class="content-text">{{ caseDetail.requestConfirmation }}</text>
      </view>
    </view>

    <!-- 事实与理由 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('factReason')">
        <text class="section-title">事实与理由</text>
        <text class="section-arrow" :class="collapsedSections.factReason ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.factReason" class="section-content">
        <text class="content-text">{{ caseDetail.factReason }}</text>
      </view>
    </view>

    <!-- 调解协议 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('mediationAgreement')">
        <text class="section-title">调解协议</text>
        <text class="section-arrow" :class="collapsedSections.mediationAgreement ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.mediationAgreement" class="section-content">
        <text class="content-text">{{ caseDetail.mediationAgreement }}</text>
      </view>
    </view>

    <!-- 申请人案件证据 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('applicantEvidence')">
        <text class="section-title">申请人案件证据</text>
        <text class="section-arrow" :class="collapsedSections.applicantEvidence ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.applicantEvidence" class="section-content">
        <view class="evidence-section">
          <text class="evidence-title">图片证据</text>
          <view class="evidence-list">
            <view v-for="(file, index) in caseDetail.evidenceFiles" :key="index" class="evidence-item">
              <image v-if="file.type === 'image'" :src="file.path" mode="aspectFill" />
              <text class="evidence-name">{{ file.name }}</text>
            </view>
            <view v-if="caseDetail.evidenceFiles.length === 0" class="no-evidence">
              暂无图片证据
            </view>
          </view>
        </view>
        <view class="evidence-section">
          <text class="evidence-title">文件证据</text>
          <view v-if="caseDetail.evidenceFiles.length === 0" class="no-evidence">
            暂无
          </view>
        </view>
      </view>
    </view>

    <!-- 被申请人案件证据 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('respondentEvidence')">
        <text class="section-title">被申请人案件证据</text>
        <text class="section-arrow" :class="collapsedSections.respondentEvidence ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.respondentEvidence" class="section-content">
        <view v-if="caseDetail.respondentEvidenceFiles.length === 0" class="no-evidence">
          暂无
        </view>
      </view>
    </view>

    <!-- 被申请人答辩意见 -->
    <view class="section">
      <view class="section-header" @click="toggleSection('respondentDefense')">
        <text class="section-title">被申请人答辩意见</text>
        <text class="section-arrow" :class="collapsedSections.respondentDefense ? 'collapsed' : ''">▼</text>
      </view>
      <view v-if="!collapsedSections.respondentDefense" class="section-content">
        <text class="content-text">{{ caseDetail.respondentDefenseOpinion }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.case-detail-container {
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
  padding: 16px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.case-id {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.case-id-icon {
  margin-right: 4px;
}

.case-type-tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: #e8f5e8;
  color: #07c160;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}

.case-status {
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
}

.case-time {
  font-size: 12px;
  color: #999999;
}

.section {
  background-color: #ffffff;
  margin-bottom: 12px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.section-arrow {
  font-size: 12px;
  color: #999999;
  transition: transform 0.3s;
}

.section-arrow.collapsed {
  transform: rotate(-90deg);
}

.section-content {
  padding: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.info-label {
  font-size: 14px;
  color: #666666;
  width: 80px;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.content-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.evidence-section {
  margin-bottom: 16px;
}

.evidence-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12px;
}

.evidence-list {
  display: flex;
  flex-wrap: wrap;
}

.evidence-item {
  width: 80px;
  height: 80px;
  margin-right: 12px;
  margin-bottom: 12px;
  position: relative;
}

.evidence-item image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.evidence-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2px 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0 0 4px 4px;
}

.no-evidence {
  font-size: 14px;
  color: #999999;
  padding: 12px 0;
}
</style>
