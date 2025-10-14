<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// getCurrentPages是uni-app全局API，不需要额外导入

const router = useRouter()

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '调解员详情',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})

// 调解员数据
interface Mediator {
  id: string
  name: string
  avatar: string
  title: string
  organization: string
  expertise: string[]
  rating: number
  cases: number
  successRate: number
  experience: string
  education: string
  description: string
  certificates: string[]
}

// 模拟调解员数据（与列表页保持一致）
const mediators = ref<Mediator[]>([
  {
    id: '1',
    name: '李明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming',
    title: '高级调解员',
    organization: '北京市海淀区调解中心',
    expertise: ['合同纠纷', '房产纠纷'],
    rating: 4.9,
    cases: 328,
    successRate: 96.8,
    experience: '拥有15年法律实务经验，专注于合同纠纷和房产纠纷领域的调解工作。曾成功调解多起重大商业合同纠纷，获得当事人的高度评价。',
    education: '北京大学法学硕士',
    description: '李明调解员拥有丰富的调解经验和深厚的法律功底，擅长通过专业的法律知识和灵活的调解技巧，帮助当事人找到双赢的解决方案。',
    certificates: ['高级调解员资格证书', '法律职业资格证书', '心理咨询师证书'],
  },
  {
    id: '2',
    name: '张华',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhanghua',
    title: '资深调解员',
    organization: '上海市浦东新区调解委员会',
    expertise: ['婚姻家庭', '继承纠纷'],
    rating: 4.8,
    cases: 286,
    successRate: 94.5,
    experience: '从事婚姻家庭调解工作12年，擅长处理各种复杂的家庭纠纷，包括离婚财产分割、子女抚养、遗产继承等问题。',
    education: '复旦大学社会学硕士',
    description: '张华调解员擅长倾听当事人的需求，通过耐心细致的沟通，帮助当事人化解矛盾，维护家庭和谐。',
    certificates: ['婚姻家庭咨询师', '调解员资格证书', '心理咨询师证书'],
  },
  {
    id: '3',
    name: '王芳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang',
    title: '专家调解员',
    organization: '广州市天河区人民调解协会',
    expertise: ['劳动争议', '侵权责任'],
    rating: 4.9,
    cases: 412,
    successRate: 97.2,
    experience: '20年劳动法实务经验，曾任某大型企业人力资源总监，熟悉企业用工管理和劳动法律法规，擅长处理各类劳动争议案件。',
    education: '中国政法大学法学博士',
    description: '王芳调解员拥有扎实的法律理论基础和丰富的实践经验，能够准确把握案件关键点，提出切实可行的解决方案。',
    certificates: ['专家调解员资格证书', '劳动法专家', '企业法律顾问'],
  },
  {
    id: '4',
    name: '刘强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuqiang',
    title: '高级调解员',
    organization: '深圳市南山区商事调解中心',
    expertise: ['债务纠纷', '合同纠纷'],
    rating: 4.7,
    cases: 253,
    successRate: 93.7,
    experience: '10年金融法律服务经验，专注于债务纠纷和商事合同纠纷的调解工作，曾在多家银行和金融机构担任法律顾问。',
    education: '深圳大学金融学硕士',
    description: '刘强调解员熟悉金融法律法规和商业运作模式，能够从专业角度为当事人提供合理的解决方案。',
    certificates: ['金融法律顾问', '调解员资格证书', '企业风险管理师'],
  },
  {
    id: '5',
    name: '赵敏',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaomin',
    title: '资深调解员',
    organization: '杭州市西湖区劳动争议调解委员会',
    expertise: ['知识产权', '侵权责任'],
    rating: 4.8,
    cases: 198,
    successRate: 95.1,
    experience: '8年知识产权法律服务经验，专注于商标、专利、著作权等知识产权纠纷的调解工作，曾在某知名律师事务所担任知识产权律师。',
    education: '浙江大学法学硕士',
    description: '赵敏调解员对知识产权法律法规有深入研究，能够为当事人提供专业的法律建议和调解方案。',
    certificates: ['知识产权师', '调解员资格证书', '专利代理人'],
  },
])

