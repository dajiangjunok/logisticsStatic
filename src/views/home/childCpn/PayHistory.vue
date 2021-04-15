<template>
  <div class="pay-history">
    <h2 class="title">{{payHistoryTitle}}</h2>
    <!-- 1.支付记录查询-->
    <div class="pay-manage"
         v-if="!isSeeDetail">
      <el-row>
        <el-col :span="8">
          <el-input prefix-icon="el-icon-search"
                    clearable
                    v-model="searchInput"
                    placeholder="搜索"></el-input>
        </el-col>
        <el-col :span="14"
                :offset="1">
          <el-date-picker v-model="date"
                          style="width:100%"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-table :data="tableData"
                @row-click="tableClick"
                stripe
                class="table-style"
                style="width: 100%; ">
        <el-table-column prop="table1"
                         align="center"
                         width="120"
                         label="申请编号">
        </el-table-column>
        <el-table-column prop="table2"
                         align="center"
                         label="收款方备注">
        </el-table-column>
        <el-table-column prop="table3"
                         align="center"
                         label="收款方账户名称">
        </el-table-column>
        <el-table-column prop="table4"
                         align="center"
                         width="90"
                         label="申请日期">
        </el-table-column>
        <el-table-column prop="table5"
                         align="center"
                         width="80"
                         label="申请状态">
        </el-table-column>

      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     style="text-align: right;"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1, 4, 10, 50]"
                     :page-size="3"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="100">
      </el-pagination>

    </div>
    <!-- 2.查看支付详情 -->
    <div class="pay-detail"
         v-else>
      <div class="express-pay">
        <div>
          <span class="small-title">支付信息详情</span>
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
          <div class="express-pay-img">
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
              <span>与该付款相关的付款凭证</span>
              <div class="user-img">
                <img src="../../../assets/img/blank.png"
                     alt="">
              </div>
            </div>
          </div>
          <div class="express-pay-img">
            <div class="user-item-container">
              <span>状态</span>
              <span>已汇出</span>
            </div>
          </div>

          <div style="text-align:center;margin-bottom:20px;">
            <el-button style=" width:180px"
                       @click="back">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayHistory',
  data () {
    return {
      // 是否查看详情
      isSeeDetail: false,
      payHistoryTitle: '支付记录查询',
      searchInput: '',
      tableData: [
        {
          table1: 'WH201218002012',
          table2: '比利时物流公司',
          table3: 'Shen Zhen FA Logistics Ltd',
          table4: '2020/12/18',
          table5: '待审核',

        }, {
          table1: 'WH201218002012',
          table2: '英国物流公司',
          table3: 'Shen Zhen FA Logistics Ltd',
          table4: '2020/12/18',
          table5: '待审核',

        }, {
          table1: 'WH201218002012',
          table2: '比利时深圳天发物流公司',
          table3: 'Shen Zhen FA Logistics Ltd',
          table4: '2020/12/18',
          table5: '待审核',

        }, {
          table1: 'WH201218002012',
          table2: '比利时物流公司',
          table3: 'Shen Zhen FA Logistics Ltd',
          table4: '2020/12/18',
          table5: '待审核',

        },
      ],
      currentPage: 4,
      // 日期
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      date: '',
      expressPayArray1: [
        { label: '汇款金额', msg: '100,000.00 英镑 ' },
        { label: '预计支付人民币', msg: '90,392.00 人民币' },
        { label: '其中，预计汇款手续费', msg: '632.00 人民币' },
        { label: '账户', msg: '9801 0128 2990 1929 ' },
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
    }
  },
  methods: {
    // 点击table项
    tableClick (row, column, event) {
      console.log(row, column, event);
      this.isSeeDetail = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    back () {
      this.isSeeDetail = false
    }
  },
  mounted () {
    this.$route.query.detail && (this.isSeeDetail = this.$route.query.detail)
  }
}
</script>

<style lang="scss" scoped>
.pay-history {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  min-height: 600px;

  .title {
    font-size: 20px;
    color: #333;
  }
  .pay-manage {
    /deep/.el-input__inner {
      background-color: #f5f5f5;
      border: 0px;
    }
    /deep/.el-range-editor .el-range-input {
      background: #f5f5f5 !important;
    }
  }
  .table-style {
    min-height: 380px;

    /deep/.el-table .cell {
      font-size: 14px !important;
    }

    /deep/.el-table__body td {
      font-size: 12px !important;
      color: #999 !important;
    }
  }
  /* 物流支付 */
  .express-pay {
    .small-title {
      font-size: 14px;
      color: #999;
    }
    .arr1,
    .arr2,
    .arr3 {
      margin: 20px 180px 20px 50px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
    }

    .express-pay-img {
      margin: 0px 110px 0px 50px;
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
}
</style>