<template>
  <div class="header-menu">
    <div class="left">
      <img src="../assets/img/logo.png"
           alt="logo">
    </div>
    <div class="right">
      <div class="about-me">
        <span>关于oranjee</span>
      </div>
      <div class="connect">
        <span>联系我们</span>
      </div>
      <el-button type="primary"
                 @click="emitLogin"> 登 录 </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data () {
    return {

    }
  },
  methods: {
    // 1.发送是否登陆
    emitLogin () {
      this.$emit('showLogin');
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
  height: 60px;
  /* background-color: pink; */

  .left {
    img {
      height: 50px;
      width: 166px;
    }
  }
  .right {
    /* display: flex; */
    div {
      margin-right: 30px;
      display: inline-block;
    }
    span {
      font-family: "SourceHanSansCN";
      font-weight: 500;
      color: #666666;
      line-height: 60px;
      cursor: pointer;
      &:hover {
        color: #999;
      }
    }
  }
}
</style>