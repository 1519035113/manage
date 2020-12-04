<template>
  <div class="box">
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" effect="dark"></el-alert>
    <el-form style="margin-top:20px;">
      <el-form-item label="选阵商品分类" label-width="100px" prop="pics">
        <el-cascader
          expand-trigger="hover"
          v-model="pics"
          :options="options"
          :props="cateProp"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button v-if="this.pics.length ==3" @click="dtAdd" type="primary" size="mini">添加参数</el-button>
        <el-button v-else disabled @click="dtAdd" type="primary" size="mini">添加参数</el-button>

        <el-table :data="manyTabData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>
                  <el-tag
                    v-for="(item,index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(index,scope.row)"
                  >{{item}}</el-tag>

                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  ></el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                  >+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="name">
            <template slot-scope="scope">
              <el-button
                @click="showEditData(scope.row)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              >修改</el-button>
              <el-button
                @click="removeData(scope.row.attr_id)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="only">
        <el-button v-if="this.pics.length ==3" @click="jtAdd" type="primary" size="mini">添加属性</el-button>
        <el-button v-else disabled="" @click="jtAdd" type="primary" size="mini">添加属性</el-button>
        <el-table :data="onlyTabData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>
                  <el-tag
                    v-for="(item,index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(index,scope.row)"
                  >{{item}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  ></el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                  >+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="name">
            <template slot-scope="scope">
              <el-button
                @click="showEditData(scope.row.attr_id)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              >修改</el-button>
              <el-button
                @click="removeData(scope.row.attr_id)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加动态参数或静态属性 -->
    <el-dialog
      :title="titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttrTrue">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 动态参数或静态属性 -->
    <el-dialog :title="'修改'+titleText" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editDataForm" :rules="editRules" ref="editDataForm" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editDataForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDataTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  cascaderList,
  goodsCan,
  removeAttr,
  addAttr,
  editData,
  addChild
} from "@/api/goods";
export default {
  data() {
    return {
      activeName: "many",
      pics: [],
      options: [],
      cateProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      addDialogVisible: false,
      addForm: {
        attr_name: ""
      },
      rules: {
        attr_name: [{ required: true, message: "请输入参数", tirgger: "blur" }]
      },
      tableData: [],
      manyTabData: [],
      onlyTabData: [],
      inputVisible: false,
      inputValue: "",
      attrId: 0,
      tag: 0,
      editDataForm: [],
      editDialogVisible: false,
      editRules: {
        attr_name: [{ required: true, message: "请输入参数", tirgger: "blur" }]
      }
    };
  },
  computed: {
    // 获取子级的id
    cateId() {
      if (this.pics.length == 3) {
        return this.pics[2];
      }
      return null;
    },
    // 计算dialog标题
    titleText() {
      if (this.activeName == "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    }
  },
  created() {},
  mounted() {
    this.getCascader();
  },
  watch: {},
  methods: {
    handleClose() {},
    // 级联选择器
    async handleChange(a) {
      if (this.pics.length !== 3) {
        this.pics = [];
        return;
      }
      // 获取动态参数或静态属性
      this.getData(this.cateId, this.activeName);
    },
    // 点击标签页触发事件
    async handleTabClick() {
      this.getData(this.cateId, this.activeName);
    },
    // 获取商品分类内容
    async getCascader() {
      let { data: res } = await cascaderList();
      // console.log(res);
      if (res.meta.status == 200) {
        this.options = res.data;
      }
    },
    // 删除动态参数子级
    async handleClose(i, row) {
      row.attr_vals.splice(i,1)
      this.getChildren(row)
    },
    // 添加动态参数
    dtAdd() {
      this.addDialogVisible = true;
    },
    // 添加静态属性
    jtAdd() {
      this.addDialogVisible = true;
    },
    // 关闭dialog清空表单
    addDialogClosed() {
      this.$refs["addForm"].resetFields();
    },
    // 添加动态参数或静态属性
    async addAttrTrue() {
      let { data: res } = await addAttr(
        this.cateId,
        this.addForm.attr_name,
        this.activeName
      );
      console.log(res);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
        // 获取动态参数或静态属性
        this.getData(this.cateId, this.activeName);
      }
      this.addDialogVisible = false;
    },
    // 获取表格数据
    async getData(id, name) {
      let { data: result } = await goodsCan(id, name);
      if (result.meta.status == 200) {
        result.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
          // 控制文本框的显示与隐藏
          item.inputVisible = false;
          item.inputValue = "";
        });
        console.log(result.data);
        if (name == "many") {
          this.manyTabData = result.data;
        } else {
          this.onlyTabData = result.data;
        }
      }
    },
    // 点击改变输入框
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async getChildren(row) {
      let { data: res } = await addChild(
        this.cateId,
        row.attr_id,
        row.attr_name,
        row.attr_sel,
        row.attr_vals.join(",")
      );
      console.log(res);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.getData(this.cateId, this.activeName);
      }
    },

    async handleInputConfirm(row) {
      if (row.inputValue.trim().length == 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }
      let inputValue = row.inputValue.trim();
      if (inputValue) {
        console.log(this.attrId);
        // 添加子级

        row.attr_vals.push(inputValue);
        this.getChildren(row)
      }

      row.inputVisible = false;

      row.inputValue = "";
    },
    // 修改动态参数或静态属性
    async showEditData(data) {
      this.editDataForm = data;
      this.editDialogVisible = true;
    },
    // 修改动态参数或静态属性
    async editDataTrue() {
      let { data: res } = await editData(
        this.cateId,
        this.editDataForm.attr_id,
        this.editDataForm.attr_name,
        this.activeName
      );
      console.log(res);
      if ((res.meta.status = 200)) {
        this.$message.success(res.meta.msg);
        this.getData(this.cateId, this.activeName);
      }
      this.editDialogVisible = false;
    },
    // 删除动态参数或静态属性
    removeData(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.$axios.delete(
            `categories/${this.cateId}/attributes/${id}`
          );
          console.log(res);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.getData(this.cateId, this.activeName);
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
  padding: 20px 20px 0 20px;
  background: #fff;
  min-height: 500px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
