<template>
  <div class="user-info">
    <h2 class="title">{{userInforTitle}}</h2>
    <!-- 1.添加 -->
    <el-row v-show="isAddUserInfo">
      <el-col :span="19">
        <el-form ref="form"
                 style="padding-left:20px"
                 :model="form"
                 label-width="180px"
                 label-position="left">
          <el-form-item label="企业名称"
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
                      placeholder="请输入企业名称"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="经营地址">
            <el-select v-model="form.msg2"
                       style="width:180px;"
                       placeholder="请选择省份">
              <el-option label="广东省"
                         value="guangdong"></el-option>
              <el-option label="安徽省"
                         value="anhui"></el-option>
            </el-select>
            <el-select v-model="form.msg3"
                       style="padding-left:20px;width:180px;"
                       placeholder="请选择城市">
              <el-option label="合肥市"
                         value="hefei"></el-option>
              <el-option label="宣城市"
                         value="xuancheng"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-input v-model="form.msg4"
                      placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码">
            <el-input v-model="form.msg5"
                      placeholder="请输入社会信用代码"
                      maxlength="18"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码有效期">
            <!-- <el-input v-model="form.msg6"
                      placeholder="请输入社会统一信用代码有效期"></el-input> -->
            <el-date-picker v-model="form.msg6"
                            style="width:100%"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="注册资金（万元）">
            <el-input v-model="form.msg7"
                      placeholder="请输入注册资金"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名">
            <el-input v-model="form.msg8"
                      placeholder="请输入法定代表人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件类型">
            <el-input v-model="form.msg9"
                      placeholder="请输入法定代表人证件类型"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件号码">
            <el-input v-model="form.msg10"
                      placeholder="请输入法定代表人证件号码"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人电话">
            <el-input v-model="form.msg11"
                      placeholder="请输入法定代表人电话"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人姓名">
            <el-input v-model="form.msg12"
                      placeholder="请输入企业联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人电话">
            <el-input v-model="form.msg13"
                      placeholder="请输入企业联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人邮箱">
            <el-input v-model="form.msg14"
                      placeholder="请输入企业联系人邮箱"></el-input>
          </el-form-item>
          <el-form-item label="企业网址">
            <el-input v-model="form.msg15"
                      placeholder="请输入企业网址"></el-input>
          </el-form-item>
          <el-form-item label="营业执照"
                        style="margin-bottom: 0px">
            <el-row class="upload-file"
                    v-for="(item,index) in files"
                    :key="index">
              <el-col :span="24"
                      style="margin-bottom:4px;">
                <el-input v-model="item.name"
                          placeholder="请上传营业执照"></el-input>
              </el-col>
              <div class="upload-btn">
                <input type="file"
                       @change="fileChange('loadFileRef'+index,index)"
                       v-show="false"
                       :ref="'loadFileRef'+index">
                <el-button @click="upload('loadFileRef'+index)">上传</el-button>
                <i class="el-icon-close"
                   @click="deleteFile(index)"
                   style="font-size:22px;color:#F4382E;margin-left:10px;cursor: pointer;"></i>
              </div>
            </el-row>
          </el-form-item>
          <el-form-item label=" "
                        style="margin-bottom: 0px">
            <span style="color:#999999;font-size:12px">支持pdf及jpg，png，bmp等图片格式，单个文件大小不得超过10Mb</span>
          </el-form-item>
          <el-form-item label=" "
                        style="margin-bottom: 0px">
            <el-button type="text"
                       @click="addAgain">+ 继续添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:150px"
                       @click="onSubmitUser">提交</el-button>
            <el-button style="width:150px">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 2.修改 -->
    <el-row v-show="!isAddUserInfo&&!userInfoBlank&&!userInfo">
      <el-col :span="19">
        <el-form ref="form"
                 style="padding-left:20px"
                 :model="form"
                 label-width="180px"
                 label-position="left">
          <el-form-item label="企业名称"
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
                      placeholder="请输入企业名称"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="经营地址">
            <el-select v-model="form.msg2"
                       style="width:180px;"
                       placeholder="请选择省份">
              <el-option label="广东省"
                         value="guangdong"></el-option>
              <el-option label="安徽省"
                         value="anhui"></el-option>
            </el-select>
            <el-select v-model="form.msg3"
                       style="padding-left:20px;width:180px;"
                       placeholder="请选择城市">
              <el-option label="合肥市"
                         value="hefei"></el-option>
              <el-option label="宣城市"
                         value="xuancheng"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-input v-model="form.msg4"
                      placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码">
            <el-input v-model="form.msg5"
                      placeholder="请输入社会信用代码"
                      maxlength="18"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码有效期">
            <!-- <el-input v-model="form.msg6"
                      placeholder="请输入社会统一信用代码有效期"></el-input> -->
            <el-date-picker v-model="form.msg6"
                            style="width:100%"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="注册资金（万元）">
            <el-input v-model="form.msg7"
                      placeholder="请输入注册资金"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名">
            <el-input v-model="form.msg8"
                      placeholder="请输入法定代表人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件类型">
            <el-input v-model="form.msg9"
                      placeholder="请输入法定代表人证件类型"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件号码">
            <el-input v-model="form.msg10"
                      placeholder="请输入法定代表人证件号码"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人电话">
            <el-input v-model="form.msg11"
                      placeholder="请输入法定代表人电话"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人姓名">
            <el-input v-model="form.msg12"
                      placeholder="请输入企业联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人电话">
            <el-input v-model="form.msg13"
                      placeholder="请输入企业联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人邮箱">
            <el-input v-model="form.msg14"
                      placeholder="请输入企业联系人邮箱"></el-input>
          </el-form-item>
          <el-form-item label="企业网址">
            <el-input v-model="form.msg15"
                      placeholder="请输入企业网址"></el-input>
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
                       @change="fileChange('loadFileEditRef'+index,index)"
                       v-show="false"
                       :ref="'loadFileEditRef'+index">
                <el-button @click="upload('loadFileEditRef'+index)">选择</el-button>
                <i class="el-icon-close"
                   @click="deleteFile(index)"
                   style="font-size:22px;color:#F4382E;margin-left:10px;cursor: pointer;"></i>
              </div>
            </el-row>
          </el-form-item>
          <el-form-item label=" "
                        style="margin-bottom: 0px">
            <span style="color:#999999;font-size:12px">支持pdf及jpg，png，bmp等图片格式，单个文件大小不得超过10Mb</span>
          </el-form-item>
          <el-form-item label=" "
                        style="margin-bottom: 0px">
            <el-button type="text"
                       @click="addAgain">+ 继续添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:150px">提交</el-button>
            <el-button style="width:150px">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 3.空 -->
    <el-row v-show="userInfoBlank"
            class="blank">
      <el-col :span="24">
        <img src="../../../assets/img/blank.jpg"
             style="width:250px;"
             alt="blank">
        <span class="blank-p">您尚未添加用户信息</span>
        <el-button type="primary"
                   @click="blankAdd"
                   class="blank-add">+ 添加用户信息</el-button>
      </el-col>
    </el-row>
    <!-- 4.有信息 -->
    <div v-show="userInfo">
      <div v-for="(item,index) in array"
           :key="index">
        <div class="user-item-container">
          <span>{{item.label}}</span>
          <span v-if="item.msg!==false">{{item.msg}}</span>
          <div class="user-img"
               v-else>
            <img :src="item.img"
                 alt="">
          </div>
        </div>
      </div>
      <div class="user-item-container">
        <span>&nbsp;</span>
        <div class="user-img">
          <el-button type="primary"
                     @click="editCick">编辑</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const img = require('../../../assets/img/blank.png')

