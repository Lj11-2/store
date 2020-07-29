'<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { menuDelete } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      requsetList: "member/requestList",
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
  mounted() {
    this.requsetList();
  },
};
</script>

<style>
</style>'