const mediator = ref<Mediator>({
  id: 'default',
  name: '调解员',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  title: '调解员',
  organization: '调解中心',
  expertise: ['专业调解'],
  rating: 4.5,
  cases: 100,
  successRate: 90,
  experience: '拥有丰富的调解经验，专注于各类纠纷的解决工作。',
  education: '相关专业背景',
  description: '专业调解员，致力于为当事人提供优质的调解服务。',
  certificates: ['调解员资格证书'],
})

// 页面加载时获取调解员数据
onLoad((options) => {
  console.log('======= onLoad 页面加载 =======')
  console.log('接收到的完整options对象:', JSON.stringify(options))

  // 获取并处理ID参数
  const rawId = options?.id
  console.log('原始ID值:', rawId, '原始类型:', typeof rawId)

  // 转换为字符串并处理undefined/null情况
  const mediatorId = rawId !== undefined && rawId !== null ? String(rawId) : '1'
  console.log('最终使用的调解员ID:', mediatorId, '最终类型:', typeof mediatorId)

  // 立即加载数据
  loadMediatorData(mediatorId)
  console.log('======= onLoad 结束 =======')
})

// 计算成功案例数量
const successCases = computed(() => {
  return Math.floor(mediator.value.cases * mediator.value.successRate / 100)
})

// 生成星级评分
const renderStars = computed(() => {
  const stars = []
  const fullStars = Math.floor(mediator.value.rating)
  const hasHalfStar = mediator.value.rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push('★')
  }

  if (hasHalfStar) {
    stars.push('★')
  }

  const emptyStars = 5 - stars.length
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆')
  }

  return stars.join('')
})

