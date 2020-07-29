'<template>
  <div style="margin-top:10px">
    <el-button type="primary" @click="add()">添加</el-button>
    <v-add :msg="msg" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./add";
import vList from "./list";
export default {
  data() {
    return {
      msg: {
        show: false,
        showAdd: true,
      },
    };
  },
  components: {
    vAdd,
    vList,
  },
  methods: {
    add() {
      this.msg.show = true;
      this.msg.showAdd = true;
      this.msg.title = "商品管理添加";
    },
    edit(id) {
      this.msg.show = true;
      this.title = "商品管理修改";
      this.$refs.add.getId(id);
      this.msg.showAdd = false;
    },
  },
};
</script>

<style>
</style>'