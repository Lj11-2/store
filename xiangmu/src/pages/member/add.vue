'<template>
  <div>
    <el-dialog :title="msg.title" :visible.sync="msg.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="change()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { memberId, memberChange } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["msg"],
  data() {
    return {
      form: {
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requsetList: "member/requestList",
    }),
    empty() {
      this.form = {
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    //获取对应id
    getText(id) {
      memberId({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //修改会员
    change() {
      memberChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.msg.show = false;
        } else {
          warningAlert(res.data.msg);
        }
        this.requsetList();
      });
    },
    close() {
      this.msg.show = false;
    },
  },
};
</script>

<style>
</style>'