// 加载调解员数据
function loadMediatorData(id: string) {
  console.log('======= loadMediatorData 开始 =======')
  console.log('接收的ID:', id, '类型:', typeof id)

  // 防御性编程：确保mediators数组有效
  if (!mediators.value || !Array.isArray(mediators.value)) {
    console.error('错误: mediators数组无效:', mediators.value)
    return
  }

  console.log('可用的调解员数据总数:', mediators.value.length)
  console.log('所有调解员ID列表:', mediators.value.map(m => m.id).join(', '))

  // 重置mediator数据为默认值，确保每次都是全新开始
  mediator.value = {
    id: 'default',
    name: '加载中...',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=loading',
    title: '加载中...',
    organization: '加载中...',
    expertise: [],
    rating: 0,
    cases: 0,
    successRate: 0,
    experience: '',
    education: '',
    description: '',
    certificates: [],
  }

  // 使用for循环进行严格比较，避免任何可能的比较问题
  let found = false
  for (let i = 0; i < mediators.value.length; i++) {
    const currentMediator = mediators.value[i]
    const currentId = String(currentMediator.id)
    console.log(`比较: 当前调解员ID=${currentId}, 目标ID=${id}, 相等? ${currentId === id}`)

    if (currentId === id) {
      // 深度复制确保完全替换对象引用
      mediator.value = JSON.parse(JSON.stringify(currentMediator))
      console.log('找到匹配的调解员:', currentMediator.name, 'ID:', currentMediator.id)
      found = true
      break
    }
  }

  if (!found) {
    console.warn(`警告: 未找到ID为${id}的调解员数据`)
    // 明确输出当前存在的调解员列表，便于调试
    console.log('当前可用调解员列表:', JSON.stringify(mediators.value.map(m => ({ id: m.id, name: m.name })), null, 2))

    // 如果没有找到，使用默认数据（李明）
    mediator.value = {
      id: '1', // 使用李明作为默认数据
      name: '李明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming',
      title: '高级调解员',
      organization: '北京市海淀区调解中心',
      expertise: ['合同纠纷', '房产纠纷'],
      rating: 4.9,
      cases: 328,
      successRate: 96.8,
      experience: '拥有15年法律实务经验，专注于合同纠纷和房产纠纷领域的调解工作。曾成功调解多起重大商业合同纠纷，获得当事人的高度评价。',
      education: '北京大学法学硕士',
      description: '李明调解员拥有丰富的调解经验和深厚的法律功底，擅长通过专业的法律知识和灵活的调解技巧，帮助当事人找到双赢的解决方案。',
      certificates: ['高级调解员资格证书', '法律职业资格证书', '心理咨询师证书'],
    }
  }

  console.log('最终显示的调解员数据:', mediator.value.name, 'ID:', mediator.value.id)
  console.log('======= loadMediatorData 结束 =======')
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 预约调解
function handleBookMediation() {
  // 使用uni.navigateTo跳转到调解申请表单页面
  uni.navigateTo({
    url: `/pages-sub/1-dispute-mediation/mediation-request?mediatorId=${mediator.value.id}&mediatorName=${encodeURIComponent(mediator.value.name)}`,
    success: () => {
      console.log('成功跳转到调解申请表单页面')
    },
    fail: (error) => {
      console.error('跳转失败:', error)
      uni.showToast({
        title: '跳转失败，请稍后重试',
        icon: 'none',
      })
    },
  })
}
</script>

<template>
  <view class="mediator-detail-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        调解员详情
      </view>
      <view class="header-right">
        <text class="more-icon">...</text>
      </view>
    </view>

    <!-- 调解员基本信息卡片 -->
    <view class="mediator-basic-info">
      <image :src="mediator.avatar" alt="{{ mediator.name }}" class="mediator-avatar" />
      <view class="mediator-info">
        <view class="mediator-name-title">
          <text class="mediator-name">{{ mediator.name }}</text>
          <text class="mediator-title">{{ mediator.title }}</text>
        </view>
        <text class="mediator-organization">{{ mediator.organization }}</text>
        <view class="rating-container">
          <text class="rating-score">{{ mediator.rating }}</text>
          <text class="stars">{{ renderStars }}</text>
        </view>
      </view>
      <view class="bookmarked-badge">
        <text class="bookmarked-text">已实名</text>
      </view>
    </view>

    <!-- 调解员统计信息 -->
    <view class="mediator-stats">
      <view class="stat-item">
        <text class="stat-value">{{ mediator.cases }}</text>
        <text class="stat-label">调解案件</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ mediator.successRate }}%</text>
        <text class="stat-label">成功率</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ successCases }}</text>
        <text class="stat-label">成功案例</text>
      </view>
    </view>

    <!-- 擅长领域 -->
    <view class="section">
      <view class="section-title">
        擅长领域
      </view>
      <view class="expertise-tags">
        <view v-for="field in mediator.expertise" :key="field" class="expertise-tag">
          {{ field }}
        </view>
      </view>
    </view>

    <!-- 个人简介 -->
    <view class="section">
      <view class="section-title">
        个人简介
      </view>
      <view class="profile-content">
        <text class="profile-text">{{ mediator.description }}</text>
      </view>
    </view>

    <!-- 教育背景 -->
    <view class="section">
      <view class="section-title">
        教育背景
      </view>
      <view class="education-content">
        <text class="education-text">{{ mediator.education }}</text>
      </view>
    </view>

    <!-- 专业资质 -->
    <view v-if="mediator.certificates && mediator.certificates.length > 0" class="section">
      <view class="section-title">
        专业资质
      </view>
      <view class="certificates-list">
        <view v-for="(cert, index) in mediator.certificates" :key="index" class="certificate-item">
          <view class="certificate-icon">
            <text class="icon-text">📄</text>
          </view>
          <text class="certificate-text">{{ cert }}</text>
        </view>
      </view>
    </view>

    <!-- 调解经验 -->
    <view class="section">
      <view class="section-title">
        调解经验
      </view>
      <view class="experience-content">
        <text class="experience-text">{{ mediator.experience }}</text>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="bottom-actions">
      <button class="book-button" @click="handleBookMediation">
        去调解
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
// 全局变量
$primary-color: #1e90ff;
$success-color: #07c160;
$warning-color: #ff6b35;
$text-primary: #333333;
$text-secondary: #666666;
$text-tertiary: #999999;
$background-color: #f8f8f8;
$card-background: #ffffff;
$border-color: #f0f0f0;
$shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

