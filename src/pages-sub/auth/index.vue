<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

// 表单数据
const props = defineProps({
  featureType: String,
})

const userStore = useUserStore()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '实名认证',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

const featureInfo = ref({ title: '', description: '' })

// 功能配置
const featureConfig = {
  'dispute-mediation': {
    title: '纠纷调解',
    description: '为了保障您的权益，请先完成实名认证，以便我们为您提供专业的纠纷调解服务。',
  },
  'arbitration': {
    title: '仲裁办理',
    description: '为了确保仲裁的合法性和有效性，请先完成实名认证，我们将为您提供专业的仲裁服务。',
  },
  'legal-consultation': {
    title: '法律咨询',
    description: '为了提供更精准的法律咨询服务，请先完成实名认证，我们的专业律师将为您解答。',
  },
  'case-representation': {
    title: '案件代理',
    description: '为了更好地代理您的案件，请先完成实名认证，我们将为您匹配最合适的律师。',
  },
}

// 生命周期
onLoad((options: any) => {
  // 优先使用 props 中的 featureType，如果没有则使用 options 中的
  const currentFeatureType = props.featureType || (options && options.featureType)

  if (currentFeatureType) {
    if (featureConfig[currentFeatureType]) {
      featureInfo.value = featureConfig[currentFeatureType]
    }

    // 检查该功能是否已经实名认证
    if (userStore.checkAuthStatus(currentFeatureType)) {
      // 如果已经认证，则直接跳转到二级目录页面
      uni.showToast({
        title: '您已完成该功能的实名认证',
        icon: 'success',
      })

      setTimeout(() => {
        // 根据不同的功能类型跳转到对应的页面
        if (currentFeatureType === 'dispute-mediation') {
          uni.navigateTo({
            url: '/pages-sub/services/dispute-mediation-list',
          })
        }
        else if (currentFeatureType === 'arbitration') {
          uni.navigateTo({
            url: '/pages-sub/services/arbitration-handle',
          })
        }
        else if (currentFeatureType === 'legal-consultation') {
          uni.navigateTo({
            url: '/pages-sub/services/legal-consultation',
          })
        }
        else {
          uni.navigateTo({
            url: '/pages-sub/demo/index',
          })
        }
      }, 1500)
    }
  }
})

// 表单数据
const name = ref('')
const idNumber = ref('')
const agreeTerms = ref(false)

// 表单验证
function validateForm() {
  if (!name.value.trim()) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none',
    })
    return false
  }

  if (!idNumber.value.trim()) {
    uni.showToast({
      title: '请输入身份证号',
      icon: 'none',
    })
    return false
  }

  // 身份证号简单验证 - 移除未使用的捕获组
  const idCardRegex = /^\d{15}$|^\d{18}$|^\d{17}[\dX]$/i
  if (!idCardRegex.test(idNumber.value)) {
    uni.showToast({
      title: '请输入正确的身份证号',
      icon: 'none',
    })
    return false
  }

  // 直接检查agreeTerms变量
  console.log('agreeTerms:', agreeTerms.value)
  if (!agreeTerms.value) {
    uni.showToast({
      title: '请阅读并同意用户协议和隐私政策',
      icon: 'none',
    })
    return false
  }

  return true
}

// 处理实名认证提交
function handleAuthSubmit() {
  if (!validateForm()) {
    return
  }

  handleSimulateLogin()
}

