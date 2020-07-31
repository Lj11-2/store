'<template>
  <el-container class="all">
    <!-- 侧边栏 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.id+''" class="nav" v-for="item in user.menus" :key="item.id" v-show="children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-menu-item  :index="i.url" v-for="i in user.menus" v-show="!children">
        <span slot="title">{{i.title}}</span>
      </el-menu-item>
    </el-menu>
    <!-- 侧边栏 -->
    <el-container>
      <el-header>
        <div style="line-height:60px;float:right">
          <span style="color:#ffffff">{{user.username}}</span>
          <span>
            <el-button type="primary" @click="back()" style="100px">退出</el-button>
          </span>
        </div>
      </el-header>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
    //判断是否有目录
    children(){
     return this.user.menus[0].children ? true : false
    }
  },
  methods: {
    back() {
      this.changeUser(null);
      this.$router.push("/login");
    },
    ...mapActions({
      changeUser: "changeUser",
    }),
  },
};
</script>

<style scoped>
.nav {
  width: 200px;
}
.all {
  height: 100vh;
}
.el-header {
  background: rgb(4, 4, 77);
}
.el-main {
  background: #b3c0d1;
}

</style>'