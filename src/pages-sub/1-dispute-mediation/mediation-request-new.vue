<script setup lang="ts">
import { ref } from 'vue'

// 页面配置
uni.setNavigationBarTitle({
  title: '调解申请',
})

// 定义调解申请表单数据接口
interface MediationRequestForm {
  applicantType: 'natural' | 'company'
  applicantName: string
  applicantPhone: string
  applicantIdCard: string
  applicantAddress: string
  caseType: string
  idCardFront: string
  idCardBack: string
  needAgent: boolean
  respondentType: 'natural' | 'company'
  respondentName: string
  respondentPhone: string
  respondentIdCard: string
  respondentEmail: string
  respondentAddress: string
  respondentCaseType: string
  respondentIdCardFront: string
  respondentIdCardBack: string

  mediationRequest: string
  factReason: string
  evidenceFiles: string[]
  respondentEvidenceFiles: string[]
  respondentPdfFiles: string[]
  selectedMediator: string
  agreeAgreement: boolean
  claimAmount: string
  agreePrivacy: boolean
}

// 表单数据
const formData = ref<MediationRequestForm>({
  applicantType: 'natural',
  applicantName: '',
  applicantPhone: '',
  applicantIdCard: '',
  applicantAddress: '',
  caseType: '',
  idCardFront: '',
  idCardBack: '',
  needAgent: false,
  respondentType: 'natural',
  respondentName: '',
  respondentPhone: '',
  respondentIdCard: '',
  respondentEmail: '',
  respondentAddress: '',
  respondentCaseType: '',
  respondentIdCardFront: '',
  respondentIdCardBack: '',

  mediationRequest: '',
  factReason: '',
  evidenceFiles: [],
  respondentEvidenceFiles: [],
  respondentPdfFiles: [],
  selectedMediator: '',
  agreeAgreement: false,
  claimAmount: '',
  agreePrivacy: false,
})

// 页面加载时获取路由参数
onLoad((options: any) => {
  // 从路由参数中获取调解员姓名
  if (options && 'mediatorName' in options) {
    try {
      const mediatorName = decodeURIComponent(options.mediatorName)
      formData.value.selectedMediator = mediatorName
    }
    catch (error) {
      if (options.mediatorName) {
        formData.value.selectedMediator = options.mediatorName
      }
    }
  }
})

// 处理申请人身份证上传
async function uploadIdCard(type: 'front' | 'back') {
  try {
    const chooseRes = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })
    const tempFilePath = chooseRes.tempFilePaths[0]
    if (type === 'front') {
      formData.value.idCardFront = tempFilePath
    }
    else {
      formData.value.idCardBack = tempFilePath
    }
  }
  catch (error) {
    console.error('上传身份证图片失败:', error)
  }
}

// 处理被申请人身份证上传
async function uploadRespondentIdCard(type: 'front' | 'back') {
  try {
    const chooseRes = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })
    const tempFilePath = chooseRes.tempFilePaths[0]
    if (type === 'front') {
      formData.value.respondentIdCardFront = tempFilePath
    }
    else {
      formData.value.respondentIdCardBack = tempFilePath
    }
  }
  catch (error) {
    console.error('上传被申请人身份证图片失败:', error)
  }
}

// 处理文件上传
function handleFileUpload() {
  try {
    uni.chooseImage({
      count: 5,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        if (formData.value.evidenceFiles.length + res.tempFilePaths.length > 5) {
          uni.showToast({ title: '最多只能上传5张图片', icon: 'none' })
          return
        }
        const filePaths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
        formData.value.evidenceFiles = [...formData.value.evidenceFiles, ...filePaths]
      },
    })
  }
  catch (error) {
    console.error('文件上传失败:', error)
  }
}

// 删除上传的文件
function handleFileRemove(index: number) {
  formData.value.evidenceFiles.splice(index, 1)
}

