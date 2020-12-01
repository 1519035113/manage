<template>
  <div class="box">
    <el-input style="width:360px;margin-right:20px;" placeholder="请输入内容" v-model="query">
      <el-button @click="getData()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="addGoods" type="primary">添加商品</el-button>

    <el-table style="margin-top:20px;width: 100%;" :data="tableData" stripe border>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column prop="path" label="操作">
        <template slot-scope="scope">
          <el-button @click="editGoods(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            @click="remGoods(scope.row.goods_id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
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

  </div>
</template>

<script>
import { getGoodsList, removeGoodsList } from "@/api/goods";
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 5,
      totals: 0,
      tableData: [],
      
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
    //   获取商品列表数据
    async getData() {
      let { data: res } = await getGoodsList(
        this.query,
        this.pagenum,
        this.pagesize
      );
      //    console.log(res)
      if (res.meta.status == 200) {
        this.tableData = res.data.goods;
        this.totals = res.data.total;
      }
    },
    //   添加商品
    addGoods() {
      this.$router.push('/home/addgoods')
    },
    //   修改商品
    editGoods(data) {},
    // 删除商品
    async remGoods(id) {
      let { data: res } = await removeGoodsList(id);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.getData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
