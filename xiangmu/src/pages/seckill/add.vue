'<template>
  <el-dialog title="收货地址" :visible.sync="msg.show">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" :label-width="formLabelWidth">
        <el-date-picker
          v-model="value1"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="time()"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" @change="changeOne()">
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 动态数据 -->
          <el-option
            v-for="item in KindList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth" @change="changeTwo">
        <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
          <!-- 动态数据 -->
          <el-option v-for="item in twoArr" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="form.goodsid" placeholder="请选择活动区域">
          <el-option
            v-for="item in shopManageList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add()" v-if="msg.showAdd">确 定</el-button>
      <el-button type="primary" @click="edit()" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { seckillAdd, seckillId ,seckillChange} from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
export default {
  props: ["msg"],
  data() {
    return {
      fid: "",
      sid: "",
      twoArr: [],
      dialogFormVisible: true,
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
    };
  },
  computed: {
    ...mapGetters({
      KindList: "kind/list",
      shopManageList: "shopmanage/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "kind/requestList",
      requestShopManagetList: "shopmanage/requestList",
      requestSeckill: "seckill/requestList",
    }),
    //修改一级分类
    changeOne() {
      let index = this.KindList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.twoArr = this.KindList[index].children;
      console.log(this.twoArr);
      this.form.second_cateid = "";
    },
    //三级联动
    changeTwo() {
      this.requestShopManagetList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      });
    },
    //添加内容
    add() {
      seckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.requestSeckill();
      });
    },
    time() {
      var startTime = this.value1[0];
      var endTime = this.value1[1];
      var date1 = new Date(startTime).getTime();
      var date2 = new Date(endTime).getTime();
      console.log(date1);
      this.form.begintime = date1;
      this.form.endtime = date2;
    },

    //获取当前的id
    getId(id) {
      seckillId({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    edit() {
      seckillChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
        this.msg.show = false;
        this.requestSeckill();
      });
    },
  },
  mounted() {
    this.requestList();
    this.requestShopManagetList();
  },
};
</script>

<style>
</style>'