// 跳转到协议页面
function navigateToAgreement(type: 'user' | 'privacy') {
  const pagePath = type === 'user' ? '/pages-sub/agreement/user' : '/pages-sub/agreement/privacy'
  uni.navigateTo({ url: pagePath })
}

// 表单验证
function validateForm(): boolean {
  if (!formData.value.applicantName) {
    uni.showToast({ title: '请输入申请人姓名', icon: 'none' })
    return false
  }
  if (!formData.value.applicantPhone) {
    uni.showToast({ title: '请输入申请人手机号', icon: 'none' })
    return false
  }
  if (!formData.value.applicantIdCard) {
    uni.showToast({ title: '请输入申请人身份证号', icon: 'none' })
    return false
  }
  if (!formData.value.applicantAddress) {
    uni.showToast({ title: '请输入地址', icon: 'none' })
    return false
  }
  if (!formData.value.caseType) {
    uni.showToast({ title: '请选择案件类型', icon: 'none' })
    return false
  }
  if (!formData.value.idCardFront) {
    uni.showToast({ title: '请上传身份证正面', icon: 'none' })
    return false
  }
  if (!formData.value.idCardBack) {
    uni.showToast({ title: '请上传身份证反面', icon: 'none' })
    return false
  }
  if (!formData.value.respondentName) {
    uni.showToast({ title: '请输入被申请人姓名', icon: 'none' })
    return false
  }
  if (!formData.value.respondentAddress) {
    uni.showToast({ title: '请输入被申请人地址', icon: 'none' })
    return false
  }
  if (!formData.value.respondentCaseType) {
    uni.showToast({ title: '请选择被申请人案件类型', icon: 'none' })
    return false
  }
  if (!formData.value.respondentIdCardFront) {
    uni.showToast({ title: '请上传被申请人身份证正面', icon: 'none' })
    return false
  }
  if (!formData.value.respondentIdCardBack) {
    uni.showToast({ title: '请上传被申请人身份证反面', icon: 'none' })
    return false
  }
  if (!formData.value.factReason) {
    uni.showToast({ title: '请输入事实与理由', icon: 'none' })
    return false
  }
  if (!formData.value.claimAmount) {
    uni.showToast({ title: '请输入标底金额', icon: 'none' })
    return false
  }
  if (!formData.value.agreeAgreement) {
    uni.showToast({ title: '请同意调解协议', icon: 'none' })
    return false
  }
  if (!formData.value.agreePrivacy) {
    uni.showToast({ title: '请同意隐私政策', icon: 'none' })
    return false
  }
  return true
}

// 提交调解申请
function submitMediationRequest() {
  if (!validateForm()) {
    return
  }

  try {
    console.log('提交调解申请数据:', formData.value)
    uni.showToast({
      title: '调解申请提交成功',
      icon: 'success',
      duration: 2000,
      complete: () => {
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      },
    })
  }
  catch (error) {
    console.error('提交调解申请失败:', error)
    uni.showToast({ title: '提交失败，请稍后重试', icon: 'none' })
  }
}
</script>

