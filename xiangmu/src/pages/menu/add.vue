'<template>
  <div>
    <el-dialog :title="msg.title" :visible.sync="msg.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="this.msg.isAdd">添 加</el-button>
        <el-button type="primary" @click="change()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAdd, getId, changeMenu } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["msg"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
        "/member",
        "/shopmanage",
      ],
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    ...mapActions({
      requsetList: "menu/requestList",
    }),
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //添加数据库中
    add() {
      requestAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
      this.msg.show = false;
      this.requsetList();
      this.empty();
    },
    getText(id) {
      getId({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    change() {
      changeMenu(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.msg.show = false;
          this.requsetList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    close() {
      this.msg.show = false;
    },
  },
};
</script>

<style>
</style>'