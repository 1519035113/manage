<template>
  <div class="box">
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <el-steps
      :active="Number(active)"
      align-center
      finish-status="success"
      style="margin-top:20px;"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-tabs tab-position="left" v-model="active" style="min-height: 400px;">
  
      <el-tab-pane label="基本信息" name="0">
        <el-form :model="addGoodForm" :rules="rules" ref="addGoodForm" class="demo-ruleForm">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addGoodForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="addGoodForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="addGoodForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="pics">
            <el-cascader v-model="addGoodForm.pics" :options="options" :props="cateProp" @change="handleChange"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1" style="margin:20px;">
        
        <el-checkbox v-model="checked" label="备选项1" border></el-checkbox>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      <el-tab-pane label="完成" name="5">完成</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { cascaderList ,goodsCan } from "@/api/goods";
export default {
  data() {
    return {
      active: 0,
      options: [],
      addGoodForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics: [],
        
      },
      cateProp:{
          label:'cat_name',
          value:'cat_id',
          children:'children'
        },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度3到8个字符", trigger: "blur" }
        ]
      },
      checked:true,

    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getCascader(),
     this.getGoodCan()
  },
  watch: {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    // 获取商品分类内容
    async getCascader() {
      let {data :res} = await cascaderList()
      if(res.meta.status == 200){
        this.options = res.data
      }
      // console.log(res)
      // console.log(this.options)
    },
    // 获取商品参数
    async getGoodCan(){
      let {data :res} = await goodsCan(this.options.cat_id)
      console.log(res,
      this.options.cat_id)
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
</style>
