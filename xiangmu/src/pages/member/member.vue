'<template>
  <div style="margin-top:10px;">
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
    edit(id){
      this.msg.show = true
      this.$refs.add.getText(id)
      this.msg.title = '会员编辑'
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