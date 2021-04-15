<template>
  <div class="page1">
    <div class="left">
      <div class="title">
        <h3>我们让</h3>
        <h3>跨境电商物流支付</h3>
        <h3>不再复杂</h3>
      </div>
      <div class="message">
        <span>我们帮助你成长,坐享跨境出口电商红利期</span>
      </div>
      <div class="btn">
        <el-button type="primary">看看我们的方案</el-button>
      </div>
      <div class="use">
        <el-button round>使用手册</el-button>
      </div>
    </div>
    <div class="right">
      <img src="../../../assets/img/car.jpg"
           alt="car">
    </div>
  </div>
</template>

<script>
// import img from '../../../assets/img/car.png'

export default {
  name: "Page1",
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.page1 {
  display: flex;
  padding-top: 50px;
  margin: 100px auto;
  max-width: 1000px;
  .left {
    flex: 1;
    text-align: left;
    div {
      margin-top: 20px;
    }
    .title {
      h3 {
        margin: 8px 0;
        font-size: 34px;
        color: #333;
        font-weight: 500;
      }
    }
    .message {
      font-size: 18px;
    }
    .btn {
      margin-top: 40px;
    }
    .use {
      margin-top: 60px;
      /deep/.el-button.is-round {
        box-shadow: 0px 7px 29px 0px rgba(0, 0, 0, 0.23);
        border: 0;
      }
    }
  }
  .right {
    flex: 1;

    img {
      width: 600px;
    }
  }
}
</style>