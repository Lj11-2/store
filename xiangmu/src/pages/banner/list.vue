'<template>
  <el-table :data="list" style="width: 100%;margin-bottom: 20px;">
    <el-table-column prop="id" label="编号" width="180"></el-table-column>
    <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
    <el-table-column prop="img" label="图片">
      <template slot-scope="scope">
        <img :src="$imgPre+scope.row.img" alt />
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../util/alert";
import { bannerDelete } from "../../util/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      requsetList: "banner/requsetList",
    }),
    //商品列表删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          bannerDelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.requsetList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //商品编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.requsetList();
  },
};
</script>

<style>
</style>'