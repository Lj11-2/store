'<template>
  <div class="login">
    <div class="inner">
      <h2>登录</h2>
      <p>
        <el-input placeholder="请输入内容" v-model="user.username"></el-input>
      </p>
      <p>
        <el-input placeholder="请输入密码" show-password v-model="user.password"></el-input>
      </p>
      <p>
        <el-button type="primary" @click="login">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { managerLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      managerLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$router.push("/");
          this.changeUser(res.data.list);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      changeUser: "changeUser",
    }),
  },
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
.login .inner h2 {
  text-align: center;
}
.login .inner .el-input {
  width: 300px;
}
.login .inner p {
  text-align: center;
}
</style>'