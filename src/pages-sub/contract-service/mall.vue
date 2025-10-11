<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义页面配置
const pageConfig = {
  style: {
    navigationBarTitleText: '合同商城',
    navigationBarBackgroundColor: '#ffffff' as `#${string}`,
    navigationBarTextStyle: 'black',
  },
}

definePage(pageConfig)

// 商城商品数据
const products = ref([
  {
    id: '1',
    title: '法律服务套餐',
    description: '包含合同审查、法律咨询等服务',
    price: '¥999',
    image: '/static/images/product1.svg',
  },
  {
    id: '2',
    title: '企业合同模板包',
    description: '30+常用企业合同模板',
    price: '¥299',
    image: '/static/images/product2.svg',
  },
  {
    id: '3',
    title: '合同起草服务',
    description: '专业律师一对一服务',
    price: '¥1500',
    image: '/static/images/product3.svg',
  },
  {
    id: '4',
    title: '法律风险评估',
    description: '企业法律风险全面评估',
    price: '¥2500',
    image: '/static/images/product4.svg',
  },
])

// 处理商品点击
function handleProductClick(productId: string) {
  uni.showToast({
    title: `查看商品详情：${productId}`,
    icon: 'none',
  })
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="mall-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-left" @click="navigateBack">
        <text class="back-icon">←</text>
      </view>
      <view class="header-title">
        合同商城
      </view>
      <view class="header-right" />
    </view>

    <!-- 商品列表 -->
    <view class="products-container">
      <view
        v-for="product in products"
        :key="product.id"
        class="product-item"
        @click="handleProductClick(product.id)"
      >
        <image :src="product.image" class="product-image" mode="aspectFill" />
        <view class="product-info">
          <text class="product-title">{{ product.title }}</text>
          <text class="product-description">{{ product.description }}</text>
          <text class="product-price">{{ product.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.mall-container {
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

.products-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-item {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.product-item:active {
  transform: scale(0.98);
}

.product-image {
  width: 100%;
  height: 120px;
}

.product-info {
  padding: 12px;
}

.product-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 4px;
}

.product-description {
  display: block;
  font-size: 12px;
  color: #666666;
  line-height: 1.4;
  margin-bottom: 8px;
}

.product-price {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
}
</style>