// 模拟登入功能 - 直接认证成功
function handleSimulateLogin() {
  // 模拟填充表单数据（可选，用于演示）
  if (!name.value) {
    name.value = '模拟用户'
  }
  if (!idNumber.value) {
    idNumber.value = '110101199001011234'
  }

  // 这里是模拟的实名认证成功逻辑
  console.log('模拟实名认证成功', {
    name: name.value,
    idNumber: idNumber.value,
    featureType: props.featureType,
  })

  // 模拟认证成功
  uni.showLoading({
    title: '认证中...',
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '实名认证成功',
      icon: 'success',
    })

    // 设置该功能的实名认证状态
    userStore.setAuthStatus(props.featureType)

    // 认证成功后跳转到二级目录页面
    setTimeout(() => {
      // 根据不同的功能类型跳转到对应的页面
      if (props.featureType === 'dispute-mediation') {
        uni.navigateTo({
          url: '/pages-sub/services/dispute-mediation-list',
        })
      }
      else if (props.featureType === 'arbitration') {
        uni.navigateTo({
          url: '/pages-sub/services/arbitration-handle',
        })
      }
      else if (props.featureType === 'legal-consultation') {
        uni.navigateTo({
          url: '/pages-sub/services/legal-consultation',
        })
      }
      else {
        uni.navigateTo({
          url: '/pages-sub/demo/index',
        })
      }
    }, 1500)
  }, 1500)
}

// 查看用户协议
function viewUserAgreement() {
  uni.navigateTo({
    url: '/pages-sub/agreement/user.vue',
  })
}

// 查看隐私政策
function viewPrivacyPolicy() {
  uni.navigateTo({
    url: '/pages-sub/agreement/privacy.vue',
  })
}
</script>

<template>
  <view class="auth-container">
    <view class="auth-header">
      <!-- 调E调图片，居中偏上显示 -->
      <view class="logo-container">
        <image src="/static/images/logo_temp.svg" class="logo-image" mode="aspectFit" />
        <text class="logo-text">调E调</text>
      </view>

      <text class="auth-title">{{ featureInfo.title ? featureInfo.title : '实名认证' }}</text>
      <text v-if="featureInfo.description" class="auth-subtitle">
        {{ featureInfo.description }}
      </text>
    </view>

    <view class="auth-form">
      <view class="form-item">
        <text class="form-label">姓名</text>
        <input
          v-model="name"
          class="form-input"
          type="text"
          placeholder="请输入姓名"
          placeholder-class="placeholder-style"
        >
      </view>

      <view class="form-item">
        <text class="form-label">身份证号</text>
        <input
          v-model="idNumber"
          class="form-input"
          type="text"
          placeholder="请输入身份证号"
          placeholder-class="placeholder-style"
        >
      </view>

      <view class="agreement-item">
        <checkbox
          v-model="agreeTerms"
          class="agreement-checkbox"
        />
        <text class="agreement-text">
          我同意调E调法律平台使用我所提供的信息用于快速登录，查看
          <text class="agreement-link" @click="viewUserAgreement">《用户服务协议》</text>
          和
          <text class="agreement-link" @click="viewPrivacyPolicy">《个人信息保护隐私政策》</text>
        </text>
      </view>

      <button class="submit-button" @click="handleAuthSubmit">
        实名认证
      </button>

      <!-- 模拟登入按钮 -->
      <button class="simulate-button" @click="handleSimulateLogin">
        模拟登入
      </button>
    </view>

    <view class="auth-footer">
      <image src="/static/images/logo.png" class="footer-logo" mode="aspectFit" />
      <text class="footer-text">调E调法律服务平台</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.auth-container {
  padding: 30px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0;
}

.logo-image {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.auth-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
}

.auth-subtitle {
  font-size: 14px;
  color: #666;
  display: block;
  line-height: 1.6;
}

.auth-form {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  margin-bottom: 20px;
  width: 100%;
  max-width: 350px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
}

.form-input {
  width: 100%;
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 14px;
  color: #333;
  background-color: #ffffff;
  box-sizing: border-box;
}

.placeholder-style {
  color: #999;
}

.agreement-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.agreement-checkbox {
  margin-top: 2px;
  margin-right: 8px;
}

.agreement-text {
  flex: 1;
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

.agreement-link {
  color: #1989fa;
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
  margin-bottom: 15px;
}

.simulate-button {
  width: 100%;
  height: 40px;
  background-color: #f0f0f0;
  color: #666666;
  border-radius: 20px;
  font-size: 14px;
  border: none;
}

.auth-footer {
  margin-top: 40px;
  text-align: center;
}

.footer-logo {
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  display: block;
}

.footer-text {
  font-size: 12px;
  color: #999;
}
</style>
