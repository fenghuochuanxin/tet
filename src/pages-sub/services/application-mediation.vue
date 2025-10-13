<script setup lang="ts">
import { ref } from 'vue'

// 调解员选择（system/online）

// 是否免费（仅系统指定时生效）
const isFreeMediator = ref('free') // 默认免费
// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '申请调解',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
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
  mediatorSelection: 'system' | 'online'
  selectedMediator: string
  agreeAgreement: boolean
  claimAmount: string
  agreePrivacy: boolean
  mediatorFeeType: 'free' | 'paid'
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
  mediatorSelection: 'online',
  selectedMediator: '刘宇',
  agreeAgreement: false,
  claimAmount: '',
  agreePrivacy: false,
  mediatorFeeType: 'paid',
})

// 页面加载时获取路由参数 - 在<script setup>中直接使用onLoad生命周期函数
onLoad((options: any) => {
  console.log('======= 申请调解页面 onLoad =======')
  console.log('完整options对象:', JSON.stringify(options))

  // 检查options是否存在
  if (!options) {
    console.log('没有接收到任何参数')
    console.log('当前selectedMediator值:', formData.value.selectedMediator)
    console.log('======= onLoad 结束 =======')
    return
  }

  // 遍历打印所有参数，确保没有遗漏
  console.log('参数键列表:', Object.keys(options))
  for (const key in options) {
    console.log(`参数[${key}]:`, options[key], '类型:', typeof options[key])
  }

  // 检查是否有mediatorName参数
  if ('mediatorName' in options) {
    console.log('检测到mediatorName参数:', options.mediatorName)

    try {
      // 解码URL编码的调解员姓名
      const mediatorName = decodeURIComponent(options.mediatorName)
      console.log('解码后的调解员姓名:', mediatorName)

      // 更新表单数据
      formData.value.selectedMediator = mediatorName
      console.log('更新后的selectedMediator值:', formData.value.selectedMediator)
    }
    catch (error) {
      console.error('解码调解员姓名失败:', error)
      // 尝试直接使用原始值
      if (options.mediatorName) {
        formData.value.selectedMediator = options.mediatorName
        console.log('使用原始值更新调解员姓名:', options.mediatorName)
      }
    }
  }
  else {
    console.log('未检测到mediatorName参数')
  }

  // 也处理调解员ID，以备后续使用
  if (options.mediatorId) {
    console.log('接收到的调解员ID:', options.mediatorId)
  }

  console.log('======= onLoad 结束 =======')
})

// 处理申请人身份证上传
function uploadIdCard(type: 'front' | 'back') {
  // 这里应该调用uni.chooseImage或其他文件上传API
  // 为了演示，这里使用占位符图片
  const placeholderImage = 'https://via.placeholder.com/200x120?text=申请人身份证'
  if (type === 'front') {
    formData.value.idCardFront = placeholderImage
  }
  else {
    formData.value.idCardBack = placeholderImage
  }
}

// 处理被申请人身份证上传
function uploadRespondentIdCard(type: 'front' | 'back') {
  // 这里应该调用uni.chooseImage或其他文件上传API
  // 为了演示，这里使用占位符图片
  const placeholderImage = 'https://via.placeholder.com/200x120?text=被申请人身份证'
  if (type === 'front') {
    formData.value.respondentIdCardFront = placeholderImage
  }
  else {
    formData.value.respondentIdCardBack = placeholderImage
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
        // 限制上传文件数量不超过5个
        if (formData.value.evidenceFiles.length + res.tempFilePaths.length > 5) {
          uni.showToast({
            title: '最多只能上传5张图片',
            icon: 'none',
          })
          return
        }

        // 添加新上传的文件路径
        // 确保tempFilePaths是一个数组
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
  uni.navigateTo({
    url: pagePath,
  })
}

// 处理被申请人案件证据图片上传
function handleRespondentFileUpload() {
  try {
    uni.chooseImage({
      count: 5,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 限制上传文件数量不超过5个
        if (formData.value.respondentEvidenceFiles.length + res.tempFilePaths.length > 5) {
          uni.showToast({
            title: '最多只能上传5张图片',
            icon: 'none',
          })
          return
        }

        // 添加新上传的文件路径
        // 确保tempFilePaths是一个数组
        const filePaths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
        formData.value.respondentEvidenceFiles = [...formData.value.respondentEvidenceFiles, ...filePaths]
      },
    })
  }
  catch (error) {
    console.error('被申请人图片上传失败:', error)
  }
}

