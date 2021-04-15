<template>
  <div class="express-info">
    <h2 class="title">{{expressInfoTitle}}</h2>
    <!-- 1.物流支付费用 -->
    <div class="express-pay"
         v-if="!isSubmit&&!isSelect">
      <div>
        <span class="small-title">支付信息确认</span>
        <div class="arr1">
          <div v-for="(item,index) in expressPayArray1"
               :key="index">
            <div class="user-item-container">
              <span :style="index==0?{fontWeight:700}:''">{{item.label}}</span>
              <span>{{item.msg}}</span>
            </div>
          </div>
        </div>
        <div class="arr2">
          <div v-for="(item,index) in expressPayArray2"
               :key="index">
            <div class="user-item-container">
              <span>{{item.label}}</span>
              <span>{{item.msg}}</span>
            </div>
          </div>
        </div>
        <div class="arr3">
          <div v-for="(item,index) in expressPayArray3"
               :key="index">
            <div class="user-item-container">
              <span>{{item.label}}</span>
              <span>{{item.msg}}</span>
            </div>
          </div>
        </div>
        <div class="express-pay-img">
          <div class="user-item-container">
            <span>支付凭证</span>
            <div class="user-img">
              <img src="../../../assets/img/blank.png"
                   alt="">
            </div>
          </div>
        </div>
        <div class="password">
          <el-form ref="payForm"
                   style="padding-left:20px"
                   :model="payForm"
                   label-width="180px"
                   label-position="left">
            <el-form-item label="支付密码">
              <el-col :span="18">
                <el-input v-model="payForm.password"
                          type="password"
                          placeholder="请输入支付密码"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="验证码">
              <el-row>
                <el-col :span="18">
                  <el-input v-model="payForm.verificationCode"
                            type="text"
                            maxlength="6"
                            placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button style="margin-left:10px">发送</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="margin-top:20px;width:180px"
                         @click="onSubmitExpress">提交</el-button>
              <el-button style="width:180px">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 2.选择收款方 -->
    <div class="express-pay-select"
         v-if="isSelect&&!isSubmit">
      <el-input prefix-icon="el-icon-search"
                clearable
                v-model="searchInput"
                placeholder="搜索"></el-input>
      <div class="commen-use">
        <h3>常用收款方</h3>
        <div v-for="(item,index) in commenUse"
             @click="cardClick('commenUse',index)"
             class="card-list"
             :key="index">
          <pay-card :payCardInfo="item" />
        </div>
      </div>
      <div class="mine">
        <h3>我的收款方</h3>
        <div v-for="(item,index) in mine"
             @click="cardClick('mine',index)"
             class="card-list"
             :key="index">
          <pay-card :payCardInfo="item" />
        </div>
      </div>

      <div class="next-step">
        <el-button type="primary"
                   @click="nextStep">下一步</el-button>
      </div>
    </div>
    <!-- 3.物流信息提交 -->
    <div v-if="!isSelect&&isSubmit"
         class="submit-express">
      <div>您向 ABC LTD 汇款支付的申请已经提交成功</div>
      <div>申请编号 WH201213002012</div>
      <div>
        <el-button type="primary"
                   @click="seeDetail">查看详情</el-button>
        <el-button @click="backToExpressPay">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PayCard from '../childCpn/expressInfoCPN/PayCard'

