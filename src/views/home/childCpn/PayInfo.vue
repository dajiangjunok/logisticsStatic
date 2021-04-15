<template>
  <div class="pay-info">
    <h2 class="title">{{payInfoTitle}}</h2>
    <!-- 1.收款方管理 -->
    <div v-if="!isShowPayInfo&&!isEditPayInfo&&!isAddPayInfo"
         class="pay-manage">
      <el-input prefix-icon="el-icon-search"
                clearable
                v-model="searchInput"
                placeholder="搜索"></el-input>
      <el-table :data="tableData"
                @row-click="tableClick"
                stripe
                class="table-style"
                style="width: 100%; ">
        <el-table-column prop="table1"
                         align="center"
                         width="100"
                         label="收款方名称">
        </el-table-column>
        <el-table-column prop="table2"
                         align="center"
                         width="80"
                         label="收款币种">
        </el-table-column>
        <el-table-column prop="table3"
                         align="center"
                         width="120"
                         label="所在国家或地区">
        </el-table-column>
        <el-table-column prop="table4"
                         align="center"
                         width="110"
                         label="收款账户名称">
        </el-table-column>
        <el-table-column prop="table5"
                         align="center"
                         label="收款账号">
        </el-table-column>
        <el-table-column prop="table6"
                         align="center"
                         width="80"
                         label="审核状态">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     style="text-align: right;"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[1, 4, 10, 50]"
                     :page-size="3"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="100">
      </el-pagination>
      <div style="text-align: center;margin-top:20px;">
        <el-button type="primary"
                   @click="addNew">新增</el-button>
      </div>
    </div>
    <!-- 2.查看收款方详情 -->
    <div class="see-pay-info"
         v-if="isShowPayInfo&&!isEditPayInfo">
      <h3 class="see-pay-info-title">收款方详情</h3>
      <div>
        <div v-for="(item,index) in array"
             :key="index">
          <div class="user-item-container">
            <span>{{item.label}}</span>
            <span class="right-span">{{item.msg}}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="see-pay-info-title">与该收款方的业务合同信息</h3>
        <div v-for="(item,index) in contractArray"
             :key="index">
          <div class="user-item-container">
            <span>{{item.label}}</span>
            <span v-if="item.msg!==false"
                  class="right-span">{{item.msg}}</span>
            <div class="user-img"
                 v-else>
              <img :src="item.img"
                   alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <span>&nbsp;</span>
        <div class="user-img">
          <el-row style="padding:30px 180px;">
            <el-col :span='12'>
              <el-button type="primary"
                         style="width:90%;"
                         @click="editPayInfo">编辑</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="width:90%;"
                         @click="deletePayInfo">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="padding:0 180px;text-align:left">
          <el-button type="text"
                     @click="back">&lt;&lt;返回</el-button>
        </div>

      </div>
    </div>
    <!-- 3.编辑收款方信息 -->
    <div class="edit-pay-info"
         v-if="!isShowPayInfo&&isEditPayInfo">
      <el-row>
        <el-col :span="19">
          <el-form ref="form"
                   style="padding-left:20px"
                   :model="form"
                   label-width="180px"
                   label-position="left">
            <h3 class="edit-pay-info-title">收款方详情</h3>
            <el-form-item label="收款方名称"
                          class="form-first">
              <el-input v-model="form.msg1"
                        placeholder="请输入收款方名称"
                        maxlength="50"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款币种 '">
              <span class="bottom-title">Currency</span>
              <el-select v-model="form.msg2"
                         style="width:100%"
                         placeholder="请选择收款币种">
                <el-option label="人民币"
                           value="renminbi"></el-option>
                <el-option label="美元"
                           value="meiyuan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'所在国家或地区'"
                          class="form-first">
              <span class="bottom-title">Country or Region</span>
              <el-select v-model="form.msg3"
                         style="width:100%"
                         placeholder="请选择所在国家或地区">
                <el-option label="中国"
                           value="zhongguo"></el-option>
                <el-option label="美国"
                           value="meiguo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'收款账户名称'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Account Name</span>

              <el-input v-model="form.msg4"
                        placeholder="请输入收款方名称"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款账号'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Account Name</span>
              <el-input v-model="form.msg5"
                        placeholder="请输入收款账号"
                        maxlength="34"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款方地址'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Address</span>

              <el-input v-model="form.msg6"
                        placeholder="请输入收款方地址"
                        maxlength="33"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item :label="'收款银行SWIFT Code'"
                          class="form-first">
              <span class="bottom-title">Bank SWIFT Code</span>

              <el-input v-model="form.msg7"
                        placeholder="请输入 收款银行SWIFT Code"
                        maxlength="11"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item :label="'收款银行SORT Code'"
                          class="form-first">
              <span class="bottom-title">Bank SORT Code</span>

              <el-input v-model="form.msg9"
                        placeholder="请输入收款银行SORT Code"
                        maxlength="6"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款银行名称'"
                          class="form-first">
              <span class="bottom-title">Bank Name</span>

              <el-input v-model="form.msg10"
                        placeholder="请输入收款银行名称"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款银行地址'"
                          class="form-first">
              <span class="bottom-title">Bank Address</span>

              <el-input v-model="form.msg11"
                        placeholder="请输入收款银行地址"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <div>
              <h3 class="edit-pay-info-title">与该收款方的业务合同信息</h3>
              <el-form-item label="合同编号"
                            class="form-first">
                <el-input v-model="form.msg12"
                          placeholder="请输入合同编号"
                          maxlength="66"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="社会统一信用代码有效期">
                <!-- <el-input v-model="form.msg6"
                      placeholder="请输入社会统一信用代码有效期"></el-input> -->
                <el-date-picker v-model="form.msg13"
                                style="width:100%"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="营业执照"
                            style="margin-bottom: 0px">
                <el-row class="upload-file"
                        style="margin-bottom:4px;"
                        v-for="(item,index) in files"
                        :key="index">
                  <el-col :span="24">
                    <el-input v-model="item.name"
                              placeholder="请上传营业执照"></el-input>
                  </el-col>
                  <div class="upload-btn">
                    <input type="file"
                           @change="fileChange('payLoadFileEditRef'+index,index)"
                           v-show="false"
                           :ref="'payLoadFileEditRef'+index">
                    <el-button @click="upload('payLoadFileEditRef'+index)">选择</el-button>
                    <i class="el-icon-close"
                       @click="deleteFile(index)"
                       style="font-size:22px;color:#F4382E;margin-left:10px;cursor: pointer;"></i>
                  </div>
                </el-row>
              </el-form-item>
            </div>
            <el-form-item label=" "
                          style="margin-bottom: 0px">
              <el-button type="text"
                         @click="addAgain">+ 继续添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width:150px"
                         @click="onSubmitUser">提交</el-button>
              <el-button style="width:150px"
                         @click="editBack">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- 4.新增收款方信息 -->
    <div class="add-pay-info"
         v-if="!isShowPayInfo&&!isEditPayInfo&&isAddPayInfo">
      <el-row>
        <el-col :span="19">
          <el-form ref="form"
                   style="padding-left:20px"
                   :model="form"
                   label-width="180px"
                   label-position="left">
            <h3 class="edit-pay-info-title">填写收款方账户信息</h3>
            <el-form-item label="收款方备注"
                          class="form-first">
              <div class="form-first-div">
                <span> <i class="el-icon-question"
                     @mouseleave="iconMouseleave"
                     @mouseenter="iconMouseenter"></i>
                  <i :class="[isShowMark?'hide':'','font-normal']">可通过该栏位对收款方</i></span>
                <span :class="isShowMark?'hide':''">进行自定义或个性化备</span>
                <span :class="isShowMark?'hide':''">注，以便您识别该收款方。</span>
              </div>
              <el-input v-model="form.msg1"
                        placeholder="请输入收款方名称"
                        maxlength="50"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款币种 '">
              <span class="bottom-title">Currency</span>
              <el-select v-model="form.msg2"
                         style="width:100%"
                         placeholder="请选择收款币种">
                <el-option label="人民币"
                           value="renminbi"></el-option>
                <el-option label="美元"
                           value="meiyuan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'所在国家或地区'"
                          class="form-first">
              <span class="bottom-title">Country or Region</span>
              <el-select v-model="form.msg3"
                         style="width:100%"
                         placeholder="请选择所在国家或地区">
                <el-option label="中国"
                           value="zhongguo"></el-option>
                <el-option label="美国"
                           value="meiguo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'收款账户名称'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Account Name</span>

              <el-input v-model="form.msg4"
                        placeholder="请输入收款方名称"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款账号'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Account Name</span>
              <el-input v-model="form.msg5"
                        placeholder="请输入收款账号"
                        maxlength="34"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款方地址'"
                          class="form-first">
              <span class="bottom-title">Beneficiary’s Address</span>

              <el-input v-model="form.msg6"
                        placeholder="请输入收款方地址"
                        maxlength="33"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item :label="'收款银行SWIFT Code'"
                          class="form-first">
              <span class="bottom-title">Bank SWIFT Code</span>

              <el-input v-model="form.msg7"
                        placeholder="请输入 收款银行SWIFT Code"
                        maxlength="11"
                        show-word-limit></el-input>
            </el-form-item>

            <el-form-item :label="'收款银行SORT Code'"
                          class="form-first">
              <span class="bottom-title">Bank SORT Code</span>

              <el-input v-model="form.msg9"
                        placeholder="请输入收款银行SORT Code"
                        maxlength="6"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款银行名称'"
                          class="form-first">
              <span class="bottom-title">Bank Name</span>

              <el-input v-model="form.msg10"
                        placeholder="请输入收款银行名称"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="'收款银行地址'"
                          class="form-first">
              <span class="bottom-title">Bank Address</span>

              <el-input v-model="form.msg11"
                        placeholder="请输入收款银行地址"
                        maxlength="66"
                        show-word-limit></el-input>
            </el-form-item>
            <div>
              <h3 class="edit-pay-info-title">与该收款方的业务合同信息</h3>
              <el-form-item label="合同编号"
                            class="form-first">
                <el-input v-model="form.msg12"
                          placeholder="请输入合同编号"
                          maxlength="66"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="社会统一信用代码有效期">
                <!-- <el-input v-model="form.msg6"
                      placeholder="请输入社会统一信用代码有效期"></el-input> -->
                <el-date-picker v-model="form.msg13"
                                style="width:100%"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="营业执照"
                            style="margin-bottom: 0px">
                <el-row class="upload-file"
                        style="margin-bottom:4px;"
                        v-for="(item,index) in files"
                        :key="index">
                  <el-col :span="24">
                    <el-input v-model="item.name"
                              placeholder="请上传营业执照"></el-input>
                  </el-col>
                  <div class="upload-btn">
                    <input type="file"
                           @change="fileChange('payLoadFileEditRef'+index,index)"
                           v-show="false"
                           :ref="'payLoadFileEditRef'+index">
                    <el-button @click="upload('payLoadFileEditRef'+index)">选择</el-button>
                    <i class="el-icon-close"
                       @click="deleteFile(index)"
                       style="font-size:22px;color:#F4382E;margin-left:10px;cursor: pointer;"></i>
                  </div>
                </el-row>
              </el-form-item>
            </div>
            <el-form-item label=" "
                          style="margin-bottom: 0px">
              <el-button type="text"
                         @click="addAgain">+ 继续添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         style="width:150px"
                         @click="addPayInfo">提交</el-button>
              <el-button style="width:150px"
                         @click="addPayBack">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const img = require('../../../assets/img/blank.png')

