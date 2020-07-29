'<template>
  <div>
    <el-table :data="list" height="250" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="cpage" :page-size="size" :total="num"></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { managerDelete } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manager/list",
      num: "manager/num",
      size: "manager/size",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "manager/requestList",
      managerCount: "manager/managerCount",
      changePage: "manager/changePage",
    }),

    //管理员删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          managerDelete({ uid: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
            } else {
              warningAlert(res.data.msg);
            }
            this.requestList();
             this.managerCount();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //管理员编辑
    edit(id) {
      this.$emit("emit", id);
    },
    cpage(a){
      this.changePage(a)
      this.requestList();

    }
  },
  mounted() {
    this.managerCount();
    this.requestList();
  },
};
</script>

<style>
</style>'