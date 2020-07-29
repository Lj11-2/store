'<template>
  <div class="add">
    <el-dialog :title="msg.title" :visible.sync="msg.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="change">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cannel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="msg.showAdd">确 定</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../util/alert";
import { shopAdd, shopId, shopChange } from "../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["msg"],
  computed: {
    ...mapGetters({
      list: "kind/list",
    }),
  },
  data() {
    return {
      imageUrl: "",
      dialogTableVisible: true,
      dialogFormVisible: true,
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requsetList: "kind/requestList",
    }),
    change(e) {
      console.log(e);
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      console.log(extname);
      var arr = [".jpg", ".png", ".gif", ".jpge"];
      //   for (var i in arr) {
      //     if (arr[i] != extname) {
      //       warningAlert("上传文件必须是图片");
      //     }
      //   }
      var file = e.raw;
      console.log(URL.createObjectURL(file));
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
    },
    //添加
    add() {
      console.log(this.form, 1232132121);
      shopAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.empty();
        this.requsetList();
      });
    },
    cannel() {
      this.msg.show = false;
      this.empty();
    },

    //获取当前的id
    getId(id) {
      shopId({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    //修改商品
    edit() {
        console.log(this.form)
      shopChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.empty()
        this.requsetList()
      });
    },
  },
  mounted() {},
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img {
  width: 150px;
  height: 80px;
}
</style>'