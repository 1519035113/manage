<template>
  <div class="box">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" label="#"  ></el-table-column>
      <el-table-column prop="authName" label="权限名称"  ></el-table-column>
      <el-table-column prop="path" label="路径" ></el-table-column>
      <el-table-column prop="level" label="权限等级" >
          <template slot-scope="scope">
              <el-tag v-if="scope.row.level == 0" type="">{{level[scope.row.level]}}</el-tag>
              <el-tag v-else type="success">{{level[scope.row.level]}}</el-tag>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRight} from '@/api/power'
export default {
  data() {
    return {
        tableData:[],
        level:{
            0:'一级',
            1:'二级',
            2:'三级'
        }
    };
  },
  computed: {},
  created() {},
  mounted() {
      this. getData()
  },
  watch: {},
  methods: {
    //   获取权限列表数据
     async getData(){
          let {data:res} = await getRight()
            console.log(res)
            if(res.meta.status ==200){
                this.tableData= res.data
            }
      }
  },
  components: {},
  filters:{
      state(e){
          e == 0 ? '' : success
      }
  }
};
</script>

<style scoped>
.box{
    background: #fff;
    margin-top: 20px;
    padding: 20px 0 0 20px;
}
</style>
