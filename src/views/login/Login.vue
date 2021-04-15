<template>
  <div class="login">
    <header-menu @showLogin="showLogin" />
    <page1 />
    <page2 />
    <page3 />
    <!-- 登陆注册 -->
    <div class="login-and-register">
      <el-dialog title=""
                 :close-on-click-modal="false"
                 @close="hideLogin"
                 :visible.sync="dialogVisible"
                 width="360px"
                 center>
        <!-- 1.登陆页面 -->
        <div class="login-page"
             v-show="!isShowForget&&isShowLogin">
          <div>
            <img class="logo"
                 src="../../assets/img/logo.png"
                 alt="">
          </div>
          <p class="login-p">登录</p>
          <div class="content">
            <el-form :model="loginForm"
                     :rules="loginRules"
                     ref="loginForm"
                     class="demo-ruleForm">
              <el-form-item label="电子邮箱"
                            prop="email">
                <el-input type="email"
                          clearable
                          v-model="loginForm.email"
                          placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input type="password"
                          clearable
                          v-model="loginForm.password"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
              <div class="change-info">
                <span class="active"
                      @click="forgetClick">忘记密码?</span>
                <span style="color:#999">还没注册账号?
                  <span class="active"
                        style="color:#F4382E"
                        @click="registerClick">注册</span>
                </span>
              </div>
            </el-form>
          </div>
        </div>
        <!-- 2.注册页面 -->
        <div class="register-page"
             v-show="!isShowForget&&!isShowLogin">
          <div>
            <img class="logo"
                 src="../../assets/img/logo.png"
                 alt="">
          </div>
          <p class="login-p">注册</p>
          <div class="content">
            <el-form :model="registerForm"
                     :rules="registerRules"
                     ref="registerForm"
                     class="demo-ruleForm">
              <el-form-item label="电子邮箱"
                            prop="email">
                <el-input type="email"
                          clearable
                          v-model="registerForm.email"
                          placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="用户名"
                            prop="userName">
                <el-input type="text"
                          clearable
                          v-model="registerForm.userName"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input type="password"
                          clearable
                          v-model="registerForm.password"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            prop="passwordAgain">
                <el-input type="password"
                          clearable
                          v-model="registerForm.passwordAgain"
                          placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <div class="change-info"
                   style="margin-top:20px">
                <span class="active">&nbsp;</span>
                <span style="color:#999">已有账号?
                  <span class="active"
                        style="color:#F4382E"
                        @click="loginClick">登录</span>
                </span>
              </div>
            </el-form>
          </div>
        </div>
        <!-- 3.忘记密码页面 -->
        <div class="login-page"
             v-show="isShowForget&&isShowLogin">
          <div>
            <img class="logo"
                 src="../../assets/img/logo.png"
                 alt="">
          </div>
          <p class="login-p"
             style="margin:30px 0 50px 0;font-weight:700;color:#666;">重置密码</p>
          <div class="content">
            <el-form :model="forgetForm"
                     :rules="forgetRules"
                     ref="forgetForm"
                     class="demo-ruleForm">
              <h3 style="color: #666;">请输入您注册时使用的电子邮箱</h3>
              <el-form-item label="电子邮箱"
                            prop="email">
                <el-input type="email"
                          clearable
                          v-model="forgetForm.email"
                          placeholder="请输入电子邮箱"></el-input>
              </el-form-item>

              <div class="change-info">
                <span class="active">&nbsp;</span>
                <span style="color:#999">&nbsp;
                  <span class="active"
                        style="color:#F4382E"
                        @click="registerClick">&nbsp;</span>
                </span>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     :loading="loading"
                     @click="footerClick"
                     style="width:310px">{{footerBtn}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入头部
import HeaderMenu from '../../components/HeaderMenu'
import Page1 from './childCpn/Page1'
import Page2 from './childCpn/Page2'
import Page3 from './childCpn/Page3'

export default {
  name: 'Login',
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogVisible: false,
      isShowLogin: true,
      isShowForget: false,
      // 登陆表单信息
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 注册表单信息
      registerForm: {
        email: '',
        user: '',
        password: '',
        passwordAgain: ''
      },
      registerRules: {
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { required: true, validator: validatePass2, trigger: 'blur' },
        ]
      },
      // 忘记密码表单信息
      forgetForm: {
        email: '',
      },
      forgetRules: {
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    footerBtn () {
      if (this.isShowForget) {
        return '发送密码 重置邮件'
      } else if (this.isShowLogin) {
        return '登 录'
      } else {
        return '注 册'
      }
    }
  },
  methods: {
    // 1.显示登陆
    showLogin () {
      this.dialogVisible = true
    },
    // 2.隐藏登陆
    hideLogin () {
      this.dialogVisible = false
      this.isShowForget = false
      this.isShowLogin = true
    },
    // 3.跳转注册
    registerClick () {
      this.isShowLogin = false
    },
    // 4.点击登陆
    loginClick () {
      this.resetLoginAndRegister()
      this.isShowLogin = true
    },
    // 5.忘记密码
    forgetClick () {
      this.resetLoginAndRegister()
      this.isShowForget = true
    },
    // 6.清空登陆和注册信息
    resetLoginAndRegister () {
      this.loginForm = {
        email: '',
        password: ''
      }
      this.registerForm = {
        email: '',
        user: '',
        password: '',
        passwordAgain: ''
      }
    },
    // 7.点击   登录   注册   忘记密码
    footerClick () {
      if (this.isShowForget) {
        // 点击忘记密码
        this.forget()
      } else if (this.isShowLogin) {
        // 点击登陆
        this.login()
      } else {
        // 点击注册
        this.register()
      }
    },
    // 7.1登陆函数
    login () {
      console.log('点击登陆');
      this.loading = true
      setTimeout(() => {
        this.$router.replace('/home')
        this.loading = false
      }, 1000)
    },
    // 7.2注册函数
    register () {
      console.log('点击注册');
    },
    // 7.2忘记密码函数
    forget () {
      console.log('点击忘记密码');
    }

  },
  components: {
    HeaderMenu,
    Page1,
    Page2,
    Page3,
  }
}
</script>

<style lang="scss" scoped >
.login {
  margin-top: 20px;
  width: 100%;
  /* height: 100px; */

  .login-and-register {
    .logo {
      width: 100px;
    }

    .login-p {
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }

    .change-info {
      display: flex;
      justify-content: space-between;
      color: #f4382e;
      font-size: 14px;

      .active {
        cursor: pointer;
      }
    }

    .register-page {
      /deep/.el-form-item {
        margin-bottom: 10px !important;
      }
    }
  }
}
</style>