// 删除被申请人案件证据图片
function handleRespondentFileRemove(index: number) {
  formData.value.respondentEvidenceFiles.splice(index, 1)
}

// 处理被申请人案件证据PDF上传
function handleRespondentPdfUpload() {
  try {
    // 限制上传文件数量不超过5个
    if (formData.value.respondentPdfFiles.length >= 5) {
      uni.showToast({
        title: '最多只能上传5个PDF文件',
        icon: 'none',
      })
      return
    }

    // #ifdef MP-WEIXIN
    // 微信小程序环境下使用 chooseMessageFile API
    uni.chooseMessageFile({
      count: 1, // 一次选择一个文件
      type: 'file',
      extension: ['pdf'],
      success: (res) => {
        const file = res.tempFiles[0]
        // 检查是否是PDF文件
        if (!file.name.endsWith('.pdf')) {
          uni.showToast({
            title: '请选择PDF格式文件',
            icon: 'none',
          })
          return
        }

        // 添加新上传的文件路径
        formData.value.respondentPdfFiles.push(file.path)
      },
      fail: (err) => {
        console.error('选择PDF文件失败:', err)
      },
    })
    // #endif

    // #ifndef MP-WEIXIN
    // 非微信小程序环境下使用 chooseFile API
    // 由于是演示环境，这里简化处理
    uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        // 这里使用图片选择器作为替代，实际项目中应该使用文件选择器
        // 但为了演示，我们假设选择的是PDF文件
        formData.value.respondentPdfFiles.push(res.tempFilePaths[0])
      },
      fail: (err) => {
        console.error('选择文件失败:', err)
      },
    })
    // #endif
  }
  catch (error) {
    console.error('被申请人PDF上传失败:', error)
    uni.showToast({
      title: '上传失败，请重试',
      icon: 'none',
    })
  }
}

