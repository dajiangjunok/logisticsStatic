<template>
  <div class="home">
    <div class="home-container">
      <!-- 1.头部 -->
      <div class="header-menu">
        <div class="left">
          <img src="../../assets/img/logo.png"
               alt="logo">
        </div>
        <div class="right">
          <div class="inform">
            <div class="count">6</div>
            <i class="el-icon-message-solid"></i>
          </div>
          <div class="user">
            <el-dropdown>
              <span class="el-dropdown-link">
                <span style="cursor: pointer;">{{$store.state.userName}}</span>
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown"
                                size="medium">
                <el-dropdown-item style="display: flex;
              justify-content: space-between;
              align-items: center;"
                                  disabled>
                  <img :src="$store.state.userImage"
                       style="width:20px; "
                       alt="userImage">
                  <span style="font-size:12px;color:#333;margin-left:4px">{{$store.state.userName}}</span>
                </el-dropdown-item>
                <el-dropdown-item icon="iconfont iconshezhi">编辑</el-dropdown-item>
                <el-dropdown-item icon="iconfont iconqian">支付</el-dropdown-item>
                <el-dropdown-item icon="iconfont icontuichu"
                                  @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
          <img :src="$store.state.userImage"
               class="user-image"
               alt="userImage">
          <!-- <el-button type="primary"
                   @click="emitLogin"> 登 录 </el-button> -->
        </div>
      </div>
      <!-- 2.内容 -->
      <el-row class="content-container">
        <!-- 2.左侧导航 -->
        <el-col :span="5">
          <div class="left-menu">
            <el-menu :default-active="$route.path"
                     :router="true"
                     class="el-menu-vertical-demo">
              <el-menu-item index="/userInfo">
                <span slot="title">用户信息</span>
              </el-menu-item>
              <el-menu-item index="/bankInfo">
                <span slot="title">银行账户绑定</span>
              </el-menu-item>
              <el-menu-item index="/payInfo">
                <span slot="title">收款方管理</span>
              </el-menu-item>
              <!-- <el-submenu index="pay">
                <template slot="title">收款方管理</template>
                <el-menu-item index="/payInfo">收款方详情</el-menu-item>
                <el-menu-item index="/addPayInfo">新增收款方</el-menu-item>
              </el-submenu> -->
              <el-menu-item index="/expressInfo">
                <span slot="title">物流费用支付</span>
              </el-menu-item>
              <!-- <el-submenu index="express">
                <template slot="title">物流费用支付</template>
                <el-menu-item index="/expressInfo">选择收款方</el-menu-item>
                <el-menu-item index="/expressResult">申请结果</el-menu-item>
              </el-submenu> -->
              <el-menu-item index="/payHistory">
                <span slot="title">支付记录查询</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <!-- 3.右侧内容 -->
        <el-col :span="19">
          <div class="right-content">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {}
  },
  methods: {
    // 1.退出
    logout () {
      this.$confirm('是否退出登录?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.replace('/login')
      }).catch(() => { });
    }
  },
  mounted () {

  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #f3f4f5;
  min-height: 100vh;
  .home-container {
    margin: 0 auto;
    max-width: 1000px;

    .el-menu {
      border-right: solid 0px #e6e6e6;
    }
    .header-menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      height: 60px;
      background-color: #f3f4f5;
      /* background-color: pink; */

      .left {
        img {
          height: 50px;
          width: 166px;
        }
      }
      .right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .user-image {
          height: 50px;
          border-radius: 4px;
        }
        .user {
          margin: 0 10px;
        }
        .inform {
          position: relative;
          .count {
            position: absolute;
            right: 0;
            top: 4px;
            border-radius: 50%;
            background-color: red;
            color: #fff;
            width: 12px;
            height: 12px;
            font-size: 12px;
          }
          .el-icon-message-solid {
            font-size: 26px;
            color: #c5c5c5;
          }
        }

        .right-content {
          background-color: #fff;
        }
      }
    }

    .content-container {
      margin-top: 20px;
      text-align: left;

      .left-menu {
        /deep/.el-menu-item {
          font-size: 16px;
        }
        /deep/.el-submenu__title {
          font-size: 16px;
        }
      }

      /deep/.el-menu-item {
        border-left: 4px solid #f3f4f5;
        color: #333;
        background-color: #f3f4f5;
      }
      /deep/.el-submenu__title {
        background-color: #f3f4f5;
      }
      /deep/.el-menu-item:hover {
        /* outline: 0; */
        /* border-left: 4px solid #f4382e; */
        /* background-color: #feebea; */
      }
      /deep/.el-menu-item.is-active {
        border-left: 4px solid #f4382e;
        font-weight: 700;
      }
    }
  }
}
</style>