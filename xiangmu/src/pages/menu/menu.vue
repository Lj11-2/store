'<template>
  <div style="margin-top:10px">
    <el-button type="primary" @click="add()">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-add :msg="msg" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      msg: {
        show: false,
        isAdd:true
      },
    };
  },
  methods: {
    add() {
      this.msg.show = true;
      this.msg.title = '菜单添加'
      this.msg.isAdd= true
    },
    edit(id){
      this.msg.show = true
      this.$refs.add.getText(id)
      this.msg.title = '菜单编辑'
      this.msg.isAdd= false
    }
  },
  components: {
    vList,
    vAdd,
  },
};
</script>

<style>
</style>'