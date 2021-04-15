<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang='scss'>
#app {
  font-family: SourceHanSansCN, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-width: 1000px;
  background-color: #fff;
  /* height: 100vh; */
  overflow: hidden;
}
.el-dialog {
  border-radius: 10px !important;
  box-shadow: 0px 7px 21px 0px rgba(0, 0, 0, 0.25) !important;
}
.el-message-box__status.el-icon-warning {
  display: none;
}
.el-message-box__message p {
  font-size: 14px !important;
  color: #999 !important;
}
.el-message-box {
  padding: 0 0 20px 0;
  border-radius: 10px !important;
}
.el-message-box__btns {
  text-align: center !important;
}
.el-table::before {
  height: 0 !important;
}

.el-table th > .cell {
  color: #666 !important;
}
.el-message-box__container {
  text-align: center;
}

.edit-message {
  .el-message-box__container {
    color: #999 !important;
  }
  .el-message-box__content {
    padding-top: 36px;
    padding-bottom: 36px;
  }
}
.el-form-item {
  position: relative;
}
</style>