export default {
  name: "UserInfo",
  data () {
    return {
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
        msg13: '',
        msg14: '',
        msg15: '',
        // msg16: '',
      },
      array: [
        { label: '用户编码', msg: 27893130 },
        { label: '企业名称', msg: '深圳天发物流公司' },
        { label: '经营地址', msg: '广东省深圳市福田区中港大街112号' },
        { label: '社会统一信用代码', msg: '9135 9524 MA33 3340 12' },
        { label: '社会统一信用代码有效期', msg: '2021/04/18' },
        { label: '注册资金（万元）', msg: '2000万元' },
        { label: '法定代表人姓名', msg: '张三' },
        { label: '法定代表人证件类型', msg: '居民身份证' },
        { label: '法定代表人证件号码', msg: '310101198001010001' },
        { label: '法定代表人电话', msg: '13919991999 ' },
        { label: '企业联系人姓名', msg: '李四' },
        { label: '企业联系人电话', msg: '13013122930' },
        { label: '企业联系人邮箱', msg: 'lisi@hotmail.com' },
        { label: '企业网址', msg: 'www.tianfa.com' },
        { label: '营业执照', msg: false, img: img },
        { label: '状态', msg: '正常' },
      ],
      /**
       * isAddUserInfo 添加用户显示  userInfo用户信息显示(有信息) userInfoBlank(无信息)
       */
      isAddUserInfo: false,
      userInfo: false,
      userInfoBlank: true,
      // 显示隐藏？标志后面内容
      isShowMark: true,
      // 上传 图片框数量
      files: [
        {
          name: '',
        },
      ]
    }
  },
  computed: {
    userInforTitle () {
      if (this.userInfoBlank || this.userInfo) {
        return '用户信息'
      } else if (this.isAddUserInfo) {
        return '添加用户信息'
      } else {
        return '编辑用户信息'
      }
    }
  },
  methods: {
    // 0.上传文件
    upload (ref) {
      // console.log(this.$refs[ref]);
      this.$refs[ref][0].click()
      // console.log(this.$refs.loadFileRef0);
    },
    // 1.空空如也添加用户信息
    blankAdd () {
      this.userInfoBlank = false
      this.isAddUserInfo = true
    },
    // 2.提交添加用户
    onSubmitUser () {
      this.$confirm(`确认提交添加用户信息?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isAddUserInfo = false
        this.userInfoBlank = false
        this.userInfo = true
        this.$store.commit('addUserInfo', true)
        this.clearFileList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 3.编辑用户
    editCick () {
      this.$confirm(`修改用户信息将有可能影响现有收款方状态，
      且需要重新审核，审核通过前将不能进行物流费用支付，
      您确定要修改用户信?`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userInfoBlank = false
        this.isAddUserInfo = false
        this.userInfo = false
        this.clearFileList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 控制？号后面内容显示或隐藏
    iconMouseleave () {
      this.isShowMark = true
    },
    iconMouseenter () {
      this.isShowMark = false
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
    // 清空文件列表
    clearFileList () {
      this.files = [{
        name: ''
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
  min-height: 500px;

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
  .title {
    font-size: 20px;
    color: #333;
  }
  .upload-file {
    position: relative;

    .upload-btn {
      position: absolute;
      right: -120px;
    }
  }

  .blank {
    position: relative;
    text-align: center;

    img {
      display: block;
      margin: 0px auto;
    }

    .blank-p {
      display: block;
      text-align: center;
      color: #999999;
      font-size: 16px;
    }

    .blank-add {
      margin-top: 60px;
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
      margin-left: 100px;
      img {
        height: 118px;
      }
    }
  }

  .hide {
    opacity: 0;
  }
  .font-normal {
    font-style: normal;
  }
}
</style>