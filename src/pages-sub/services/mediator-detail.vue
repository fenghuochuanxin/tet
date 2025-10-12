<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const mediator = ref<Mediator>({
  id: '',
  name: '',
  avatar: '',
  title: '',
  organization: '',
  expertise: [],
  rating: 0,
  cases: 0,
  successRate: 0,
  experience: '',
  education: '',
  description: '',
  certificates: [],
})

// 页面加载时获取调解员数据
function onLoad(options: any) {
  if (options && options.id) {
    const mediatorId = options.id
    // 这里应该从API或store获取真实数据
    // 现在使用模拟数据
    loadMediatorData(mediatorId)
  }
}

// 加载调解员数据（模拟）
function loadMediatorData(id: string) {
  // 模拟数据，实际项目中应该从API获取
  const mockMediators: Record<string, Mediator> = {
    1: {
      id: '1',
      name: '李明',
      avatar: '/static/images/avatar1.svg',
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
    2: {
      id: '2',
      name: '张华',
      avatar: '/static/images/avatar2.svg',
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
    3: {
      id: '3',
      name: '王芳',
      avatar: '/static/images/avatar3.svg',
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
    4: {
      id: '4',
      name: '刘强',
      avatar: '/static/images/avatar4.svg',
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
    5: {
      id: '5',
      name: '赵敏',
      avatar: '/static/images/avatar5.svg',
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
  }

  // 如果找不到对应ID的调解员，则使用默认数据
  mediator.value = mockMediators[id] || {
    id: 'default',
    name: '未知调解员',
    avatar: '/static/images/avatar_default.svg',
    title: '调解员',
    organization: '未知机构',
    expertise: ['未知领域'],
    rating: 0,
    cases: 0,
    successRate: 0,
    experience: '暂无相关信息',
    education: '暂无相关信息',
    description: '暂无相关信息',
    certificates: [],
  }
}

// 返回上一页
function navigateBack() {
  router.back()
}

// 预约调解
function handleBookMediation() {
  uni.showToast({
    title: '预约调解成功，我们会尽快联系您',
    icon: 'success',
    duration: 2000,
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
      <view class="header-right" />
    </view>

    <!-- 调解员基本信息 -->
    <view class="mediator-basic-info">
      <image :src="mediator.avatar" alt="{{ mediator.name }}" class="mediator-avatar" />
      <view class="mediator-info">
        <view class="mediator-name-title">
          <text class="mediator-name">{{ mediator.name }}</text>
          <text class="mediator-title">{{ mediator.title }}</text>
        </view>
        <text class="mediator-organization">{{ mediator.organization }}</text>
      </view>
      <view class="mediator-rating">
        <text class="rating-score">{{ mediator.rating }}</text>
        <text class="rating-label">评分</text>
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
        <text class="stat-value">{{ Math.floor(mediator.cases * mediator.successRate / 100) }}</text>
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
          <text class="certificate-text">• {{ cert }}</text>
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
        立即预约调解
      </button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.mediator-detail-container {
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

/* 调解员基本信息 */
.mediator-basic-info {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background-color: #ffffff;
  margin-bottom: 8px;
}

.mediator-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
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
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-right: 8px;
}

.mediator-title {
  font-size: 12px;
  color: #07c160;
  background-color: #f0fdf4;
  padding: 2px 8px;
  border-radius: 10px;
}

.mediator-organization {
  font-size: 14px;
  color: #666666;
}

.mediator-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-score {
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
}

.rating-label {
  font-size: 12px;
  color: #999999;
  margin-top: 4px;
}

/* 调解员统计信息 */
.mediator-stats {
  display: flex;
  background-color: #ffffff;
  margin-bottom: 8px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-right: 1px solid #f0f0f0;
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #999999;
}

/* 通用区块样式 */
.section {
  background-color: #ffffff;
  margin-bottom: 8px;
  padding: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
}

/* 擅长领域 */
.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.expertise-tag {
  padding: 6px 12px;
  background-color: #f0fdf4;
  color: #07c160;
  font-size: 13px;
  border-radius: 16px;
}

/* 个人简介、教育背景、调解经验 */
.profile-content,
.education-content,
.experience-content {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

/* 专业资质 */
.certificates-list {
  padding-left: 8px;
}

.certificate-item {
  margin-bottom: 8px;
}

.certificate-text {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

/* 底部操作按钮 */
.bottom-actions {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
}

.book-button {
  width: 100%;
  height: 44px;
  background-color: #07c160;
  color: #ffffff;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
