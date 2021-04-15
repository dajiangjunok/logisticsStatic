<template>
  <div class="page2">
    <div class="content">
      <div class="header">
        <h3>我们使用的很愉悦</h3>
      </div>
      <div class="content-child">
        <div class="left">
          <div class="line"></div>
          <h4>完全在线支付</h4>
          <div>
            <span class="title">无需另跑银行网点,节省时间</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>7+24小时实时发起付款</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>在线提交物流支付凭证影像</span>
          </div>
        </div>
        <div class="center">
          <div class="line"></div>
          <h4>快速响应</h4>
          <div>
            <span class="title">款项数小时内即可到达海外合作伙伴</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>支持40多个主流地区</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>最快数分钟即可到达</span>
          </div>
        </div>
        <div class="right">
          <div class="line"></div>
          <h4>资金安全</h4>
          <div>
            <span class="title">浦发银行全程参与</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>浦发银行全程托管</span>
          </div>
          <div class="msg">
            <i class="el-icon-check"></i>
            <span>无任何资金风险</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page2'
}
</script>

<style lang="scss" scoped>
.page2 {
  width: 100vw;
  background-color: #16191f;
  overflow: hidden;

  .content {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;
    height: 400px;

    .header {
      text-align: left;
      h3 {
        margin: 8px 0;
        font-size: 34px;
        color: #fff;
        font-weight: 500;
      }
    }
    .content-child {
      display: flex;
      justify-content: space-between;
      text-align: left;
      margin-top: 100px;
      & > div {
        position: relative;
        border-left: 1px dashed #fff;
        padding-left: 20px;
        height: 200px;
        box-sizing: border-box;

        .line {
          position: absolute;
          top: 10px;
          left: -2px;
          width: 4px;
          height: 30px;
          background-color: red;
        }

        h4 {
          margin: 8px 0;
          color: #fff;
          font-size: 30px;
          font-weight: 400;
        }

        .title {
          display: inline-block;
          margin: 20px 0 50px 0;
          color: #fff;
        }

        .msg span {
          color: #79797b;
        }

        .el-icon-check {
          margin-right: 10px;
          font-size: 28px;
          color: red;
        }
      }

      .right {
        padding-right: 120px;
        box-sizing: border-box;
        border-right: 1px dashed #fff;
      }
    }
  }
}
</style>