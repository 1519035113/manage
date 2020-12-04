<template>
  <div class="box">
    <el-input style="width:360px;margin-right:20px;" placeholder="请输入内容" v-model="query">
      <el-button @click="getData()" slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <el-table style="margin-top:20px;width: 100%;" :data="tableData" stripe border>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="order_number" label="订单编号"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay == 1" type effect="dark">已付款</el-tag>
          <el-tag v-else type="danger" effect="dark">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="update_time" label="下单时间时间"></el-table-column>
      <el-table-column prop="path" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改订单地址" placement="top">
            <el-button @click="editOrder(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip style class="item" effect="dark" content="物流信息" placement="top">
            <el-button @click="outline" type="success" icon="el-icon-location-outline" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" style="margin-top:20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>

    <!-- 修改订单地址 -->
    <el-dialog title="修改订单地址" width="560px" :visible.sync="editOrderFlag">
      <el-form :model="editOrderForm" :rules="rules" ref="editOrderForm">
        <el-form-item label="省市区/县" prop="adress" label-width="100px">
          <el-cascader v-model="editOrderForm.adress" :options="cityOptions" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="xadress" label-width="100px">
          <el-input v-model="editOrderForm.xadress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOrderFlag = false">取 消</el-button>
        <el-button type="primary" @click="editOrderTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 物流信息 -->
    <el-dialog title="物流信息" width="560px" :visible.sync="outlineFlag">
      <el-form>
        <!-- <el-steps space="5" direction="vertical" :active="0">
          <el-step v-for="(item,index) in outlineData" :key="index" :title="item.context"></el-step>
        </el-steps> -->

        <el-timeline  :reverse="reverse">
          <el-timeline-item
            v-for="(item,index) in outlineData"
            :key="index"
            :timestamp="item.time"
          >{{item.context}}</el-timeline-item>
        </el-timeline>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outlineFlag = false">取 消</el-button>
        <el-button type="primary" @click="outlineTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from "@/assets/js/city_data2017_element.js";
import { getOrderList, getOutline } from "@/api/orders";
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 5,
      totals: 5,
      editOrderForm: {
        adress: "",
        xadress: ""
      },
      editOrderFlag: false,
      outlineFlag: false,
      rules: {
        adress: [{ required: true, message: "请选择地址", tirgger: "blur" }],
        xadress: [
          { required: true, message: "请输入详细地址", tirgger: "blur" }
        ]
      },
      cityOptions: cityOptions,
      outlineData: [],
      reverse:false,

    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getData();
    },
    //   获取订单列表
    async getData() {
      let { data: res } = await getOrderList(
        this.query,
        this.pagenum,
        this.pagesize
      );
      if (res.meta.status == 200) {
        this.tableData = res.data.goods;
        this.totals = res.data.total;
      }
    },

    //   修改订单列表
    editOrder(data) {
      this.editOrderFlag = true;
      this.$nextTick(() => {
        this.$refs["editOrderForm"].resetFields();
      });
    },
    editOrderTrue() {
      this.$refs["editOrderForm"].validate(valid => {
        if (valid) {
          this.editOrderFlag = false;
        } else {
          console.log("error");
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value);
     
    },
    // 物流信息
    async outline() {
      let { data: res } = await getOutline();
      if (res.meta.status == 200) {
        this.outlineData = res.data;
      }
      console.log(res);
      this.outlineFlag = true;
    },
    // 物流信息点击确认
    outlineTrue() {
      this.outlineFlag = false
    }
  },
  components: {}
};
</script>

<style scoped>
.box {
  margin: 20px 0 0 0;
  padding: 20px 0 0 20px;
  background: #fff;
}

</style>
