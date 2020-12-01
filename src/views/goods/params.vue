<template>
  <div class="box">
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" effect="dark"></el-alert>
    <el-form style="margin-top:20px;">
      <el-form-item label="选阵商品分类" label-width="100px" prop="pics">
        <el-cascader v-model="pics" :options="options" :props="cateProp" @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="动态参数">
        <el-button type="primary" size="mini">添加参数</el-button>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>
                  <el-tag
                    closable
                    :disable-transitions="false"
                    @close="handleClose(props.row.attr_id)"
                  >{{props.row.attr_vals}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="name">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性">
        <el-button type="primary" size="mini">添加属性</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { cascaderList, goodsCan, removeAttr } from "@/api/goods";
export default {
  data() {
    return {
      pics: [],
      options: [],
      cateProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      tableData: [],
      inputVisible: false,
      inputValue: "",
      attrId: 0,
      tag: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getCascader();
  },
  watch: {},
  methods: {
    async handleChange(a) {
      console.log(a);
      this.attrId = a[2];
      let { data: res } = await goodsCan(a[2]);
      if (res.meta.status == 200) {
        this.tableData = res.data;
      }
      console.log(res);
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
    async handleClose(tag) {
      
      this.tag = tag;
      let { data: res } = await removeAttr(
        this.attrId,
        tag,
        this.tableData[0].attr_name,
        this.tableData[0].attr_sel,
        this.tableData[0].attr_vals
      );
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      }

      
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm() {
      
      let inputValue = this.inputValue;
      if (inputValue) {
        console.log(this.attrId,this.tag);
        this.tableData[0].attr_vals+=','+inputValue;
        let { data: res } = await removeAttr(
          this.attrId,
          this.tableData[0].cat_id,
          this.tableData[0].attr_name,
          this.tableData[0].attr_sel,
          this.tableData[0].attr_vals
        );
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
        }
        console.log(this.tableData)
      }
      this.inputVisible = false;
      this.inputValue = "";
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
