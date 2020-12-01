<template>
  <div class="box">
    <el-button @click="addCate" type="primary">添加分类</el-button>

    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table show-header='true' :data="props.row.children" style="width: 100%">
               
            <el-table-column type="expand">
              <template slot-scope="props"></template>
            </el-table-column>
            <el-table-column prop="cat_name"></el-table-column>
            <el-table-column prop="cat_pid">
              <template slot-scope="scope">
                <i v-if="scope.row.cat_pid == 0" class="el-icon-success" style="color:#39ce39"></i>
              </template>
            </el-table-column>
            <el-table-column prop="cat_level">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.cat_level == 0" type>{{level[scope.row.cat_level]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="desc"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="cat_name"></el-table-column>
      <el-table-column label="是否有效" prop="cat_pid">
        <template slot-scope="scope">
          <i v-if="scope.row.cat_pid == 0" class="el-icon-success" style="color:#39ce39"></i>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="cat_level">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0" type>{{level[scope.row.cat_level]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="desc"></el-table-column>
    </el-table>-->

    <tree-table :data="tableData" :columns="columns" :selection-type="false" :expand-type="false" :show-index="true" index-text="#" border :show-row-hover="false">
      <template slot="isok" slot-scope="scope">
        <i v-if="scope.row.cat_deleted == false" class="el-icon-success" style="color:#39ce39"></i>
      </template>
      <template slot="order" slot-scope="scope">
        <el-tag v-if="scope.row.cat_level == 0" type effect="dark" size="mini">{{level[scope.row.cat_level]}}</el-tag>
        <el-tag v-if="scope.row.cat_level == 1" type = "success" effect="dark" size="mini">{{level[scope.row.cat_level]}}</el-tag>
        <el-tag v-if="scope.row.cat_level == 2" type = "warning" effect="dark" size="mini">{{level[scope.row.cat_level]}}</el-tag>
      </template>
      <template slot="opt" slot-scope="scope">
         <el-button
              @click="editCate(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="remCate(scope.row.cat_id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
      </template>
    </tree-table>

    <!-- <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="#" sortable width="180"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称" sortable width="180"></el-table-column>
        <el-table-column prop="cat_pid" label="是否有效" sortable width="180">
          <template slot-scope="scope">
            <i v-if="scope.row.cat_pid == 0" class="el-icon-success" style="color:#39ce39"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0" type>{{level[scope.row.cat_level]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editCate(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="remCate(scope.row.cat_id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->

    <!-- 添加弹框 -->
    <el-dialog title="添加商品" width="560px" :visible.sync="cateFlag">
      <el-form :model="cateForm" :rules="rules" ref="cateForm">
        <el-form-item label="分类名称" prop="cat_name" label-width="100px">
          <el-input v-model="cateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="roleDesc" label-width="100px">
          <el-input v-model="cateForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cateFlag = false">取 消</el-button>
        <el-button type="primary" @click="cateTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog title="修改商品名称" width="560px" :visible.sync="editCateFlag">
      <el-form :model="editCateForm" :rules="rules" ref="editCateForm">
        <el-form-item label="分类名称" prop="cat_name" label-width="100px">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCateFlag = false">取 消</el-button>
        <el-button type="primary" @click="editCateTrue">确 定</el-button>
      </div>
    </el-dialog>

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
import { getCateList, removeCateList, addCateList ,editCateList } from "@/api/goods";
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      totals: 0,
      level: {
        0: "一级",
        1: "二级",
        2: "三级"
      },
      cateFlag: false,
      cateForm: {
        cat_level: 0,
        cat_name: "",
        cat_pid: 0
      },
      rules: {
        cat_name: [{ required: true }]
      },
      editCateFlag: false,
      editCateForm: {
        cat_name: ""
      },
      columns:[
        {
          label:'分类名称',
          prop:'cat_name'
        },
        {
          label:'是否有效',
          // 表示将当前列定义为模板列
          type:'template',
          // 表示当前这一列使用模板名称
          template:'isok'
        },
        {
          label:'排序',
          type:'template',   
          template:'order'
        },
        {
          label:'操作',
          type:'template',   
          template:'opt'
        }
      ]
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
    //   获取商品分类列表
    async getData() {
      let { data: res } = await getCateList(3, this.pagenum, this.pagesize);
      console.log(res);
      if (res.meta.status == 200) {
        this.tableData = res.data.result;
        this.totals = res.data.total;
      }
    },
    // 添加用户列表弹框
    addCate() {
      this.cateFlag = true;
      this.$nextTick(() => {
        this.$refs["cateForm"].resetFields();
      });
    },
    async cateTrue() {
      let { data: res } = await addCateList(this.cateForm);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
        this.getData();
      }
      this.cateFlag = false;
    },
    // 修改用户列表弹框
    editCate(data) {
      this.editCateFlag = true;
      this.editCateForm = data;
    },
    // 修改用户列表
    async editCateTrue() {
      let { data: res } = await editCateList(this.editCateForm.cat_name,this.editCateForm.cat_id);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.getData();
      }
      this.editCateFlag = false;
    },
    // 删除用户列表
    async remCate(id) {
      let { data: res } = await removeCateList(id);
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
          return false;
        })
        .catch(() => {
          this.$message.info("已取消删除");
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
