'<template>
  <div>
    <el-button type="primary" style="margin-top:10px" @click="add()">添加</el-button>
    <v-add :msg="msg" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./add";
import vList from "./list";

export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      msg: {
        show: false,
        showAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.msg.show = true;
      this.msg.title = "角色添加";
      this.msg.showAdd = true;
    },
    edit(id) {
      this.msg.show = true;
      this.$refs.add.roleId(id);
      this.msg.title = "角色编辑";
      this.msg.showAdd = false;
    },
  },
};
</script>

<style>
</style>'