export default {
  name: 'ExpressInfo',
  data () {
    return {
      // 是否提交
      isSubmit: false,
      //是否选择收款方
      isSelect: false,
      // 搜索
      searchInput: "",
      expressPayArray1: [
        { label: '汇款金额', msg: '100,000.00 英镑 ' },
        { label: '预计支付人民币', msg: '90,392.00 人民币' },
        { label: '其中，预计汇款手续费', msg: '632.00 人民币' },
      ],
      expressPayArray2: [
        { label: '付款方', msg: 'Shen Zhen FA Logistics Ltd' },
        { label: '付款方地址', msg: '111 Huajia Rd, Bantian, Shenzhen, CHN  ' },
        { label: '付款账户 ', msg: '9801 0128 2990 1929' },
      ],
      expressPayArray3: [
        { label: '收款方名称', msg: '英国物流公司' },
        { label: '收款币种', msg: '英镑 GBP' },
        { label: '所在国家或地区', msg: '英国 United Kingdom' },
        { label: '收款账户名称', msg: ' ABC LTD ' },
        { label: '收款账号', msg: 'GB32 BARC 2900 1299 3992 12' },
        { label: '收款方地址 ', msg: '229 Park Avenue' },
        { label: '企业收款银行SWIFT Code', msg: 'BARCGB22' },
        { label: '收款银行SORT Code', msg: '201201' },
        { label: '收款银行名称', msg: 'Barclay Bank ' },
        { label: '收款银行地址 ', msg: ' High Street 6, London, GB' },
      ],
      payForm: {
        password: '',
        verificationCode: ''
      },
      // 选择常用收款方信息
      commenUse: [
        {
          name: '英国物流公司',
          currency: '英镑',
          country: '英国',
          user: 'ABC  LTD',
          code: 'GB32 BARC 2900 1299 3992 12',
          isChecked: false
        }, {
          name: '英国物流公司',
          currency: '英镑',
          country: '英国',
          user: 'ABC  LTD',
          code: 'GB32 BARC 2900 1299 3992 12',
          isChecked: false
        }
      ],
      mine: [
        {
          name: '英国物流公司',
          currency: '英镑',
          country: '英国',
          user: 'ABC  LTD',
          code: 'GB32 BARC 2900 1299 3992 12',
          isChecked: false
        }, {
          name: '英国物流公司',
          currency: '英镑',
          country: '英国',
          user: 'ABC  LTD',
          code: 'GB32 BARC 2900 1299 3992 12',
          isChecked: false
        }, {
          name: '英国物流公司',
          currency: '英镑',
          country: '英国',
          user: 'ABC  LTD',
          code: 'GB32 BARC 2900 1299 3992 12',
          isChecked: false
        }
      ]
    }
  },
  computed: {
    expressInfoTitle () {
      let title = ''
      if (!this.isSubmit && !this.isSelect) {
        title = '物流费用支付'
      } else if (this.isSelect && !this.isSubmit) {
        title = '物流费用支付  >  选择收款方'
      } else {
        title = '物流费用支付  >  申请结果'
      }
      return title
    }
  },
  methods: {
    // 1.提交
    onSubmitExpress () {
      this.isSelect = true
    },
    // 2.点击查看详情
    seeDetail () {
      this.$router.push('/payHistory?detail=true')
    },
    // 3.点击卡片
    /**
     * type:点击的类型常用收款方列表  还是我的收款方列表
     * index: 列表索引
     */
    cardClick (type, index) {
      if (type === 'commenUse') {
        const currentObj = { ...this.commenUse[index] }
        currentObj.isChecked = true
        this.commenUse.forEach((item, index) => {
          if (item.isChecked) {
            this.$set(this.commenUse, index, { ...this.commenUse[index], isChecked: false })
          }
        })
        this.$set(this.commenUse, index, currentObj)
        this.mine.forEach((item, index) => {
          if (item.isChecked) {
            this.$set(this.mine, index, { ...this.mine[index], isChecked: false })
          }
        })
      } else if (type === 'mine') {
        const currentObj = { ...this.mine[index] }
        currentObj.isChecked = true
        this.mine.forEach((item, index) => {
          if (item.isChecked) {
            this.$set(this.mine, index, { ...this.mine[index], isChecked: false })
          }
        })
        this.$set(this.mine, index, currentObj)
        this.commenUse.forEach((item, index) => {
          if (item.isChecked) {
            this.$set(this.commenUse, index, { ...this.commenUse[index], isChecked: false })
          }
        })
      }
    },
    // 4.点击下一步
    nextStep () {
      this.isSubmit = true
      this.isSelect = false
    },
    // 5.返回到物流支付
    backToExpressPay () {
      this.isSubmit = false
      this.isSelect = false
    }
  },
  components: {
    PayCard
  }
}
</script>

<style lang="scss" scoped>
.express-info {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  min-height: 500px;

  .title {
    font-size: 20px;
    color: #333;
  }
  /* 物流支付 */
  .express-pay {
    .small-title {
      font-size: 14px;
      color: #999;
    }
    .arr1,
    .arr2,
    .arr3,
    .express-pay-img {
      margin: 20px 180px 20px 50px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
    }
    .password {
      margin: 20px 110px 20px 50px;
      padding-bottom: 20px;
    }
    .user-item-container {
      display: flex;

      span {
        display: inline-block;
        margin: 10px 0;
        /* margin-left: 50px; */
        flex: 1;
        color: #666666;
        font-size: 14px;
      }
      span:nth-child(2) {
        margin-left: 0px;
      }
      .user-img {
        flex: 1;
        text-align: left;
        /* margin-left: 100px; */
        img {
          height: 118px;
        }
      }
    }
  }

  /* 物流支付选择 */
  .express-pay-select {
    /deep/.el-input__inner {
      background-color: #f5f5f5;
      border: 0px;
    }

    .commen-use {
      .card-list {
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
    .mine {
      .card-list {
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
    .next-step {
      margin-top: 30px;
      text-align: center;

      /deep/.el-button--primary {
        width: 188px;
      }
    }
  }

  /* 物流支付成功 */
  .submit-express {
    margin: 150px auto;
    div:nth-child(1) {
      margin-bottom: 20px;
      color: #333;
      font-size: 18px;
    }
    div:nth-child(2) {
      margin-bottom: 60px;
      color: #333;
      font-size: 18px;
    }
    & > div {
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>