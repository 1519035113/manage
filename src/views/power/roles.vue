<template>
  <div class="box">
    <el-button @click="addRoles" type="primary">添加用户</el-button>

    <el-table style="margin-top:20px;width: 100%" :data="tableData" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            :class="['bdbottom', index == 0 ? 'bdtop' :'','bdleft','aic' ]"
            v-for="(item,index) in scope.row.children"
            :key="index"
          >
            <el-col :span="5">
              <el-tag
                closable
                @close="removeTag(scope.row,item.id)"
                style="margin:10px;"
              >{{item.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row
                :class="[index2 == 0?'':'bdtop','bdleft','aic']"
                v-for="(item2,index2) in item.children"
                :key="index2"
              >
                <el-col :span="6">
                  <el-tag
                    closable
                    @close="removeTag2(scope.row,item2.id)"
                    type="success"
                    style="margin:10px;"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="(item3,index3) in item2.children"
                    :key="index3"
                    type="warning"
                    closable
                    @close="removeTag3(scope.row,item3.id)"
                    style="margin:10px;"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editRoles(scope.row)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button
            @click="remRoles(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
          <el-button @click="setRoles(scope.row)" type="success" icon="el-icon-setting" size="mini">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加弹框 -->
    <el-dialog title="添加角色" width="560px" :visible.sync="roleFlag">
      <el-form :model="roleForm" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" prop="roleName" label-width="100px">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFlag = false">取 消</el-button>
        <el-button type="primary" @click="roleTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="修改角色" width="560px" :visible.sync="editRoleFlag">
      <el-form :model="editRoleForm" :rules="editRules" ref="editroleForm">
        <el-form-item label="角色名称" prop="roleName" label-width="100px">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFlag = false">取 消</el-button>
        <el-button type="primary" @click="editRoleTrue">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限弹框 -->
    <el-dialog title="分配权限" width="560px" @close="setDialogClose" :visible.sync="quanFlag">
      <el-tree
      ref="treeRef"
        :data="shuData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="defkeys"
        :props="treeProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quanFlag = false">取 消</el-button>
        <el-button type="primary" @click="quanTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoles,
  addRoles,
  editRoles,
  removeRoles,
  removeRolesPower,
  getShuData,
  getFenData
} from "@/api/power";
export default {
  data() {
    return {
      tableData: [],
      shuData: [],
      defkeys:[],
      roleFlag: false,
      editRoleFlag: false,
      quanFlag: false,
      roleForm: {
        //添加角色
        roleName: "",
        roleDesc: ""
      },
      rules: {
        //添加角色验证
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      editRoleForm: {
        //修改角色
        id: null,
        roleName: "",
        roleDesc: ""
      },
      editRules: {
        //修改角色验证
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      treeProps:{
        label:'authName',
        children:'children'
      },
      treeId:null
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.gUsers();
  },
  watch: {},
  methods: {
    // 获取角色列表
    async gUsers() {
      let { data: res } = await getRoles();
      // console.log(res);
      if (res.meta.status == 200) {
        // this.$message.info(res.meta.msg);
        this.tableData = res.data;
      }
    },
    // 添加角色弹框
    addRoles() {
      this.roleFlag = true;
      this.$nextTick(() => {
        this.$refs["roleForm"].resetFields();
      });
    },
    // 添加角色
    async roleTrue() {
      let { data: res } = await addRoles(this.roleForm);
      console.log(res);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
        this.gUsers();
      }
      this.roleFlag = false;
    },
    // 修改角色弹框
    editRoles(data) {
      this.editRoleFlag = true;
      this.editRoleForm = data;
      console.log(data);
    },
    async editRoleTrue() {
      let { data: res } = await editRoles(
        this.editRoleForm.roleName,
        this.editRoleForm.roleDesc,
        this.editRoleForm.id
      );
      if (res.meta.status == 200) {
        this.$message.success("修改成功");
        this.gUsers();
      }
      this.editRoleFlag = false;
    },
    async remRoles(id) {
      let { data: res } = await removeRoles(id);
      console.log(res);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.gUsers();
          }
          return false;
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 获取分配权限数据
  // 监听权限分配
  setDialogClose(){
    this.defkeys = []
  },
    // 分配权限弹框
    async setRoles(role) {
      this.treeId = role.id
      // 保存id
      let { data: res } = await getShuData();
      if ((res.meta.status = 200)) {
        this.shuData = res.data;
      }

      this.getdefkeys(role,this.defkeys)

      this.quanFlag = true;
    },
    getdefkeys(role,arr){
      if(!role.children){
        return arr.push(role.id)
      }else{
        role.children.forEach(item=>{
         return this.getdefkeys(item,arr)
        })
      }
    },
    // 分配权限
    async quanTrue() {
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        // 返回目前被选中的节点的key
        ...this.$refs.treeRef.getHalfCheckedKeys()
        // 若节点可被选中则返回目前半选中的节点的key
        ]
  
      let keys2 = keys.join(',')
      
      let {data:res} = await getFenData(this.treeId,keys2)
      console.log(res)
      if(res.meta.status == 200){
        this.$message.success(res.meta.msg)
        this.gUsers()
      }else{
        this.$message.error(res.meta.msg)
      }
      this.quanFlag = false
    },
    // 删除三级
    removeTag3(roles, rights) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await removeRolesPower(roles, rights);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            // this.gUsers();
            roles.children = res.data;
          }
          return false;
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 删除二级
    removeTag2(roles, rights) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await removeRolesPower(roles, rights);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            // this.gUsers();
            roles.children = res.data;
          }
          return false;
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 删除一级
    removeTag(roles, rights) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await removeRolesPower(roles, rights);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            // this.gUsers();
            roles.children = res.data;
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
  background: #fff;
  padding: 20px 0 0 20px;
  margin: 20px 0 0 0;
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
.bdtop {
  border-top: 1px solid #efefef;
}
.bdbottom {
  border-bottom: 1px solid #efefef;
}
.bdleft {
  border-left: 1px solid #efefef;
}
.aic {
  display: flex;
  align-items: center;
}
</style>
