<route>
{
  "style": {
    "navigationBarTitleText": "合同服务",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black"
  }
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 合同模板数据 - 根据用户需求更新为抵押借款合同等文件
const contractTemplates = ref([
  {
    id: '1',
    title: '抵押借款合同.docx',
    views: 6,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/mortgage-loan.docx', // 模拟文件URL
  },
  {
    id: '2',
    title: '二手车买卖合同.docx',
    views: 2,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/used-car-sale.docx', // 模拟文件URL
  },
  {
    id: '3',
    title: '房地产买卖合同.docx',
    views: 3,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/real-estate-sale.docx', // 模拟文件URL
  },
  {
    id: '4',
    title: '房屋赠与合同.docx',
    views: 2,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/house-gift.docx', // 模拟文件URL
  },
  {
    id: '5',
    title: '房屋装修合同.docx',
    views: 1,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/house-decoration.docx', // 模拟文件URL
  },
  {
    id: '6',
    title: '房屋租赁合同.docx',
    views: 5,
    icon: '📄',
    fileType: 'docx',
    fileUrl: 'https://example.com/contracts/house-lease.docx', // 模拟文件URL
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 搜索过滤后的合同列表
const filteredContracts = ref(contractTemplates.value)

// 处理搜索
function handleSearch() {
  if (!searchKeyword.value.trim()) {
    filteredContracts.value = contractTemplates.value
    return
  }

  const keyword = searchKeyword.value.trim().toLowerCase()
  filteredContracts.value = contractTemplates.value.filter(contract =>
    contract.title.toLowerCase().includes(keyword),
  )
}

// 处理查看文档
function handleViewDocument(contract: any) {
  console.log('查看文档:', contract.title)

  // 更新查看次数
  const contractIndex = contractTemplates.value.findIndex(item => item.id === contract.id)
  if (contractIndex !== -1) {
    contractTemplates.value[contractIndex].views++
    // 重新过滤以更新视图
    handleSearch()
  }

  // 显示加载提示
  uni.showLoading({
    title: '加载中...',
  })

  // 由于是模拟环境，我们使用本地文件进行预览
  // 在真实环境中，应该使用contract.fileUrl
  const mockFilePath = '/static/images/banner-contract-service.svg' // 使用项目中已有的文件进行测试预览

  setTimeout(() => {
    // 对于docx等文档，需要先下载到本地再打开
    // 由于是模拟环境，我们直接使用预览功能
    uni.hideLoading()

    // 尝试打开文档预览
    uni.openDocument({
      filePath: mockFilePath,
      showMenu: true,
      success: () => {
        console.log('文档预览成功')
        uni.showToast({
          title: `正在查看: ${contract.title}`,
          icon: 'success',
          duration: 2000,
        })
      },
      fail: (err) => {
        console.error('文档预览失败:', err)

        // 如果直接预览失败，显示模拟预览成功的提示
        // 因为在模拟环境中可能无法实际打开文档
        uni.showToast({
          title: `模拟预览成功: ${contract.title}`,
          icon: 'success',
          duration: 2000,
        })
      },
    })
  }, 1000)

  // 实际项目中应该使用如下代码进行文档预览
  /*
  // 对于docx等文档，需要先下载到本地再打开
  uni.downloadFile({
    url: contract.fileUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.hideLoading()
        uni.openDocument({
          filePath: res.tempFilePath,
          showMenu: true,
          success: () => {
            console.log('文档预览成功')
          },
          fail: (err) => {
            uni.showToast({
              title: '预览失败',
              icon: 'none'
            })
            console.error('文档预览失败:', err)
          }
        })
      } else {
        uni.hideLoading()
        uni.showToast({
          title: '加载文档失败',
          icon: 'none'
        })
      }
    },
    fail: (err) => {
      uni.hideLoading()
      uni.showToast({
        title: '网络错误',
        icon: 'none'
      })
      console.error('下载文档失败:', err)
    }
  })
  */
}

// 处理模板下载
function handleDownload(contract: any, event: any) {
  // 阻止事件冒泡，避免触发查看文档功能
  event.stopPropagation()

  console.log('下载合同:', contract.title)

  // 显示下载中提示
  uni.showLoading({
    title: '下载中...',
  })

  // 模拟下载延迟
  setTimeout(() => {
    // 在真实项目中，这里应该调用uni.downloadFile API进行实际下载
    // 由于是模拟环境，我们直接显示下载成功提示
    uni.hideLoading()

    // 这里添加实际的下载逻辑
    // 由于是模拟环境，我们使用showToast代替实际下载
    uni.showToast({
      title: `下载成功: ${contract.title}`,
      icon: 'success',
      duration: 2000,
    })

    // 实际项目中应该使用如下代码进行下载
    /*
    uni.downloadFile({
      url: contract.fileUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存文件到本地
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: (saveRes) => {
              uni.hideLoading()
              uni.showToast({
                title: '下载成功',
                icon: 'success'
              })
              // 打开文件（可选）
              uni.openDocument({
                filePath: saveRes.savedFilePath,
                showMenu: true
              })
            },
            fail: (err) => {
              uni.hideLoading()
              uni.showToast({
                title: '保存文件失败',
                icon: 'none'
              })
              console.error('保存文件失败:', err)
            }
          })
        } else {
          uni.hideLoading()
          uni.showToast({
            title: '下载失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        console.error('下载失败:', err)
      }
    })
    */
  }, 1500)
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
        合同服务
      </view>
      <view class="header-right" />
    </view>

    <!-- 搜索框 -->
    <view class="search-container">
      <input
        v-model="searchKeyword"
        class="search-input"
        placeholder="合同名称"
        placeholder-style="color: #999;"
        @confirm="handleSearch"
      >
      <button class="search-button" @click="handleSearch">
        搜索
      </button>
    </view>

    <!-- 合同标题 -->
    <view class="section-title">
      合同文库
    </view>

    <!-- 模板列表 -->
    <view class="templates-list">
      <view
        v-for="contract in filteredContracts"
        :key="contract.id"
        class="template-item"
        @click="handleViewDocument(contract)"
      >
        <view class="template-info">
          <view class="template-header">
            <text class="template-icon">{{ contract.icon }}</text>
            <text class="template-title">{{ contract.title }}</text>
          </view>
          <text class="template-views">👁 {{ contract.views }}次查看</text>
        </view>
        <button class="download-button" @click="(e) => handleDownload(contract, e)">
          下载合同
        </button>
      </view>

      <!-- 无结果提示 -->
      <view v-if="filteredContracts.length === 0" class="no-results">
        <text>未找到匹配的合同文件</text>
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

/* 搜索框样式 */
.search-container {
  display: flex;
  padding: 12px 16px;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-input {
  flex: 1;
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 18px;
  padding: 0 16px;
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}

.search-button {
  height: 36px;
  padding: 0 18px;
  background-color: #1989fa;
  color: #ffffff;
  border-radius: 18px;
  font-size: 14px;
  line-height: 36px;
}

/* 标题样式 */
.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  padding: 16px 16px 8px;
}

/* 合同列表样式 */
.templates-list {
  padding: 0 16px 16px;
}

.template-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.template-item:active {
  transform: scale(0.98);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.05);
}

.template-info {
  flex: 1;
  margin-right: 16px;
}

.template-header {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.template-icon {
  font-size: 24px;
  margin-right: 10px;
}

.template-title {
  font-size: 15px;
  color: #333333;
  flex: 1;
}

.template-views {
  display: block;
  font-size: 12px;
  color: #999999;
}

/* 下载按钮样式 - 绿色按钮 */
.download-button {
  background-color: #07c160;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  padding: 6px 16px;
  min-height: 32px;
  line-height: 32px;
}

.download-button:active {
  background-color: #06ad56;
}

/* 无结果样式 */
.no-results {
  text-align: center;
  padding: 40px 0;
  color: #999999;
  font-size: 14px;
}
</style>
