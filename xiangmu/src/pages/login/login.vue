'<template>
  <div class="login">
    <div class="inner">
      <h2>登录</h2>
      <p>
        <el-input  placeholder="请输入内容"></el-input>
      </p>
      <p>
        <el-input placeholder="请输入密码" show-password></el-input>
      </p>
      <p>
            <el-button type="primary" @click="login">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    login(){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, red, blue);
}
.login .inner {
    background: #fff;
    width: 400px;
    height: 250px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.login .inner h2{
    text-align: center;
}
.login .inner .el-input{
    width: 300px;
}
.login .inner p{
    text-align: center;
}
</style>'