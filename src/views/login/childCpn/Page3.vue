<template>
  <div class="page3">
    <div class="header">
      <h2>我们的合作伙伴</h2>
    </div>
    <div class="content">
      <img src="../../../assets/img/pufa.png"
           alt="pufa">
      <img src="../../../assets/img/baixiao.png"
           alt="pufa">
    </div>
    <div class="footer">
      <img src="../../../assets/img/logo_foot.png"
           alt="pufa">
      <span>关于oranjee</span>
      <span>联系我们</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page3"
}
</script>

<style lang="scss" scoped>
.page3 {
  margin: 100px auto;
  max-width: 1000px;
  height: 270px;
  text-align: left;
  overflow: hidden;
  .header {
    h2 {
      font-size: 30px;
      font-weight: normal;
      color: #333;
    }
  }
  .content {
    img {
      margin-right: 50px;
      height: 30px;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px dashed #ccc;
    img {
      width: 100px;
    }
    span {
      display: inline-block;
      margin: 0 20px;
      font-size: 16px;
      color: #999;
      vertical-align: middle;
      cursor: pointer;
    }
    span:hover {
      color: #333;
    }
  }
}
</style>