<template>
  <view class="mediation-request-container">
    <!-- 页面顶部装饰 -->
    <view class="top-decoration" />

    <!-- 表单内容 -->
    <view class="form-content">
      <!-- 申请人信息 -->
      <view class="form-section">
        <view class="section-header">
          <view class="section-icon">
            <text class="icon">👤</text>
          </view>
          <view class="section-title">
            申请人信息
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            选择申请人类型：
          </view>
          <view class="radio-group">
            <view class="radio-item" @click="formData.applicantType = 'natural'">
              <view
                class="radio-circle"
                :class="formData.applicantType === 'natural' ? 'radio-checked' : ''"
              >
                <view v-if="formData.applicantType === 'natural'" class="radio-inner" />
              </view>
              <text class="radio-text">自然人</text>
            </view>
            <view class="radio-item" @click="formData.applicantType = 'company'">
              <view
                class="radio-circle"
                :class="formData.applicantType === 'company' ? 'radio-checked' : ''"
              >
                <view v-if="formData.applicantType === 'company'" class="radio-inner" />
              </view>
              <text class="radio-text">公司</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label required">
            姓名
          </view>
          <input v-model="formData.applicantName" class="form-input" placeholder="请输入申请人姓名">
        </view>

        <view class="form-item">
          <view class="form-label required">
            手机号
          </view>
          <input v-model="formData.applicantPhone" class="form-input" type="number" placeholder="请输入申请人手机号">
        </view>

        <view class="form-item">
          <view class="form-label required">
            身份证号
          </view>
          <input v-model="formData.applicantIdCard" class="form-input" placeholder="请输入申请人身份证号">
        </view>

        <view class="form-item">
          <view class="form-label required">
            地址
          </view>
          <input v-model="formData.applicantAddress" class="form-input" type="text" placeholder="请输入地址（省市区街道门牌号）">
        </view>

        <view class="form-item">
          <view class="form-label required">
            案由
          </view>
          <picker
            class="form-picker"
            :range="['合同纠纷', '房产纠纷', '婚姻家庭纠纷', '劳动纠纷', '交通事故纠纷', '知识产权纠纷', '其他纠纷']"
            @change="(e) => formData.caseType = ['合同纠纷', '房产纠纷', '婚姻家庭纠纷', '劳动纠纷', '交通事故纠纷', '知识产权纠纷', '其他纠纷'][e.detail.value]"
          >
            <view class="picker-display">
              {{ formData.caseType || '请选择案件类型' }}
            </view>
            <view class="picker-arrow">
              ▼
            </view>
          </picker>
        </view>

        <view class="form-item">
          <view class="form-label required">
            身份证正反面
          </view>
          <view class="idcard-upload-container">
            <view class="upload-wrapper" @click="uploadIdCard('front')">
              <image v-if="formData.idCardFront" :src="formData.idCardFront" class="upload-image" mode="aspectFit" />
              <view v-else class="upload-placeholder">
                <text class="upload-icon">📷</text>
                <text class="upload-text">上传身份证正面</text>
              </view>
            </view>
            <view class="upload-wrapper" @click="uploadIdCard('back')">
              <image v-if="formData.idCardBack" :src="formData.idCardBack" class="upload-image" mode="aspectFit" />
              <view v-else class="upload-placeholder">
                <text class="upload-icon">📷</text>
                <text class="upload-text">上传身份证反面</text>
              </view>
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            是否需要委托代理人：
          </view>
          <view class="radio-group">
            <view class="radio-item" @click="formData.needAgent = true">
              <view
                class="radio-circle"
                :class="formData.needAgent ? 'radio-checked' : ''"
              >
                <view v-if="formData.needAgent" class="radio-inner" />
              </view>
              <text class="radio-text">是</text>
            </view>
            <view class="radio-item" @click="formData.needAgent = false">
              <view
                class="radio-circle"
                :class="!formData.needAgent ? 'radio-checked' : ''"
              >
                <view v-if="!formData.needAgent" class="radio-inner" />
              </view>
              <text class="radio-text">否</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 被申请人信息 -->
      <view class="form-section">
        <view class="section-header">
          <view class="section-icon">
            <text class="icon">👥</text>
          </view>
          <view class="section-title">
            被申请人信息
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            选择被申请人类型：
          </view>
          <view class="radio-group">
            <view class="radio-item" @click="formData.respondentType = 'natural'">
              <view
                class="radio-circle"
                :class="formData.respondentType === 'natural' ? 'radio-checked' : ''"
              >
                <view v-if="formData.respondentType === 'natural'" class="radio-inner" />
              </view>
              <text class="radio-text">自然人</text>
            </view>
            <view class="radio-item" @click="formData.respondentType = 'company'">
              <view
                class="radio-circle"
                :class="formData.respondentType === 'company' ? 'radio-checked' : ''"
              >
                <view v-if="formData.respondentType === 'company'" class="radio-inner" />
              </view>
              <text class="radio-text">公司</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label required">
            姓名
          </view>
          <input v-model="formData.respondentName" class="form-input" placeholder="请输入被申请人姓名">
        </view>

        <view class="form-item">
          <view class="form-label">
            手机号
          </view>
          <input v-model="formData.respondentPhone" class="form-input" type="number" placeholder="请输入被申请人手机号">
        </view>

        <view class="form-item">
          <view class="form-label required">
            身份证号
          </view>
          <input v-model="formData.respondentIdCard" class="form-input" placeholder="请输入被申请人身份证号">
        </view>

        <view class="form-item">
          <view class="form-label required">
            地址
          </view>
          <input v-model="formData.respondentAddress" class="form-input" type="text" placeholder="请输入被申请人地址">
        </view>

        <view class="form-item">
          <view class="form-label required">
            案由
          </view>
          <picker
            class="form-picker"
            :range="['合同纠纷', '房产纠纷', '婚姻家庭纠纷', '劳动纠纷', '交通事故纠纷', '知识产权纠纷', '其他纠纷']"
            @change="(e) => formData.respondentCaseType = ['合同纠纷', '房产纠纷', '婚姻家庭纠纷', '劳动纠纷', '交通事故纠纷', '知识产权纠纷', '其他纠纷'][e.detail.value]"
          >
            <view class="picker-display">
              {{ formData.respondentCaseType || '请选择被申请人案件类型' }}
            </view>
            <view class="picker-arrow">
              ▼
            </view>
          </picker>
        </view>

        <view class="form-item">
          <view class="form-label required">
            身份证正反面
          </view>
          <view class="idcard-upload-container">
            <view class="upload-wrapper" @click="uploadRespondentIdCard('front')">
              <image v-if="formData.respondentIdCardFront" :src="formData.respondentIdCardFront" class="upload-image" mode="aspectFit" />
              <view v-else class="upload-placeholder">
                <text class="upload-icon">📷</text>
                <text class="upload-text">上传被申请人身份证正面</text>
              </view>
            </view>
            <view class="upload-wrapper" @click="uploadRespondentIdCard('back')">
              <image v-if="formData.respondentIdCardBack" :src="formData.respondentIdCardBack" class="upload-image" mode="aspectFit" />
              <view v-else class="upload-placeholder">
                <text class="upload-icon">📷</text>
                <text class="upload-text">上传被申请人身份证反面</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 事实与理由 -->
      <view class="form-section">
        <view class="section-header">
          <view class="section-icon">
            <text class="icon">📝</text>
          </view>
          <view class="section-title">
            事实与理由
          </view>
        </view>

        <view class="form-item">
          <view class="form-label required">
            事实与理由
          </view>
          <textarea v-model="formData.factReason" class="form-textarea" placeholder="请输入事实与理由（描述的事实与理由字数限定在500字以内）" rows="5" />
          <text class="textarea-tip">建议文字形式上传更容易审核，并在此处简要说明。</text>
        </view>

        <view class="form-item">
          <view class="form-label">
            证据文件
          </view>
          <view class="files-container">
            <!-- 上传按钮 -->
            <view v-if="formData.evidenceFiles.length < 5" class="upload-btn" @click="handleFileUpload">
              <view class="upload-plus">
                +
              </view>
              <text class="upload-btn-text">添加证据</text>
            </view>
            <!-- 已上传的文件 -->
            <view v-for="(file, index) in formData.evidenceFiles" :key="index" class="file-item">
              <image class="file-image" :src="file" mode="aspectFill" />
              <view class="file-remove" @click="handleFileRemove(index)">
                ×
              </view>
            </view>
          </view>
          <text class="file-tip">最多可上传5张图片，支持jpg、png格式</text>
        </view>

        <!-- 调解员信息显示 -->
        <view class="form-item mediator-info">
          <view class="mediator-content">
            <text class="mediator-icon">👨‍⚖️</text>
            <view class="mediator-text">
              <text>您已选择</text>
              <text class="mediator-name">{{ formData.selectedMediator || '李某某' }}</text>
              <text>为您的调解员</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label required">
            标底金额（单位：元）
          </view>
          <div class="amount-input-container">
            <text class="currency-symbol">¥</text>
            <input v-model="formData.claimAmount" class="amount-input" type="number" placeholder="例如：100">
          </div>
        </view>
      </view>

      <!-- 协议同意 -->
      <view class="form-section">
        <view class="section-header">
          <view class="section-icon">
            <text class="icon">📄</text>
          </view>
          <view class="section-title">
            协议同意
          </view>
        </view>

        <view class="form-item agreement-item">
          <checkbox-group v-model="formData.agreeAgreement">
            <label class="checkbox-wrapper">
              <checkbox value="true" class="custom-checkbox" />
              <text class="checkbox-text">我同意将本纠纷提交即调法律服务平台进行调解处理，调解成功的我同意将本纠纷最终调解协议送仲裁委员会制作调解书，调解书的效力由仲委员会根据《仲裁法》《网络仲裁规则》《仲裁委员会网络仲裁暂行规则》进行网络仲裁确认并加盖仲裁委员会电子印章送达。本协议视为我已将本人住所地址送达方式为准，短信发送或邮寄送达即视为送达。</text>
            </label>
          </checkbox-group>
        </view>

        <view class="form-item agreement-item">
          <checkbox-group v-model="formData.agreePrivacy">
            <label class="checkbox-wrapper">
              <checkbox value="true" class="custom-checkbox" />
              <text class="checkbox-text">我同意即调法律服务平台使用我所提供的信息，查看
                <text class="agreement-link" @click="navigateToAgreement('user')">《用户服务协议》</text>
                和
                <text class="agreement-link" @click="navigateToAgreement('privacy')">《个人信息保护隐私政策》</text>
              </text>
            </label>
          </checkbox-group>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn-container">
        <button class="submit-btn" @click="submitMediationRequest">
          <text class="submit-btn-text">提交申请</text>
        </button>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="bottom-decoration" />
  </view>
