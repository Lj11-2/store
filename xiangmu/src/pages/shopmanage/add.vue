'<template>
  <div class="add">
    <el-dialog :title="msg.title" :visible.sync="msg.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeOne()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in kindList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in twoArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="change">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeTwo()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import { shopManageAdd, shopManageId, shopManageChange } from "../../util/request";
import { mapGetters, mapActions } from "vuex";
import e from "wangeditor";
export default {
  props: ["msg"],
  computed: {
    ...mapGetters({
      //分类一级列表
      kindList: "kind/list",
      specList: "spec/list",
      list: "shopmanage/list",
    }),
  },
  data() {
    return {
      editor: null,
      twoArr: [],
      attrsArr: [],
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 2,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requsetList: "shopmanage/requestList",
      requsetKindList: "kind/requestList",
      requsetSpecList: "spec/requestList",
    }),
    change(e) {
      console.log(e);
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      console.log(extname);
      var file = e.raw;
      console.log(URL.createObjectURL(file));
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      this.twoArr = [];
      this.attrsArr = [];
      this.imageUrl = "";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 2,
        status: 1,
      };
      this.editor.txt.html()
    },
    //添加
    add() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      shopManageAdd(this.form).then((res) => {
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
      shopManageId({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    //修改商品
    edit() {
      console.log(this.form);
      shopManageChange(this.form).then((res) => {
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
    //创建编辑器
    createEditor() {
      this.editor = new e("#desc");
      this.editor.create();
      this.editor.txt.html("");
    },
    //修改一级分类
    changeOne() {
      let index = this.kindList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.twoArr = this.kindList[index].children;
      console.log(this.twoArr);
      this.form.second_cateid = "";
    },
    //商品规格改变
    changeTwo() {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrsArr = this.specList[index].attrs;
      this.form.specsattr = [];
    },
  },
  mounted() {
    this.requsetKindList();
    this.requsetSpecList(true);
  },
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