'<template>
  <el-dialog :title="msg.title" :visible.sync="msg.show">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree :data="list" show-checkbox node-key="id" :props="defaultProps" ref="tree"></el-tree>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="this.msg.showAdd">确 定</el-button>
      <el-button type="primary" @click="change()" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roleAdd, roleId, changeRole } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  props: ["msg"],
  data() {
    return {
      dialogTableVisible: true,
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
      roleList: "role/list",
    }),
  },
  methods: {
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    cancel() {
      this.msg.show = false;
      if (!this.msg.showAdd) {
        this.empty();
      }
    },
    add() {
      //点击树形反选获取id，'[2,3,4]' 字符串数组给后端
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.requseRoletList();
        this.empty();
      });
    },
    ...mapActions({
      requsetList: "menu/requestList",
      requseRoletList: "role/requestList",
    }),
    //获取当前点击编辑的Id
    roleId(id) {
      roleId({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    //编辑角色
    change() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      changeRole(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
      this.msg.show = false;
      this.requseRoletList();
    },
  },
  mounted() {
    this.requsetList();
  },
};
</script>

<style>
</style>'