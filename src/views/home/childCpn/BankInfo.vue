<template>
  <div class="bank-info">
    <!-- 1.没有用户信息时跳转到用户信息 -->
    <el-dialog title=" "
               :show-close="false"
               :close-on-click-modal="false"
               :visible.sync="isUserInfoBlank"
               width="380px"
               style="top:100px;left:150px"
               center>
      <span> 您还未添加用户信息，请完成用户信息 添加后进行银行账户绑定的操作</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="goUserInfo">取 消</el-button>
        <el-button type="primary"
                   @click="goUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 2.有用户信息时候绑定银行卡 -->
    <div class="binding"
         v-if="!isUserInfoBlank&&!isSubscribe">
      <div class="left">
        <div class="title">您已经开立浦发银行账户？</div>
        <div @click="binding"
             class="btn">
          <!-- <img src="../../../assets/img/binding.png"
               alt=""> -->
          <i class="iconfont iconico_yunyingguanli_ruyuanbangdingxinxi"></i>
          <div class="msg">账户绑定</div>
        </div>
      </div>
      <div class="right">
        <div class="title">您还没有浦发银行账户?</div>
        <div @click="subscribe"
             class="btn">
          <!-- <img src="../../../assets/img/card.png"
               alt=""> -->
          <i class="iconfont iconshenfenzheng"></i>
          <div class="msg">预约开户</div>
        </div>
      </div>
    </div>
    <!-- 3.确认绑定弹窗 -->
    <el-dialog title=" "
               :show-close="false"
               :close-on-click-modal="false"
               :visible.sync="isAffirmDialog"
               width="580px"
               class="binding-dialog"
               style="top:100px;left:150px;"
               center>
      <div v-show="!isBindingSuccess"
           style="margin-top:30px">
        <span class="binding-dialog-text">账户绑定前需在浦发银行对公网银“跨境电商会员服务” </span>
        <span class="binding-dialog-text">功能中完成会员帐号绑定，您是否确实已经完成？</span>
        <div class="binding-dialog-btn">
          <el-button @click="isAffirmDialog=false">取 消</el-button>
          <el-button type="primary"
                     @click="submitBinding">确 定</el-button>
        </div>
      </div>
      <!-- <span slot="footer"
            v-show="!isBindingSuccess"
            class="dialog-footer">
        <el-button @click="isAffirmDialog=false">取 消</el-button>
        <el-button type="primary"
                   @click="submitBinding">确 定</el-button>
      </span> -->
      <div v-show="isBindingSuccess"
           class="binding-success">
        <i class="el-icon-success"></i>
        <span class="binding-dialog-text success">您已成功关联银行账户,可正常进行后续操作</span>
        <el-button type="primary"
                   @click="bindingSuccess">我知道了 </el-button>
      </div>

    </el-dialog>
    <!-- 4.预约银行卡 -->
    <BankSubscribe @canback="canback"
                   v-if="isSubscribe" />
  </div>
</template>

<script>
import BankSubscribe from './bankInfoCPN/BankSubscribe'

export default {
  name: 'BankInfo',
  data () {
    return {
      // 是否 用户信息为空
      isUserInfoBlank: true,
      // 是否 弹出确认绑定弹窗
      isAffirmDialog: false,
      // 绑定成功
      isBindingSuccess: false,
      // 是否点击了预约开户
      isSubscribe: false
    }
  },
  methods: {
    // 1.前往用户信息
    goUserInfo () {
      this.$router.push('/userInfo')
    },
    // 2.银行卡绑定用户信息
    binding () {
      this.isAffirmDialog = true
    },
    // 3.确认绑定
    submitBinding () {
      this.isBindingSuccess = true
    },
    // 4.绑定成功
    bindingSuccess () {
      this.isAffirmDialog = false
      this.isBindingSuccess = false
    },
    // 5.预约开户
    subscribe () {
      this.isSubscribe = true
    },
    // 6.返回
    canback () {
      this.isSubscribe = false
    }
  },
  components: {
    BankSubscribe
  },
  created () {
    if (this.$store.state.isUserInfo) {
      this.isUserInfoBlank = false
    }
  }
}
</script>

<style lang="scss" scoped>
.bank-info {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  min-height: 560px;

  .binding {
    padding: 0 180px;
    display: flex;
    justify-content: space-between;
    margin: 180px auto;
    text-align: center;

    .iconfont {
      font-size: 80px;
      cursor: pointer;
      color: #999;
    }

    .btn:hover {
      .iconfont,
      .msg {
        color: #f4382e;
      }
    }

    .title {
      margin-bottom: 20px;
      font-size: 14px;
      color: #999;
    }

    img {
      cursor: pointer;
    }
    .msg {
      margin-top: 10px;
      font-size: 16px;
      color: #999;
      cursor: pointer;
    }
  }

  .binding-dialog {
    text-align: center;

    .binding-dialog-btn {
      margin-top: 20px;
      margin-bottom: 40px;
      text-align: center;
    }
    .binding-dialog-text {
      display: block;
      margin-top: 10px;
      color: #999;
      text-align: center;
    }

    /deep/.el-dialog__body {
      padding: 70px 80px;
    }

    .binding-success {
      text-align: center;
      .el-icon-success {
        font-size: 80px;
        color: #ff5d3d;
      }

      .binding-dialog-text.success {
        padding: 10px 0 20px 0;
        box-sizing: border-box;
      }

      box-sizing: border-box;
    }
  }
}
</style>