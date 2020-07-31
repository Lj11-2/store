'<template>
  <el-dialog :title="msg.title" :visible.sync="msg.show">
    <el-form :model="form">
      <el-form-item label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.roleid">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="msg.show = false">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="this.msg.showAdd">确 定</el-button>
      <el-button type="primary" @click="change()" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { managerAdd, managerId, managerChange } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  props: ["msg"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      requseRoletList: "role/requestList",
      requseMangertList: "manager/requestList",
      managerCount: "manager/managerCount",
      changePage: "manager/changePage",
    }),
    //管理员添加
    add() {
      managerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requseRoletList();
          this.managerCount();
        } else {
          warningAlert(res.data.msg);
        }
      });
      this.msg.show = false;
      this.requseMangertList();
    },
    //获取当前id
    getText(id) {
      managerId({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //修改管理员
    change() {
      managerChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.requseMangertList();
      });
    },
  },

  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.requseRoletList();
  },
};
</script>

<style>
</style>'