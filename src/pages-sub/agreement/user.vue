<script setup lang="ts">
// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '用户服务协议',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
  },
})
</script>

<template>
  <view class="agreement-container">
    <view class="agreement-content">
      <view class="agreement-header">
        <text class="agreement-title">调E调法律服务平台用户服务协议</text>
        <text class="agreement-version">版本号：V1.0.0</text>
      </view>

      <view class="agreement-body">
        <section class="agreement-section">
          <h2 class="section-title">
            一、总则
          </h2>
          <p class="section-content">
            本协议是您与调E调法律服务平台（以下简称"平台"）之间关于使用平台提供的法律服务所订立的协议。请您仔细阅读本协议的全部条款，特别是加粗或下划线标注的条款，这些条款可能会明确您应履行的义务或对您的权利有所限制。
          </p>
          <p class="section-content">
            如您不同意本协议的任何内容，您应立即停止注册或使用平台服务。您点击"同意"或"注册"按钮，或通过其他方式实际使用平台服务，即表示您已同意受本协议约束。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            二、服务内容
          </h2>
          <p class="section-content">
            平台提供的主要服务包括但不限于：纠纷调解、仲裁办理、法律咨询、合同服务、案件代理等法律服务。平台有权根据实际情况随时调整所提供的服务内容。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            三、用户注册与认证
          </h2>
          <p class="section-content">
            1. 用户在使用平台服务前，应当按照平台要求完成注册，并提供真实、准确、完整的个人资料。
          </p>
          <p class="section-content">
            2. 为保障服务质量和安全性，用户可能需要进行实名认证，提交身份证明等相关材料。
          </p>
          <p class="section-content">
            3. 用户应妥善保管账号和密码，因账号和密码保管不善造成的损失由用户自行承担。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            四、用户权利与义务
          </h2>
          <p class="section-content">
            1. 用户有权按照平台规则使用平台提供的各项服务。
          </p>
          <p class="section-content">
            2. 用户应遵守国家法律法规，不得利用平台从事任何违法违规活动。
          </p>
          <p class="section-content">
            3. 用户应尊重平台上的其他用户和服务提供者，不得发布侮辱、诽谤、骚扰等不当言论或信息。
          </p>
          <p class="section-content">
            4. 用户应保护个人隐私，不要轻易向他人透露个人信息。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            五、平台权利与义务
          </h2>
          <p class="section-content">
            1. 平台有权对用户提交的资料进行审核，并根据审核结果决定是否提供服务。
          </p>
          <p class="section-content">
            2. 平台有权在必要时修改服务规则和条款，并通过平台公告等方式通知用户。
          </p>
          <p class="section-content">
            3. 平台应采取合理措施保护用户的个人信息和数据安全。
          </p>
          <p class="section-content">
            4. 平台不对用户之间因使用平台服务而产生的纠纷承担责任。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            六、服务费用
          </h2>
          <p class="section-content">
            平台提供的部分服务可能需要收取费用，具体收费标准以平台公布的为准。用户在使用收费服务前应仔细阅读相关收费说明。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            七、协议的修改与终止
          </h2>
          <p class="section-content">
            1. 平台有权在必要时修改本协议，修改后的协议将在平台公布。
          </p>
          <p class="section-content">
            2. 用户有权随时终止使用平台服务，但已产生的服务费用不予退还。
          </p>
          <p class="section-content">
            3. 如用户违反本协议或国家法律法规，平台有权暂停或终止提供服务。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            八、法律适用与争议解决
          </h2>
          <p class="section-content">
            本协议的订立、执行、解释及争议的解决均适用中华人民共和国法律。如双方在本协议履行过程中发生争议，应首先协商解决；协商不成的，任何一方均有权向平台所在地有管辖权的人民法院提起诉讼。
          </p>
        </section>

        <section class="agreement-section">
          <h2 class="section-title">
            九、其他条款
          </h2>
          <p class="section-content">
            本协议自用户点击同意或实际使用平台服务之日起生效。如本协议的任何条款被认定为无效或不可执行，不影响其他条款的效力。
          </p>
        </section>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.agreement-container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.agreement-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.agreement-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.agreement-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.agreement-version {
  font-size: 12px;
  color: #999;
}

.agreement-body {
  line-height: 1.8;
}

.agreement-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.section-content {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-indent: 2em;
}
</style>
