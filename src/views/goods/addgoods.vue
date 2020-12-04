<template>
  <div class="box">
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <el-steps
      :active="Number(activeIndex)"
      align-center
      finish-status="success"
      style="margin:20px 0;"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form
      label-width="100px"
      label-position="top"
      :model="addGoodForm"
      :rules="rules"
      ref="addGoodForm"
      class="demo-ruleForm"
    >
      <el-tabs
        tab-position="left"
        @tab-click="tabClick"
        :before-leave="beforeTabLeave"
        v-model="activeIndex"
        style="min-height: 400px;"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addGoodForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addGoodForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addGoodForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addGoodForm.goods_cat"
              :options="options"
              :props="cateProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1" style="margin:20px;">
          <el-form-item :label="item.attr_name" v-for="(item,index) in manyTabData" :key="index">
            <el-checkbox
              v-model="item.attr_vals"
              :label="it"
              v-for="(it,ind) in item.attr_vals"
              :key="ind"
              border
            ></el-checkbox>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form-item :label="item.attr_name" v-for="(item,index) in onlyTabData" :key="index">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            action="https://www.liulongbin.top:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <!-- 富文本编辑器组件 -->
          <quill-editor v-model="addGoodForm.goods_introduce" />
          <el-button style="margin-top:50px" @click="add" type="primary">添加商品</el-button>
        </el-tab-pane>
        
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { cascaderList, goodsCan,addGoods } from "@/api/goods";
import _ from "lodash";
export default {
  data() {
    return {
      activeIndex: 0,
      addForm: {},
      addFormRules: {},
      options: [], //商品分类列表
      addGoodForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: "",
        attrs: []
      },
      cateProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度3到8个字符", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      // checked: true,
      manyTabData: [], //动态参数列表数据
      onlyTabData: [], //静态属性列表数据
      headerObj: { Authorization: localStorage.getItem("token") } //图片上传组件的headers请求头对象
    };
  },
  computed: {
    cateId() {
      if (this.addGoodForm.goods_cat.length == 3) {
        return this.addGoodForm.goods_cat[2];
      }
      return null;
    }
  },
  created() {},
  mounted() {
    this.getCascader();
  },
  watch: {},
  methods: {
    handleChange(value) {
      // console.log(value.length);
      if (value.length !== 3) {
        this.addGoodForm.goods_cat = [];
        return;
      }
    },
    // 获取商品分类内容
    async getCascader() {
      let { data: res } = await cascaderList();
      if (res.meta.status == 200) {
        this.options = res.data;
      }
      // console.log(res)
      // console.log(this.options)
    },
    // 判断商品分类是否选择
    beforeTabLeave(active, oldActive) {
      // console.log(active,oldActive)
      if (oldActive == "0" && this.addGoodForm.goods_cat.length !== 3) {
        this.$message.error("请先选择商品分类！");
        return false;
      }
    },
    // 切换标签页触发事件
    async tabClick() {
      let many = "many";
      let only = "only";
      if (this.activeIndex == "1") {
        let { data: res } = await goodsCan(this.cateId, many);
        if (res.meta.status == 200) {
          res.data.forEach(item => {
            item.attr_vals =
              item.attr_vals.length == 0 ? [] : item.attr_vals.split(",");
            item.checked = true;
          });
          this.manyTabData = res.data;
        }
        console.log(res);
      } else if (this.activeIndex == "2") {
        let { data: res } = await goodsCan(this.cateId, only);
        console.log(res);
        if (res.meta.status == 200) {
          this.onlyTabData = res.data;
        }
      }
    },
    // 处理删除图片操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let filePath = file.response.data.tmp_path;
      let index = this.addGoodForm.pics.findIndex(x => {
        return (x.pic = filePath);
      });
      this.addGoodForm.pics.splice(i, 1);
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file);
    },
    // 监听图片上传成功返回数据
    handleUpload(reponse) {
      let picInfo = { pic: reponse.data.tmp_path };
      this.addGoodForm.pics.push(picInfo);
    },
     add() {
      this.$refs["addGoodForm"].validate(async valid => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项");
        }
        // 深拷贝addGoodForm
        let form = _.cloneDeep(this.addGoodForm);
        form.goods_cat = form.goods_cat.join(",");
        // console.log(form);
        // 处理动态参数
        this.manyTabData.forEach(item => {
          let newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(",")
          };
          this.addGoodForm.attrs.push(newInfo);
        });
        // 处理静态属性
        this.onlyTabData.forEach(item => {
          let newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          };
          this.addGoodForm.attrs.push(newInfo);
        });
        console.log(this.onlyTabData,this.manyTabData)
        form.attrs = this.addGoodForm.attrs
        console.log(form)
        // console.log(this.addGoodForm.attrs)

        let {data:res} = await addGoods(form)
        if(res.meta.status !== 201){
          this.$message.error(res.meta.msg)
        }else{
          this.$message.success(res.meta.msg)
          this.$router.push('/home/goods')          
        }
        
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.box {
  margin: 20px 0;
  /* min-height: 800px; */
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin: 5px 8px;
}
.el-checkbox {
  margin: 2px;
}
.quill-editor {
  height: 300px;
}
</style>
