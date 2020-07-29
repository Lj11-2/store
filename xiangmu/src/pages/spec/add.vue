'<template>
  <el-dialog :title="msg.title" :visible.sync="msg.show">
    <el-form :model="form">
      <el-form-item label="规格名称" :label-width="formLabelWidth">
        <el-input v-model="form.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="规格属性"
        :label-width="formLabelWidth"
        v-for="(item,index) in arr"
        :key="index"
      >
        <el-input v-model="item.value" autocomplete="off" style="width:70%;vertical-align: middle;"></el-input>
        <el-button
          type="primary"
          style="width:28%; vertical-align: middle;"
          v-if="index==0"
          @click="addArr"
        >新增规格属性</el-button>
        <el-button
          type="danger"
          @click="delArr(index)"
          style="width:18%; vertical-align: middle;"
          v-else
        >删除</el-button>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cannel">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="msg.showAdd">确 定</el-button>
      <el-button type="primary" @click="change()" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { specAdd, specId, specChange } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["msg"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "120px",
      arr: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    //添加属性规格
    addArr() {
      this.arr.push({
        value: "",
      });
    },
    ...mapActions({
      requestList: "spec/requestList",
    }),
    delArr(index) {
      //点击对应的删除规格进行删除
      this.arr.splice(index, 1);
    },
    //获取Id
    getId(id) {
      specId({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.arr = JSON.parse(res.data.list[0].attrs).map((item) => {
          return {
            value: item,
          };
        });
      });
    },
    add() {
      //验证每一项的属性和规格是不是空
      if (this.arr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      //把属性和规格的内容拼成数组后转为字符串
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      specAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.requestList();
        this.empty();
      });
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    //取消按钮
    cannel() {
      this.empty();
      this.msg.show = false;
    },
    
    //修改按钮
    change() {
      if (this.arr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      specChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.requestList();
         this.msg.show = false
      });
    },
  },
};
</script>

<style>
</style>'