</template>

<style scoped lang="scss">
// 全局样式变量
$primary-color: #1989fa;
$primary-hover: #409eff;
$text-primary: #333;
$text-secondary: #666;
$text-placeholder: #999;
$border-color: #e5e5e5;
$bg-color: #f5f5f5;
$white: #ffffff;
$required-color: #ff4d4f;

.mediation-request-container {
  padding: 0;
  background-color: $bg-color;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

// 顶部装饰
.top-decoration {
  height: 6px;
  background: linear-gradient(90deg, $primary-color 0%, #67c23a 100%);
}

// 底部装饰
.bottom-decoration {
  height: 20px;
  background-color: $bg-color;
}

.form-content {
  background-color: $white;
  margin: 0 16px 20px 16px;
  padding: 24px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  top: -6px;
}

.form-section {
  margin-bottom: 28px;
  position: relative;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid $border-color;
}

.section-icon {
  width: 32px;
  height: 32px;
  background-color: rgba(25, 137, 250, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.icon {
  font-size: 18px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: $text-secondary;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
}

.form-label.required::after {
  content: ' *';
  color: $required-color;
}

.form-input {
  width: 100%;
  height: 44px;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  color: $text-primary;
  background-color: $white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  &:focus {
    border-color: $primary-color;
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.2);
  }
  &::placeholder {
    color: $text-placeholder;
  }
}

// 单选按钮样式
.radio-group {
  display: flex;
  gap: 24px;
  padding: 8px 0;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
  &:active {
    opacity: 0.7;
  }
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid $border-color;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: all 0.3s ease;
}

.radio-checked {
  border-color: $primary-color;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: $primary-color;
  border-radius: 50%;
  animation: radioInnerShow 0.2s ease;
}

.radio-text {
  font-size: 14px;
  color: $text-secondary;
}

// 选择器样式
.form-picker {
  width: 100%;
  height: 44px;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    border-color: $primary-color;
  }
}

.picker-display {
  font-size: 14px;
  color: $text-primary;
}

.picker-arrow {
  font-size: 12px;
  color: $text-placeholder;
  transition: transform 0.3s ease;
}

.form-picker:active .picker-arrow {
  transform: rotate(180deg);
}

// 身份证上传样式
.idcard-upload-container {
  display: flex;
  gap: 12px;
}

.upload-wrapper {
  flex: 1;
  height: 120px;
  border: 1px dashed $border-color;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    border-color: $primary-color;
    background-color: rgba(25, 137, 250, 0.05);
  }
}

.upload-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 12px;
  color: $text-placeholder;
}

