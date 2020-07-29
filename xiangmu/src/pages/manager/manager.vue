'<template>
  <div>
    <el-button type="primary" @click="add()" style="margin-top:10px">添加</el-button>
    <v-list @emit="emit"></v-list>
    <v-add :msg="msg" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./add";
import vList from "./list";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      msg: {
        show: false,
        showAdd: false,
      },
    };
  },
  methods: {
    add() {
      this.msg.show = true;
      this.msg.title = "管理员添加";
      this.msg.showAdd = true;
    },
    emit(id) {
      this.msg.show = true;
      this.msg.title = "管理员修改";
      this.$refs.add.getText(id);
      this.msg.showAdd = false;
    },
  },
};
</script>

<style>
</style>'