.mediator-detail-container {
  min-height: 100vh;
  background-color: $background-color;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 顶部导航栏 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
  background-color: $card-background;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: $shadow;
}

.header-left,
.header-right {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon,
.more-icon {
  font-size: 18px;
  color: $text-primary;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
}

/* 调解员基本信息卡片 */
.mediator-basic-info {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background-color: $card-background;
  margin-bottom: 12px;
  border-radius: 12px;
  margin: 12px;
  box-shadow: $shadow;
  position: relative;
}

.mediator-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  margin-right: 16px;
  border: 3px solid $primary-color;
  box-shadow: 0 4px 12px rgba(30, 144, 255, 0.2);
}

.mediator-info {
  flex: 1;
}

.mediator-name-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.mediator-name {
  font-size: 20px;
  font-weight: 700;
  color: $text-primary;
  margin-right: 8px;
}

.mediator-title {
  font-size: 12px;
  color: $primary-color;
  background-color: rgba(30, 144, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(30, 144, 255, 0.3);
}

.mediator-organization {
  font-size: 14px;
  color: $text-secondary;
  margin-bottom: 8px;
  display: block;
}

.rating-container {
  display: flex;
  align-items: center;
}

.rating-score {
  font-size: 16px;
  font-weight: 600;
  color: $warning-color;
  margin-right: 6px;
}

.stars {
  font-size: 12px;
  color: $warning-color;
  letter-spacing: 1px;
}

.bookmarked-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #fff2e8;
  color: $warning-color;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #ffe4cc;
}

/* 调解员统计信息 */
.mediator-stats {
  display: flex;
  background-color: $card-background;
  margin: 0 12px 12px 12px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: $shadow;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  border-right: 1px solid $border-color;
  transition: all 0.3s ease;
}

.stat-item:last-child {
  border-right: none;
}

.stat-item:active {
  background-color: rgba(30, 144, 255, 0.05);
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: $text-tertiary;
}

/* 通用区块样式 */
.section {
  background-color: $card-background;
  margin: 0 12px 12px 12px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: $shadow;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid $border-color;
}

/* 擅长领域 */
.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.expertise-tag {
  padding: 6px 14px;
  background-color: rgba(30, 144, 255, 0.1);
  color: $primary-color;
  font-size: 13px;
  border-radius: 18px;
  border: 1px solid rgba(30, 144, 255, 0.3);
  transition: all 0.3s ease;
}

.expertise-tag:active {
  background-color: rgba(30, 144, 255, 0.2);
}

/* 个人简介、教育背景、调解经验 */
.profile-content,
.education-content,
.experience-content {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.8;
}

/* 专业资质 */
.certificates-list {
  padding-left: 0;
}

.certificate-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: rgba(30, 144, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(30, 144, 255, 0.2);
}

.certificate-icon {
  margin-right: 8px;
  margin-top: 2px;
}

.icon-text {
  font-size: 14px;
}

.certificate-text {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
  flex: 1;
}

/* 底部操作按钮 */
.bottom-actions {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $card-background;
  padding: 16px 12px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
}

.book-button {
  width: 100%;
  height: 48px;
  background-color: $primary-color;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 24px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
  transition: all 0.3s ease;
}

.book-button:active {
  background-color: #1873cc;
  box-shadow: 0 2px 8px rgba(30, 144, 255, 0.4);
  transform: translateY(1px);
}
</style>