// 文本域样式
.form-textarea {
  width: 100%;
  min-height: 120px;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: $text-primary;
  background-color: $white;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;
  &:focus {
    border-color: $primary-color;
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.2);
  }
  &::placeholder {
    color: $text-placeholder;
  }
}

.textarea-tip {
  font-size: 12px;
  color: $text-placeholder;
  margin-top: 6px;
  display: block;
}

// 文件上传样式
.files-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}

.upload-btn {
  width: 100px;
  height: 100px;
  border: 1px dashed $border-color;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.02);
  &:active {
    border-color: $primary-color;
    background-color: rgba(25, 137, 250, 0.05);
  }
}

.upload-plus {
  font-size: 24px;
  color: $text-placeholder;
  margin-bottom: 4px;
}

.upload-btn-text {
  font-size: 12px;
  color: $text-placeholder;
}

.file-item {
  width: 100px;
  height: 100px;
  border: 1px solid $border-color;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.file-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  transition: all 0.3s ease;
  &:active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.file-tip {
  font-size: 12px;
  color: $text-placeholder;
}

// 调解员信息样式
.mediator-info {
  background-color: rgba(25, 137, 250, 0.05);
  border-radius: 8px;
  padding: 16px;
}

.mediator-content {
  display: flex;
  align-items: center;
}

.mediator-icon {
  font-size: 24px;
  margin-right: 12px;
}

.mediator-text {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.5;
}

.mediator-name {
  color: $primary-color;
  font-weight: 600;
  margin: 0 4px;
}

// 金额输入样式
.amount-input-container {
  display: flex;
  align-items: center;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 0 16px;
  height: 44px;
  transition: all 0.3s ease;
  &:focus-within {
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba(25, 137, 250, 0.2);
  }
}

.currency-symbol {
  font-size: 14px;
  color: $text-secondary;
  margin-right: 8px;
}

.amount-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: $text-primary;
  &::placeholder {
    color: $text-placeholder;
  }
}

// 协议复选框样式
.agreement-item {
  margin-bottom: 16px;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}

.custom-checkbox {
  transform: scale(0.85);
  margin-top: 2px;
}

.checkbox-text {
  flex: 1;
  margin-left: 8px;
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
}

.agreement-link {
  color: $primary-color;
  text-decoration: underline;
  cursor: pointer;
}

// 提交按钮样式
.submit-btn-container {
  margin-top: 32px;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background-color: $primary-color;
  color: $white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
  &:active {
    background-color: $primary-hover;
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(25, 137, 250, 0.3);
  }
  &:disabled {
    background-color: #c0c4cc;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.submit-btn-text {
  font-size: 16px;
  font-weight: 500;
}

// 动画
@keyframes radioInnerShow {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

// 响应式设计
@media (max-width: 320px) {
  .form-content {
    margin: 0 12px 16px 12px;
    padding: 20px 12px;
  }

  .section-title {
    font-size: 16px;
  }

  .form-input,
  .form-picker {
    height: 40px;
  }

  .submit-btn {
    height: 44px;
  }
}
</style>