export default {
  name: "PayInfo",
  data () {
    return {
      payInfoTitle: '收款方管理',
      searchInput: '',
      tableData: [
        {
          table1: '英国物流公司',
          table2: '英镑',
          table3: '英国',
          table4: 'ABCLTD',
          table5: 'GB32 BARC 2900 1299 3992 12 ',
          table6: '待审核',
        }, {
          table1: '英国物流公司',
          table2: '英镑',
          table3: '英国',
          table4: 'ABCLTD',
          table5: 'GB32 BARC 2900 1299 3992 12 ',
          table6: '待审核',
        }, {
          table1: '英国物流公司',
          table2: '英镑',
          table3: '英国',
          table4: 'ABCLTD',
          table5: 'GB32 BARC 2900 1299 3992 12 ',
          table6: '待审核',
        }, {
          table1: '英国物流公司',
          table2: '英镑',
          table3: '英国',
          table4: 'ABCLTD',
          table5: 'GB32 BARC 2900 1299 3992 12 ',
          table6: '待审核',
        }, {
          table1: '英国物流公司',
          table2: '英镑',
          table3: '英国',
          table4: 'ABCLTD',
          table5: 'GB32 BARC 2900 1299 3992 12 ',
          table6: '待审核',
        }
      ],
      currentPage4: 4,
      // 是否是查看收款方详情
      isShowPayInfo: false,
      isEditPayInfo: false,
      isAddPayInfo: false,
      isShowMark: true,
      array: [
        { label: '收款方名称', msg: '英国物流公司' },
        { label: '收款币种', msg: '英镑 GBP' },
        { label: '所在国家或地区', msg: '英国 United Kingdom' },
        { label: '账户户名', msg: 'ABC LTD' },
        { label: '账户账号', msg: 'GB32 BARC 2900 1299 3992 12' },
        { label: '收款方地址', msg: '229 Park Avenue' },
        { label: '收款银行SWIFT Code ', msg: 'BARCGB2' },
        { label: '收款银行SORT Code', msg: '201201' },
        { label: '收款银行名称', msg: 'Barclay Bank' },
        { label: '收款银行地址', msg: 'High Street 4, London, GB ' },
      ],
      contractArray: [
        { label: '合同编号', msg: '576809099000' },
        { label: '合同有效期', msg: '2021/04/18' },
        { label: '合同文档', msg: false, img: img },
        { label: '状态', msg: '待审核' },
      ],
      form: {
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: '',
        msg5: '',
        msg6: '',
        msg7: '',
        msg8: '',
        msg9: '',
        msg10: '',
        msg11: '',
        msg12: '',
      },
      // 上传 图片框数量
      files: [
        {
          name: '',
        },
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    // 点击table项
    tableClick (row, column, event) {
      console.log(row, column, event);
      this.payInfoTitle = '收款方管理  >  查看收款方详情'
      this.isShowPayInfo = true
    },
    // 删除信息
    deletePayInfo () {
      this.$confirm(`您确定要删除该收款信息么?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$alert('该收款信息已删除', '', {
          confirmButtonText: '我知道了',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 返回收款方管理列表页
    back () {
      this.payInfoTitle = '收款方管理'
      this.isShowPayInfo = false
    },
    editBack () {
      this.payInfoTitle = '收款方管理  >  查看收款方详情'
      this.isShowPayInfo = true
      this.isEditPayInfo = false
      this.clearFileList()
    },
    addPayBack () {
      this.payInfoTitle = '收款方管理'
      this.isAddPayInfo = false
      this.clearFileList()
    },
    // 编辑信息
    editPayInfo () {
      this.$confirm(<div><div>编辑修改收款方信息需要重新审核</div>
        <div >您是否确定提交?</div></div>, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'edit-message'
      }).then(() => {
        this.isEditPayInfo = true
        this.isShowPayInfo = false
        this.payInfoTitle = '收款方管理  >  编辑收款方信息'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 新增信息提交
    addPayInfo () {
      this.$alert('新增收款方申请已经提交审核，审核通过后将通过联系人邮箱和短信进行通知。', '', {
        confirmButtonText: '我知道了',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
    // 新增信息
    addNew () {
      this.isEditPayInfo = false
      this.isShowPayInfo = false
      this.isAddPayInfo = true
      this.payInfoTitle = '收款方管理  >  新增收款方信息'
    },

    fileChange (ref, index) {
      // console.log(this.$refs[ref].files);
      // console.log(this.$refs.loadFileRef.files[0].name);
      // this.$set(this.form, 'msg16', this.$refs.loadFileRef.files[0].name)
      // this.files.push({ name: '' })
      this.$set(this.files, index, { name: this.$refs[ref][0].files[0].name })
    },
    addAgain () {
      this.files.push({ name: '' })
      console.log(this.files);
    },
    deleteFile (index) {
      if (this.files.length <= 1) {
        return this.$message.warning('最少保留一份营业执照')
      }
      this.files.splice(index, 1)
    },
    // 2.提交添加用户
    onSubmitUser () {
      this.$confirm(`确认提交收款方信息?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 0.上传文件
    upload (ref) {
      console.log(this.$refs[ref]);
      this.$refs[ref][0].click()
      // console.log(this.$refs.loadFileRef0);
    },
    // 控制？号后面内容显示或隐藏
    iconMouseleave () {
      this.isShowMark = true
    },
    iconMouseenter () {
      this.isShowMark = false
    },
    clearFileList () {
      this.files = [{
        name: ''
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-info {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  min-height: 600px;
  .pay-manage {
    /deep/.el-input__inner {
      background-color: #f5f5f5;
      border: 0px;
    }
  }
  .title {
    font-size: 20px;
    color: #333;
  }

  .table-style {
    min-height: 300px;

    /deep/.el-table .cell {
      font-size: 14px !important;
    }

    /deep/.el-table__body td {
      font-size: 12px !important;
      color: #999 !important;
    }
  }

  .user-item-container {
    display: flex;
    padding: 0 80px;
    span {
      display: inline-block;
      margin: 10px 0;
      margin-left: 100px;
      flex: 1;
      color: #666666;
      font-size: 14px;
    }
    .user-img {
      flex: 1;
      text-align: left;
      /* margin-left: 100px; */
      img {
        height: 118px;
      }
    }

    .right-span {
      margin-left: 0px;
    }
  }
  .see-pay-info-title {
    margin-top: 60px;
    padding: 0 80px;
    margin-left: 100px;
  }
  .edit-pay-info-title {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .btn-container {
    text-align: center;
  }
  .upload-file {
    position: relative;

    .upload-btn {
      position: absolute;
      right: -120px;
    }
  }

  .edit-pay-info,
  .add-pay-info {
    /deep/.el-form-item__label {
      white-space: pre-line;
      line-height: 20px;
      color: #666;
    }

    .form-first {
      position: relative;
      .form-first-div {
        position: absolute;
        z-index: 9;
        right: -170px;
        top: 10px;
        font-size: 12px;
        color: #999999;

        .el-icon-question {
          cursor: pointer;
        }

        span {
          display: block;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
  .bottom-title {
    position: absolute;
    left: -180px;
    top: 8px;
    color: #999;
    font-size: 12px;
  }

  .hide {
    opacity: 0;
  }
  .font-normal {
    font-style: normal;
  }
}
</style>