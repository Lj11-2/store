'<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;">
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="80"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cpage"
      :page-size="size"
      :total="num"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../util/alert";
import { shopManageDelete } from "../../util/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "shopmanage/list",
      num: "shopmanage/num",
      size: "shopmanage/size",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "shopmanage/requestList",
      shopManageCount:'shopmanage/shopManageCount',
      shopManagePage:'shopmanage/changePage'
    }),
    //商品列表删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          shopManageDelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
            } else {
              warningAlert(res.data.msg);
            }
            this.requestList()
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
    cpage(a) {
      this.shopManagePage(a);
      this.requestList();
    },
  },
  mounted() {
    this.requestList();
    this.shopManageCount()
  },
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>'