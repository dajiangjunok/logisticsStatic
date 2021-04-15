<template>
  <!-- 收款方小卡片 -->
  <div class="pay-card">
    <div class="line">
      <span>收款方备注</span>
      <span>{{payCardInfo.name}}</span>
    </div>
    <div class="line">
      <span>收款币种</span>
      <span>{{payCardInfo.currency}}</span>
    </div>
    <div class="line">
      <span>所在国家或地区</span>
      <span>{{payCardInfo.country}}</span>
    </div>
    <div class="line">
      <span>户名</span>
      <span>{{payCardInfo.user}}</span>
    </div>
    <div class="line">
      <span>账号</span>
      <span style="font-size:12px">{{payCardInfo.code}}</span>
    </div>
    <div class="tab"
         v-show="payCardInfo.isChecked">
      <i class="el-icon-check"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayCard",
  props: {
    /**
      name: '英国物流公司',
      currency: '英镑',
      country: '英国',
      user: 'ABC  LTD',
      code: 'GB32 BARC 2900 1299 3992 12'
     *  */
    payCardInfo: {
      type: Object,
      default: () => ({})
    },
    // isChecked: {
    //   type: Boolean,
    //   default: false
    // }
  }
}
</script>

<style lang="scss" scoped>
.pay-card {
  position: relative;
  padding: 30px 10px 10px 10px;
  width: 240px;
  box-sizing: border-box;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;

  cursor: pointer;
  &:hover {
    border: 1px solid #f4382e;
  }

  .line {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    span:nth-child(1) {
      color: #999;
    }
    span:nth-child(2) {
      color: #333;
    }
  }

  .tab {
    position: absolute;
    width: 50px;
    height: 80px;
    background-color: #f4382e;
    right: -26px;
    bottom: -34px;
    transform: rotate(50deg);

    .el-icon-check {
      position: absolute;
      left: -4px;
      top: 34px;
      transform: rotate(-50deg);

      z-index: 9;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>