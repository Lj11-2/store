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
  components: {
    vAdd,
    vList,
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
      (this.msg.show = true),
        (this.msg.showAdd = true),
        (this.msg.title = "秒杀添加");
    },
    edit(id) {
      (this.msg.showAdd = false), (this.msg.show = true);
      this.msg.title = "秒杀修改";
      this.$refs.add.getId(id);
    },
  },
};
</script>

<style>
</style>'