// 删除被申请人案件证据PDF
function handleRespondentPdfRemove(index: number) {
  formData.value.respondentPdfFiles.splice(index, 1)
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

// 模拟案件调解成功时间 - 实际应用中应从后端获取
const mockMediationSuccessTime = ref<string>('')

// 提交调解申请
function submitMediationRequest() {
  if (!validateForm()) {
    return
  }

  // 检查提交时间是否晚于调解成功时间
  if (mockMediationSuccessTime.value) {
    const now = new Date().getTime()
    const mediationSuccessTime = new Date(mockMediationSuccessTime.value).getTime()

    if (now > mediationSuccessTime) {
      uni.showToast({
        title: '案件提交时间不能晚于调解成功时间',
        icon: 'none',
      })
      return
    }
  }

  try {
    // 这里应该是实际的API调用，现在用模拟数据代替
    console.log('提交申请调解数据:', formData.value)

    // 显示提交成功提示
    uni.showToast({
      title: '调解申请提交成功',
      icon: 'success',
      duration: 2000,
      complete: () => {
        // 成功后返回上一页
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      },
    })
  }
  catch (error) {
    console.error('提交调解申请失败:', error)
    uni.showToast({
      title: '提交失败，请稍后重试',
      icon: 'none',
    })
  }
}

// 撤销案件
function handleCancelCase() {
  uni.showModal({
    title: '撤销案件',
    content: '确定要撤销该案件吗？撤销后将无法恢复。',
    success: (res) => {
      if (res.confirm) {
        try {
          // 这里应该是实际的API调用，现在用模拟数据代替
          console.log('撤销案件:', formData.value)

          // 显示撤销成功提示
          uni.showToast({
            title: '案件已撤销',
            icon: 'success',
            duration: 2000,
            complete: () => {
              // 成功后返回上一页
              setTimeout(() => {
                uni.navigateBack()
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

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="application-mediation-container">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @click="navigateBack">
        <view class="nav-back-icon">
          <image src="/static/images/back.png" mode="aspectFit" />
        </view>
      </view>
      <view class="nav-title">
        申请调解
      </view>
      <view class="nav-right" />
    </view>

    <!-- 表单内容 -->
    <view class="form-content">
      <!-- 申请人信息 -->
      <view class="form-section">
        <view class="section-title">
          申请人信息
        </view>
        <view class="form-item">
          <view class="form-label">
            申请人类型 *
          </view>
          <radio-group v-model="formData.applicantType">
            <view class="radio-item">
              <radio value="natural" />
              <text>自然人</text>
            </view>
            <view class="radio-item">
              <radio value="company" />
              <text>法人/其他组织</text>
            </view>
          </radio-group>
        </view>
        <view class="form-item">
          <view class="form-label">
            申请人姓名 *
          </view>
          <input v-model="formData.applicantName" class="form-input" type="text" placeholder="请输入姓名">
        </view>
        <view class="form-item">
          <view class="form-label">
            联系电话 *
          </view>
          <input v-model="formData.applicantPhone" class="form-input" type="number" placeholder="请输入联系电话">
        </view>
        <view class="form-item">
          <view class="form-label">
            身份证号码/统一社会信用代码 *
          </view>
          <input v-model="formData.applicantIdCard" class="form-input" type="text" placeholder="请输入身份证号码或统一社会信用代码">
        </view>
        <view class="form-item">
          <view class="form-label">
            地址 *
          </view>
          <input v-model="formData.applicantAddress" class="form-input" type="text" placeholder="请输入地址">
        </view>
        <view class="form-item">
          <view class="form-label">
            案件类型 *
          </view>
          <input v-model="formData.caseType" class="form-input" type="text" placeholder="请输入案件类型">
        </view>
        <view class="form-item">
          <view class="form-label">
            身份证正反面 *
          </view>
          <view class="flex py-2 space-x-4">
            <view class="upload-container" @click="uploadIdCard('front')">
              <image v-if="formData.idCardFront" :src="formData.idCardFront" class="upload-image h-full w-full" mode="aspectFit" />
              <view v-else class="upload-placeholder flex items-center justify-center">
                <text class="upload-text text-xs text-gray-400">点击上传身份证正面</text>
              </view>
            </view>
            <view class="upload-container" @click="uploadIdCard('back')">
              <image v-if="formData.idCardBack" :src="formData.idCardBack" class="upload-image h-full w-full" mode="aspectFit" />
              <view v-else class="upload-placeholder flex items-center justify-center">
                <text class="upload-text text-xs text-gray-400">点击上传身份证反面</text>
              </view>
            </view>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            是否需要代理人
          </view>
          <switch v-model="formData.needAgent" />
        </view>
      </view>

      <!-- 被申请人信息 -->
      <view class="form-section">
        <view class="section-title">
          被申请人信息
        </view>
        <view class="form-item">
          <view class="form-label">
            被申请人类型 *
          </view>
          <radio-group v-model="formData.respondentType">
            <view class="radio-item">
              <radio value="natural" />
              <text>自然人</text>
            </view>
            <view class="radio-item">
              <radio value="company" />
              <text>法人/其他组织</text>
            </view>
          </radio-group>
        </view>
        <view class="form-item">
          <view class="form-label">
            被申请人姓名 *
          </view>
          <input v-model="formData.respondentName" class="form-input" type="text" placeholder="请输入姓名">
        </view>
        <view class="form-item">
          <view class="form-label">
            联系电话 *
          </view>
          <input v-model="formData.respondentPhone" class="form-input" type="number" placeholder="请输入联系电话">
        </view>
        <view class="form-item">
          <view class="form-label">
            身份证号码/统一社会信用代码
          </view>
          <input v-model="formData.respondentIdCard" class="form-input" type="text" placeholder="请输入身份证号码或统一社会信用代码">
        </view>
        <view class="form-item">
          <view class="form-label">
            电子邮箱
          </view>
          <input v-model="formData.respondentEmail" class="form-input" type="text" placeholder="请输入电子邮箱">
        </view>
        <view class="form-item">
          <view class="form-label">
            地址 *
          </view>
          <input v-model="formData.respondentAddress" class="form-input" type="text" placeholder="请输入地址">
        </view>
        <view class="form-item">
          <view class="form-label">
            案件类型 *
          </view>
          <input v-model="formData.respondentCaseType" class="form-input" type="text" placeholder="请输入案件类型">
        </view>
        <view class="form-item">
          <view class="form-label">
            身份证正反面 *
          </view>
          <view class="flex py-2 space-x-4">
            <view class="upload-container" @click="uploadRespondentIdCard('front')">
              <image v-if="formData.respondentIdCardFront" :src="formData.respondentIdCardFront" class="upload-image h-full w-full" mode="aspectFit" />
              <view v-else class="upload-placeholder flex items-center justify-center">
                <text class="upload-text text-xs text-gray-400">点击上传身份证正面</text>
              </view>
            </view>
            <view class="upload-container" @click="uploadRespondentIdCard('back')">
              <image v-if="formData.respondentIdCardBack" :src="formData.respondentIdCardBack" class="upload-image h-full w-full" mode="aspectFit" />
              <view v-else class="upload-placeholder flex items-center justify-center">
                <text class="upload-text text-xs text-gray-400">点击上传身份证反面</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 被申请人案件证据 -->
        <view class="form-item">
          <view class="form-label">
            被申请人案件证据：
          </view>

          <!-- 图片上传 -->
          <view class="file-upload-container">
            <view class="section-subtitle">
              图片上传
            </view>
            <!-- 上传按钮 -->
            <view v-if="formData.respondentEvidenceFiles.length < 5" class="upload-btn" @click="handleRespondentFileUpload">
              <view class="upload-icon">
                +
              </view>
              <text class="upload-text">上传图片</text>
            </view>

            <!-- 已上传的图片 -->
            <view v-for="(file, index) in formData.respondentEvidenceFiles" :key="index" class="file-item">
              <image class="file-image" :src="file" mode="aspectFill" />
              <view class="file-remove" @click="handleRespondentFileRemove(index)">
                ×
              </view>
            </view>
          </view>
          <text class="file-tip">最多可上传5张图片，支持jpg、png格式</text>

          <!-- PDF文件上传 -->
          <view class="file-upload-container mt-4">
            <view class="section-subtitle">
              PDF文件上传
            </view>
            <!-- 上传按钮 -->
            <view v-if="formData.respondentPdfFiles.length < 5" class="upload-btn" @click="handleRespondentPdfUpload">
              <view class="upload-icon">
                +
              </view>
              <text class="upload-text">上传PDF</text>
            </view>

            <!-- 已上传的PDF文件 -->
            <view v-for="(file, index) in formData.respondentPdfFiles" :key="index" class="file-item">
              <view class="pdf-icon">
                PDF
              </view>
              <text class="pdf-name">{{ file.split('/').pop() }}</text>
              <view class="file-remove" @click="handleRespondentPdfRemove(index)">
                ×
              </view>
            </view>
          </view>
          <text class="file-tip">最多可上传5个PDF文件</text>
        </view>

        <!-- 调解请求 -->
        <view class="form-item">
          <view class="form-label">
            调解请求 *
          </view>
          <textarea v-model="formData.mediationRequest" class="form-textarea" placeholder="请输入调解请求，例如：\n1、请求被申请人归还（支付）申请人借款（欠款、贷款、赔偿款）xxx元；\n2、本案调解费由被申请人负担。" rows="4" />
        </view>
      </view>

      <!-- 事实与理由 -->
      <view class="form-section">
        <view class="section-title">
          事实与理由
        </view>
        <view class="form-item">
          <textarea v-model="formData.factReason" class="form-textarea" placeholder="请输入事实与理由（若您的事实与理由字数超过500字，请以PDF文件的形式上传证据文件中，并在此处备注）" style="height: 150px;" />
        </view>
        <view class="form-item">
          <view class="form-label">
            证据文件
          </view>
          <view class="file-upload-container">
            <!-- 上传按钮 -->
            <view v-if="formData.evidenceFiles.length < 5" class="upload-btn" @click="handleFileUpload">
              <view class="upload-icon">
                +
              </view>
              <text class="upload-text">上传证据文件</text>
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
        <view class="form-item">
          <view class="form-label">
            选择您的调解员：
          </view>
          <view class="mediator-selection">
            <radio-group v-model="formData.mediatorSelection">
              <view class="radio-item">
                <radio value="system" />系统指定
              </view>
              <view class="radio-item">
                <radio value="online" />在线选择
              </view>
            </radio-group>
          </view>
          <view class="form-label">
            请选择你是否需要免费调解员还是收费调解员
          </view>
          <radio-group v-model="formData.mediatorFeeType">
            <view class="radio-item">
              <radio value="free" />是
            </view>
            <view class="radio-item">
              <radio value="paid" />否
            </view>
          </radio-group>
        </view>
        <view class="form-item">
          <view class="form-label">
            标底金额（单位：元） *
          </view>
          <input v-model="formData.claimAmount" class="form-input" type="number" placeholder="例如：100">
        </view>
      </view>
      <!-- 协议同意 -->
      <view class="form-section">
        <view class="section-title">
          协议同意
        </view>
        <view class="form-item">
          <checkbox-group v-model="formData.agreeAgreement">
            <label class="checkbox-item">
              <checkbox value="true" />
              <text>我同意将本纠纷提交即调法律服务平台进行调解处理，调解成功的我同意将本纠纷最终调解协议送仲裁委员会制作调解书，调解书的效力由仲委员会根据《仲裁法》《网络仲裁规则》《仲裁委员会网络仲裁暂行规则》进行网络仲裁确认并加盖仲裁委员会电子印章送达。本协议视为我已将本人住所地址送达方式为准，短信发送或邮寄送达即视为送达。</text>
            </label>
          </checkbox-group>
        </view>
        <view class="form-item">
          <checkbox-group v-model="formData.agreePrivacy">
            <label class="checkbox-item flex-wrap">
              <checkbox value="true" />
              <text>我同意即调法律服务平台使用我所提供的信息，查看</text>
              <text class="agreement-link" @click="navigateToAgreement('user')">《用户服务协议》</text>
              <text>和</text>
              <text class="agreement-link" @click="navigateToAgreement('privacy')">《个人信息保护隐私政策》</text>
            </label>
          </checkbox-group>
        </view>
      </view>

      <!-- 操作按钮容器 -->
      <view class="buttons-container">
        <!-- 提交按钮 -->
        <button class="submit-btn" @click="submitMediationRequest">
          提交申请
        </button>

        <!-- 撤销案件按钮 -->
        <button class="cancel-btn" @click="handleCancelCase">
          撤销案件
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.application-mediation-container {
  min-height: 100vh;
  background-color: #f5f5f5;

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    background-color: #fff;
    padding: 0 16px;
    border-bottom: 1px solid #eee;

    .nav-back {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-back-icon {
        width: 20px;
        height: 20px;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .nav-title {
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }

    .nav-right {
      width: 44px;
    }
  }

  .form-content {
    padding: 16px;
    background-color: #f5f5f5;
  }

  .form-section {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
  }

  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #f9f9f9;
  }

  .form-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .form-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 12px;
    font-size: 14px;
    color: #333;
  }

  .form-textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
    color: #333;
    resize: none;
  }

  .radio-group {
    display: flex;
    flex-wrap: wrap;
  }

  .radio-item {
    display: flex;
    align-items: center;
    margin-right: 24px;
    margin-bottom: 8px;

    text {
      font-size: 14px;
      color: #333;
      margin-left: 6px;
    }
  }

  .upload-container {
    width: calc(50% - 8px);
    height: 120px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .upload-image {
      width: 100%;
      height: 100%;
    }

    .upload-placeholder {
      width: 100%;
      height: 100%;
      background-color: #f9f9f9;
    }
  }

  .file-upload-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .upload-btn {
    width: 100px;
    height: 100px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .upload-icon {
      font-size: 32px;
      color: #999;
      margin-bottom: 4px;
    }

    .upload-text {
      font-size: 12px;
      color: #999;
    }
  }

  .file-item {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .file-image {
      width: 100%;
      height: 100%;
    }

    .pdf-icon {
      width: 100%;
      height: 60px;
      background-color: #ff6b6b;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }

    .pdf-name {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #666;
      padding: 0 4px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: #f9f9f9;
    }

    .file-remove {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 24px;
      height: 24px;
      background-color: #ff3b30;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .file-tip {
    display: block;
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }

  .mediator-selection {
    margin-bottom: 12px;
  }

  .selected-mediator {
    font-size: 14px;
    color: #666;
    padding: 8px 12px;
    background-color: #f0f9ff;
    border-radius: 4px;

    .mediator-name {
      color: #1989fa;
      font-weight: 500;
    }
  }

  .checkbox-group {
    width: 100%;
  }

  .checkbox-item {
    display: flex;
    align-items: flex-start;
    width: 100%;
    flex-wrap: wrap;

    text {
      font-size: 14px;
      color: #666;
      margin-left: 8px;
      flex: 1;
      line-height: 20px;
    }
  }

  .agreement-link {
    color: #1989fa;
    text-decoration: underline;
    padding: 0 4px;
  }

  .submit-btn-container {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .buttons-container {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .submit-btn {
    width: 100%;
    height: 44px;
    background-color: #1989fa;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
  }

  .cancel-btn {
    width: 100%;
    height: 44px;
    background-color: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .section-subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    width: 100%;
  }
}
</style>
