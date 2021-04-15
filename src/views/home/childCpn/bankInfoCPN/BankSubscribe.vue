<template>
  <div class="bank-subscribe">
    <div class="subscribe"
         v-show="!isSubscribeSuccess">
      <h2>银行账户绑定 > 浦发银行预约开户</h2>
      <el-row>
        <el-col :span="19">
          <el-form ref="form"
                   style="padding-left:20px"
                   :model="form"
                   label-width="180px"
                   label-position="left">
            <el-form-item label="开立账户性质">
              <el-select v-model="form.msg1"
                         clearable
                         style="width:100%;"
                         placeholder="请选择存款账户">
                <el-option label="基本存款账户"
                           value="jiben"></el-option>
                <el-option label="一般存款账户"
                           value="yiban"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="一般存款账户类型">
              <el-select v-model="form.msg2"
                         clearable
                         style="width:100%;"
                         placeholder="请选择账户类型">
                <el-option label="专用存款账户"
                           value="jiben"></el-option>
                <el-option label="一般存款账户"
                           value="yiban"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基本户开户许可证核准号">
              <el-input v-model="form.msg3"
                        clearable
                        placeholder="请输入开户许可证核准号"></el-input>
            </el-form-item>
            <el-form-item label="基本户开户银行">
              <el-input v-model="form.msg4"
                        clearable
                        placeholder="请输入基本户开户银行"></el-input>
            </el-form-item>
            <el-form-item label="基本户账号">
              <el-input v-model="form.msg5"
                        clearable
                        placeholder="请输入基本户账号"></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width:150px"
                         @click="submit">提交</el-button>
              <el-button style="width:150px"
                         @click="canback">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="subscribe-success"
         v-show="isSubscribeSuccess&&!isSubscribeInfo">
      <h2>银行账户绑定 > 预约结果</h2>
      <div class="subscribe-success-container">
        <div class="line">您向 <span style="color:#F4382E">浦发银行</span> 预约开户申请已经提交成功</div>
        <div class="line">请企业联系人保持电话畅通，以便银行客户经理能及时联系您</div>
        <div class="line id">
          银行预约编号 YY201213002012
        </div>
        <div class="line">
          <el-button type="primary"
                     @click="getInfo">我知道了</el-button>
        </div>
      </div>
    </div>
    <div class="subscribe-info"
         v-show="isSubscribeSuccess&&isSubscribeInfo">
      <h2>银行账户绑定 > 预约信息</h2>
      <div class="subscribe-info-container">
        <div v-for="(item,index) in subscribeInfo"
             class="subscribe-line"
             :key="index">
          <span>{{item.name}}</span>
          <span>{{item.msg}}</span>
        </div>
        <div class="line"
             style="text-align: center;">
          <el-button type="primary"
                     @click="over">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankSubscribe",
  data () {
    return {
      form: {
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: '',
        msg5: '',
      },
      isSubscribeSuccess: false,
      // 是否显示预约结果后的信息
      isSubscribeInfo: false,
      subscribeInfo: [
        { name: '银行预约编码', msg: 'YY201213002012' },
        { name: '预约事项', msg: '开立一般户' },
        { name: '预约状态', msg: '正常' },
      ]
    }
  },
  methods: {
    // 1.提交预约
    submit () {
      this.isSubscribeSuccess = true
    },
    // 2.返回
    canback () {
      this.$emit('canback')
    },
    // 3.点击我知道了
    getInfo () {
      this.isSubscribeInfo = true
    },
    // 4.点击返回
    over () {
      this.isSubscribeSuccess = false
      this.canback()
    },

  }
}
</script>

<style lang="scss" scoped>
.bank-subscribe {
  padding: 0 10px;
  /* background-color: pink; */
  color: #333;

  .subscribe-success {
    .subscribe-success-container {
      padding: 100px 0 0 0px;
      text-align: center;
      color: #333333;
      font-size: 18px;

      .line {
        margin-bottom: 24px;
      }
      .line.id {
        font-size: 16px;
        color: #999999;
      }
    }
  }

  .subscribe-info {
    .subscribe-info-container {
      /* padding: 100px; */
      margin-top: 100px;
    }

    .subscribe-line {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      color: #999;

      span:nth-child(1) {
        padding-left: 200px;
        flex: 1;
      }
      span:nth-child(2) {
        padding-right: 100px;
        flex: 1;
      }
    }
    /deep/.el-button {
      width: 120px;
    }
  }
}
</style>