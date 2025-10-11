<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
const pageConfig = {
  style: {
    navigationBarTitleText: '合同模板下载',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black',
  },
}

definePage(pageConfig)

// 合同模板数据
const contractTemplates = ref([
  {
    id: '1',
    title: '劳动合同',
    description: '适用于各类企业与员工签订的劳动合同',
    category: '劳动人事',
    downloads: 1253,
    icon: '👔',
  },
  {
    id: '2',
    title: '租赁合同',
    description: '房屋、商铺、车辆等租赁使用的合同模板',
    category: '房产租赁',
    downloads: 2301,
    icon: '🏠',
  },
  {
    id: '3',
    title: '买卖合同',
    description: '商品、货物买卖交易的标准合同模板',
    category: '商业交易',
    downloads: 1876,
    icon: '🛒',
  },
  {
    id: '4',
    title: '服务合同',
    description: '各类服务提供方与需求方的合同模板',
    category: '商业服务',
    downloads: 1456,
    icon: '💼',
  },
  {
    id: '5',
    title: '借款合同',
    description: '个人或企业间借贷行为的合同模板',
    category: '金融借贷',
    downloads: 987,
    icon: '💰',
  },
  {
    id: '6',
    title: '保密协议',
    description: '保护商业秘密和知识产权的保密协议',
    category: '商业保护',
    downloads: 1634,
    icon: '🔒',
  },
])

// 处理模板下载
function handleDownload(templateId: string) {
  const template = contractTemplates.value.find(item => item.id === templateId)
  if (template) {
    uni.showToast({
      title: `开始下载：${template.title}`,
      icon: 'success',
    })
    // 这里可以添加实际的下载逻辑
  }
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="templates-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        合同模板下载
      </view>
      <view class="header-right" />
    </view>

    <!-- 模板列表 -->
    <view class="templates-list">
      <view
        v-for="template in contractTemplates"
        :key="template.id"
        class="template-item"
      >
        <view class="template-info">
          <view class="template-header">
            <text class="template-icon">{{ template.icon }}</text>
            <view class="template-title-section">
              <text class="template-title">{{ template.title }}</text>
              <text class="template-category">{{ template.category }}</text>
            </view>
          </view>
          <text class="template-description">{{ template.description }}</text>
          <text class="template-downloads">下载次数：{{ template.downloads }}</text>
        </view>
        <button class="download-button" @click="handleDownload(template.id)">
          下载
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.templates-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

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
  flex: 1;
  text-align: center;
}

.templates-list {
  padding: 16px;
}

.template-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-info {
  flex: 1;
  margin-right: 16px;
}

.template-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.template-icon {
  font-size: 24px;
  margin-right: 12px;
}

.template-title-section {
  flex: 1;
}

.template-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 2px;
}

.template-category {
  display: block;
  font-size: 12px;
  color: #1989fa;
  background-color: #e8f4ff;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
}

.template-description {
  display: block;
  font-size: 14px;
  color: #666666;
  line-height: 1.4;
  margin-bottom: 8px;
}

.template-downloads {
  display: block;
  font-size: 12px;
  color: #999999;
}

.download-button {
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  padding: 8px 16px;
  min-height: 36px;
  line-height: 36px;
}
</style>
