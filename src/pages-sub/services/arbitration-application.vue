<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '仲裁确认',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black' as const,
  },
})

// 定义仲裁申请表单数据接口
interface ArbitrationForm {
  applicantType: 'natural' | 'company'
  name: string
  ethnicity: string
  birthDate: string
  idNumber: string
  address: string
  phone: string
  caseType: string
  idCardFront: string
  idCardBack: string
  respondentType: 'natural' | 'company'
  respondentName: string
  respondentEthnicity: string
  respondentBirthDate: string
  respondentIdNumber: string
  respondentAddress: string
  respondentPhone: string
  respondentIdCardFront: string
  respondentIdCardBack: string
  agreementFileType: 'image' | 'pdf'
  evidenceImages: string[]
  evidencePdfs: string[]
  confirmationRequest: string
  factsAndReasons: string
  targetAmount: string
  agreementDate: string
  agreeArbitratorSelection: boolean
}

// 表单数据
const formData = ref<ArbitrationForm>({
  applicantType: 'natural',
  name: '',
  ethnicity: '',
  birthDate: '',
  idNumber: '',
  address: '',
  phone: '',
  caseType: '',
  idCardFront: '',
  idCardBack: '',
  respondentType: 'natural',
  respondentName: '',
  respondentEthnicity: '',
  respondentBirthDate: '',
  respondentIdNumber: '',
  respondentAddress: '',
  respondentPhone: '',
  respondentIdCardFront: '',
  respondentIdCardBack: '',
  agreementFileType: 'image',
  evidenceImages: [],
  evidencePdfs: [],
  confirmationRequest: '',
  factsAndReasons: '',
  targetAmount: '',
  agreementDate: '',
  agreeArbitratorSelection: false,
})

// 返回上一页
function navigateBack() {
  router.back()
}

// 表单验证
function validateForm() {
  // 申请人信息验证
  if (!formData.value.name.trim()) {
    uni.showToast({
      title: '请输入申请人姓名',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.ethnicity.trim()) {
    uni.showToast({
      title: '请输入申请人民族',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.birthDate.trim()) {
    uni.showToast({
      title: '请选择申请人出生年月',
      icon: 'none',
    })
    return false
  }

  // 身份证号验证
  const idCardRegex = /^\d{15}$|^\d{18}$|^\d{17}[\dX]$/i
  if (!formData.value.idNumber.trim() || !idCardRegex.test(formData.value.idNumber)) {
    uni.showToast({
      title: '请输入正确的申请人身份证号',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.address.trim()) {
    uni.showToast({
      title: '请输入申请人住址',
      icon: 'none',
    })
    return false
  }

  // 手机号验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!formData.value.phone.trim() || !phoneRegex.test(formData.value.phone)) {
    uni.showToast({
      title: '请输入正确的申请人手机号码',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.caseType.trim()) {
    uni.showToast({
      title: '请选择案件类型',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.idCardFront) {
    uni.showToast({
      title: '请上传申请人身份证正面',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.idCardBack) {
    uni.showToast({
      title: '请上传申请人身份证反面',
      icon: 'none',
    })
    return false
  }

  // 被申请人信息验证
  if (!formData.value.respondentName.trim()) {
    uni.showToast({
      title: '请输入被申请人姓名',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentEthnicity.trim()) {
    uni.showToast({
      title: '请输入被申请人民族',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentBirthDate.trim()) {
    uni.showToast({
      title: '请选择被申请人出生年月',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentIdNumber.trim() || !idCardRegex.test(formData.value.respondentIdNumber)) {
    uni.showToast({
      title: '请输入正确的被申请人身份证号',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentAddress.trim()) {
    uni.showToast({
      title: '请输入被申请人住址',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentPhone.trim() || !phoneRegex.test(formData.value.respondentPhone)) {
    uni.showToast({
      title: '请输入正确的被申请人手机号码',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentIdCardFront) {
    uni.showToast({
      title: '请上传被申请人身份证正面',
      icon: 'none',
    })
    return false
  }

  if (!formData.value.respondentIdCardBack) {
    uni.showToast({
      title: '请上传被申请人身份证反面',
      icon: 'none',
    })
    return false
  }

  // 调解协议上传验证
  // 这里简化处理，实际应根据agreementFileType检查对应的文件

  // 确认请求验证
  if (!formData.value.confirmationRequest.trim()) {
    uni.showToast({
      title: '请填写确认请求',
      icon: 'none',
    })
    return false
  }

  // 事实与理由验证
  if (!formData.value.factsAndReasons.trim()) {
    uni.showToast({
      title: '请填写事实与理由',
      icon: 'none',
    })
    return false
  }

  // 标的金额验证
  if (!formData.value.targetAmount.trim()) {
    uni.showToast({
      title: '请填写标的金额',
      icon: 'none',
    })
    return false
  }

  // 调解协议达成日期验证
  if (!formData.value.agreementDate.trim()) {
    uni.showToast({
      title: '请选择调解协议达成日期',
      icon: 'none',
    })
    return false
  }

  // 仲裁员选择同意验证
  if (!formData.value.agreeArbitratorSelection) {
    uni.showToast({
      title: '请同意仲裁秘书指定仲裁员办理案件',
      icon: 'none',
    })
    return false
  }

  return true
}

// 处理身份证上传
function handleUploadIdCard(type: 'front' | 'back', isRespondent: boolean = false) {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      if (isRespondent) {
        if (type === 'front') {
          formData.value.respondentIdCardFront = tempFilePath
        }
        else {
          formData.value.respondentIdCardBack = tempFilePath
        }
      }
      else {
        if (type === 'front') {
          formData.value.idCardFront = tempFilePath
        }
        else {
          formData.value.idCardBack = tempFilePath
        }
      }

      // 这里可以添加图片上传到服务器的逻辑
      const prefix = isRespondent ? '被申请人' : '申请人'
      console.log(`已选择${prefix}${type === 'front' ? '身份证正面' : '身份证反面'}:`, tempFilePath)
    },
    fail: () => {
      uni.showToast({
        title: '选择图片失败',
        icon: 'none',
      })
    },
  })
}

// 处理证据图片上传
function handleUploadEvidenceImage() {
  uni.chooseImage({
    count: 9 - formData.value.evidenceImages.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.evidenceImages.push(...res.tempFilePaths)
      console.log('已选择证据图片:', res.tempFilePaths)
    },
    fail: () => {
      uni.showToast({
        title: '选择图片失败',
        icon: 'none',
      })
    },
  })
}

// 处理证据PDF上传
function handleUploadEvidencePdf() {
  uni.chooseMessageFile({
    count: 5 - formData.value.evidencePdfs.length,
    type: 'file',
    extension: ['pdf'],
    success: (res) => {
      res.tempFiles.forEach((file) => {
        formData.value.evidencePdfs.push(file.path)
      })
      console.log('已选择证据PDF:', res.tempFiles)
    },
    fail: () => {
      uni.showToast({
        title: '选择文件失败',
        icon: 'none',
      })
    },
  })
}

// 处理选择日期
function handleDatePicker(isRespondent: boolean = false) {
  // 获取当前日期
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // 计算最小可选年份（18岁）
  const minYear = year - 100
  const maxYear = year - 18

  uni.datePicker({
    type: 'date',
    start: `${minYear}-01-01`,
    end: `${maxYear}-12-31`,
    success: (res) => {
      if (isRespondent) {
        formData.value.respondentBirthDate = res.value
      }
      else {
        formData.value.birthDate = res.value
      }
    },
  })
}

// 处理案件类型选择
function handleCaseTypeSelect() {
  const caseTypes = [
    '合同纠纷',
    '侵权责任纠纷',
    '婚姻家庭纠纷',
    '物权纠纷',
    '知识产权纠纷',
    '劳动争议',
    '其他纠纷',
  ]

  uni.showActionSheet({
    itemList: caseTypes,
    success: (res) => {
      formData.value.caseType = caseTypes[res.tapIndex]
    },
  })
}

// 提交仲裁申请
function submitArbitrationApplication() {
  if (!validateForm()) {
    return
  }

  // 显示加载提示
  uni.showLoading({
    title: '提交中...',
  })

  // 模拟提交过程
  setTimeout(() => {
    uni.hideLoading()

    // 提交成功后跳转到二维码页面
    uni.navigateTo({
      url: '/pages-sub/services/arbitration-confirmation-qrcode',
      success: () => {
        uni.showToast({
          title: '申请提交成功',
          icon: 'success',
        })
      },
      fail: (err) => {
        console.error('跳转失败:', err)
        uni.showToast({
          title: '跳转失败，请稍后重试',
          icon: 'none',
        })
      },
    })
  }, 1500)
}
</script>

<template>
  <view class="arbitration-application-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        仲裁确认
      </view>
      <view class="header-right" />
    </view>

    <!-- 表单内容区域 -->
    <scroll-view class="form-scroll" scroll-y>
      <!-- 申请人类型选择 -->
      <view class="form-section">
        <view class="form-label">
          选择申请人类型：
        </view>
        <view class="radio-group">
          <view class="radio-item" @click="formData.applicantType = 'natural'">
            <view class="radio-circle" :class="formData.applicantType === 'natural' ? 'selected' : ''">
              <view v-if="formData.applicantType === 'natural'" class="radio-inner" />
            </view>
            <text>自然人</text>
          </view>
          <view class="radio-item" @click="formData.applicantType = 'company'">
            <view class="radio-circle" :class="formData.applicantType === 'company' ? 'selected' : ''">
              <view v-if="formData.applicantType === 'company'" class="radio-inner" />
            </view>
            <text>公司</text>
          </view>
        </view>
      </view>

      <!-- 基本信息表单 -->
      <view class="form-section">
        <view class="form-item">
          <view class="form-label">
            姓名：<text class="required">*</text>
          </view>
          <input
            v-model="formData.name"
            class="form-input"
            type="text"
            placeholder="请输入姓名"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            民族：<text class="required">*</text>
          </view>
          <input
            v-model="formData.ethnicity"
            class="form-input"
            type="text"
            placeholder="请输入民族"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            出生年月：<text class="required">*</text>
          </view>
          <input
            v-model="formData.birthDate"
            class="form-input"
            type="text"
            placeholder="请选择出生年月"
            placeholder-class="placeholder-style"
            readonly
            @click="handleDatePicker(false)"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            身份证号：<text class="required">*</text>
          </view>
          <input
            v-model="formData.idNumber"
            class="form-input"
            type="text"
            placeholder="请输入身份证号"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            住址：<text class="required">*</text>
          </view>
          <input
            v-model="formData.address"
            class="form-input"
            type="text"
            placeholder="请输入住址"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            电话：<text class="required">*</text>
          </view>
          <input
            v-model="formData.phone"
            class="form-input"
            type="number"
            placeholder="请输入手机号码"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            案由：<text class="required">*</text>
          </view>
          <input
            v-model="formData.caseType"
            class="form-input"
            type="text"
            placeholder="请选择案件类型"
            placeholder-class="placeholder-style"
            readonly
            @click="handleCaseTypeSelect"
          >
        </view>
      </view>

      <!-- 身份证上传区域 -->
      <view class="form-section">
        <view class="form-label">
          身份证正反面：<text class="required">*</text>
        </view>
        <view class="id-card-upload-container">
          <view
            class="id-card-upload-item"
            @click="handleUploadIdCard('front')"
          >
            <image
              v-if="formData.idCardFront"
              :src="formData.idCardFront"
              class="id-card-image"
            />
            <view v-else class="upload-placeholder">
              <text class="upload-icon">+</text>
              <text class="upload-text">点击上传身份证正面</text>
            </view>
          </view>

          <view
            class="id-card-upload-item"
            @click="handleUploadIdCard('back')"
          >
            <image
              v-if="formData.idCardBack"
              :src="formData.idCardBack"
              class="id-card-image"
            />
            <view v-else class="upload-placeholder">
              <text class="upload-icon">+</text>
              <text class="upload-text">点击上传身份证反面</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 被申请人类型选择 -->
      <view class="form-section">
        <view class="form-label">
          选择被申请人类型：
        </view>
        <view class="radio-group">
          <view class="radio-item" @click="formData.respondentType = 'natural'">
            <view class="radio-circle" :class="formData.respondentType === 'natural' ? 'selected' : ''">
              <view v-if="formData.respondentType === 'natural'" class="radio-inner" />
            </view>
            <text>自然人</text>
          </view>
          <view class="radio-item" @click="formData.respondentType = 'company'">
            <view class="radio-circle" :class="formData.respondentType === 'company' ? 'selected' : ''">
              <view v-if="formData.respondentType === 'company'" class="radio-inner" />
            </view>
            <text>公司</text>
          </view>
        </view>
      </view>

      <!-- 被申请人基本信息表单 -->
      <view class="form-section">
        <view class="form-item">
          <view class="form-label">
            姓名：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentName"
            class="form-input"
            type="text"
            placeholder="请输入被申请人姓名"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            民族：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentEthnicity"
            class="form-input"
            type="text"
            placeholder="请输入被申请人民族"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            出生年月：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentBirthDate"
            class="form-input"
            type="text"
            placeholder="请选择被申请人出生年月"
            placeholder-class="placeholder-style"
            readonly
            @click="handleDatePicker(true)"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            身份证号：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentIdNumber"
            class="form-input"
            type="text"
            placeholder="请输入被申请人身份证号"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            住址：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentAddress"
            class="form-input"
            type="text"
            placeholder="请输入被申请人住址"
            placeholder-class="placeholder-style"
          >
        </view>

        <view class="form-item">
          <view class="form-label">
            电话：<text class="required">*</text>
          </view>
          <input
            v-model="formData.respondentPhone"
            class="form-input"
            type="number"
            placeholder="请输入被申请人手机号码"
            placeholder-class="placeholder-style"
          >
        </view>
      </view>

      <!-- 被申请人身份证上传区域 -->
      <view class="form-section">
        <view class="form-label">
          被申请人身份证正反面：<text class="required">*</text>
        </view>
        <view class="id-card-upload-container">
          <view
            class="id-card-upload-item"
            @click="handleUploadIdCard('front', true)"
          >
            <image
              v-if="formData.respondentIdCardFront"
              :src="formData.respondentIdCardFront"
              class="id-card-image"
            />
            <view v-else class="upload-placeholder">
              <text class="upload-icon">+</text>
              <text class="upload-text">点击上传被申请人身份证正面</text>
            </view>
          </view>

          <view
            class="id-card-upload-item"
            @click="handleUploadIdCard('back', true)"
          >
            <image
              v-if="formData.respondentIdCardBack"
              :src="formData.respondentIdCardBack"
              class="id-card-image"
            />
            <view v-else class="upload-placeholder">
              <text class="upload-icon">+</text>
              <text class="upload-text">点击上传被申请人身份证反面</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 调解协议上传 -->
      <view class="form-section">
        <view class="form-label">
          调解协议上传：
        </view>
        <view class="radio-group">
          <view class="radio-item" @click="formData.agreementFileType = 'image'">
            <view class="radio-circle" :class="formData.agreementFileType === 'image' ? 'selected' : ''">
              <view v-if="formData.agreementFileType === 'image'" class="radio-inner" />
            </view>
            <text>图片</text>
          </view>
          <view class="radio-item" @click="formData.agreementFileType = 'pdf'">
            <view class="radio-circle" :class="formData.agreementFileType === 'pdf' ? 'selected' : ''">
              <view v-if="formData.agreementFileType === 'pdf'" class="radio-inner" />
            </view>
            <text>PDF文件</text>
          </view>
        </view>
      </view>

      <!-- 案件证据 -->
      <view class="form-section">
        <view class="form-label">
          案件证据：<text class="required">*</text>
        </view>

        <!-- 图片上传 -->
        <view class="evidence-section">
          <view class="evidence-title">
            图片上传
          </view>
          <view class="evidence-list">
            <view
              v-if="formData.evidenceImages.length < 9"
              class="evidence-item"
              @click="handleUploadEvidenceImage"
            >
              <text class="upload-icon">+</text>
              <text class="upload-text">添加图片</text>
            </view>
            <view
              v-for="(image, index) in formData.evidenceImages"
              :key="index"
              class="evidence-image-item"
            >
              <image :src="image" class="evidence-image" mode="aspectFill" />
            </view>
          </view>
        </view>

        <!-- PDF上传 -->
        <view class="evidence-section">
          <view class="evidence-title">
            PDF文件上传
          </view>
          <view class="evidence-list">
            <view
              v-if="formData.evidencePdfs.length < 5"
              class="evidence-item"
              @click="handleUploadEvidencePdf"
            >
              <text class="upload-icon">+</text>
              <text class="upload-text">添加PDF</text>
            </view>
            <view
              v-for="(pdf, index) in formData.evidencePdfs"
              :key="index"
              class="pdf-item"
            >
              <text class="pdf-icon">📄</text>
              <text class="pdf-name">{{ pdf.split('/').pop() }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 确认请求 -->
      <view class="form-section">
        <view class="form-label">
          确认请求：<text class="required">*</text>
        </view>
        <textarea
          v-model="formData.confirmationRequest"
          class="form-textarea"
          placeholder="1、请求依法确认申请人xxx与被申请人xxx于xxx年xx月xx日就xxx纠纷达成的《xxx调解协议》合法有效并依据该协议制作调解书；
2、申请人xxx被申请人xxx委托贵会承办本案的办案秘书指定本案仲裁员；
3、本案仲裁费用由被申请人负担。"
          placeholder-class="placeholder-style"
          rows="4"
        />
      </view>

      <!-- 事实与理由 -->
      <view class="form-section">
        <view class="form-label">
          事实与理由：<text class="required">*</text>
        </view>
        <textarea
          v-model="formData.factsAndReasons"
          class="form-textarea"
          placeholder="请输入事实与理由（若您的事实与理由字数超过500字，请以PDF文件的格式上传至证据文件中，（该PDF请命名为'仲裁申请书'），并请在此处详细备注）"
          placeholder-class="placeholder-style"
          rows="4"
        />
      </view>

      <!-- 标的金额 -->
      <view class="form-section">
        <view class="form-label">
          标的金额（单位：元）：<text class="required">*</text>
        </view>
        <input
          v-model="formData.targetAmount"
          class="form-input"
          type="number"
          placeholder="例如：100"
          placeholder-class="placeholder-style"
        >
      </view>

      <!-- 调解协议达成日期 -->
      <view class="form-section">
        <view class="form-label">
          调解协议达成日期：<text class="required">*</text>
        </view>
        <input
          v-model="formData.agreementDate"
          class="form-input"
          type="text"
          placeholder="请选择日期"
          placeholder-class="placeholder-style"
          readonly
          @click="handleDatePicker(false)"
        >
      </view>

      <!-- 仲裁员选择同意 -->
      <view class="form-section">
        <view class="checkbox-item">
          <view
            class="checkbox"
            :class="formData.agreeArbitratorSelection ? 'checked' : ''"
            @click="formData.agreeArbitratorSelection = !formData.agreeArbitratorSelection"
          >
            <text v-if="formData.agreeArbitratorSelection" class="checkbox-icon">✓</text>
          </view>
          <text class="checkbox-text">我已同意仲裁秘书指定仲裁员办理案件</text>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-button-container">
        <button class="submit-button" @click="submitArbitrationApplication">
          提交申请
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.arbitration-application-container {
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

.form-scroll {
  flex: 1;
}

.form-section {
  background-color: #ffffff;
  margin-bottom: 12px;
  padding: 16px;
}

.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
}

.required {
  color: #ff4d4f;
}

.form-input {
  width: 100%;
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 14px;
  color: #333333;
  background-color: #ffffff;
  box-sizing: border-box;
}

.placeholder-style {
  color: #999999;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
}

.radio-circle.selected {
  border-color: #1989fa;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: #1989fa;
  border-radius: 50%;
}

.id-card-upload-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.id-card-upload-item {
  width: calc(50% - 6px);
  height: 140px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.id-card-image {
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
  background-color: #fafafa;
}

.upload-icon {
  font-size: 24px;
  color: #d9d9d9;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 12px;
  color: #999999;
  text-align: center;
  padding: 0 8px;
}

.submit-button-container {
  padding: 20px 16px;
  background-color: #ffffff;
}

.submit-button {
  width: 100%;
  height: 45px;
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 22.5px;
  font-size: 16px;
  font-weight: bold;
  border: none;
}

/* 表单文本域样式 */
.form-textarea {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 14px;
  color: #333333;
  background-color: #ffffff;
  box-sizing: border-box;
  resize: none;
  min-height: 120px;
}

/* 证据上传样式 */
.evidence-section {
  margin-bottom: 16px;
}

.evidence-section:last-child {
  margin-bottom: 0;
}

.evidence-title {
  display: block;
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
}

.evidence-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.evidence-item {
  width: 80px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
}

.evidence-image-item {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.evidence-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* PDF文件样式 */
.pdf-item {
  width: calc(100% - 92px);
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  background-color: #ffffff;
  overflow: hidden;
}

.pdf-icon {
  font-size: 20px;
}

.pdf-name {
  font-size: 12px;
  color: #666666;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 复选框样式 */
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: #ffffff;
}

.checkbox.checked {
  border-color: #1989fa;
  background-color: #1989fa;
}

.checkbox-icon {
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-text {
  font-size: 14px;
  color: #333333;
  flex: 1;
}

/* 适配不同平台 */
@media screen and (min-width: 768px) {
  .arbitration-application-container {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
}
</style>
