<template>
  <div class="box">
    <el-input style="margin-top:20px;" placeholder="请输入内容" v-model="query">
      <el-button @click="getUser()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="addUser" type="primary">添加用户</el-button>
    <el-table :data="UserData" style="width: 100%" border :row-class-name="tableRowClassName">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            @change="userStatus(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button @click="remUser(scope.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip class="item" effect="dark" content="权限分配" placement="top">
            <el-button
              @click="setUser(scope.row)"
              type="primary"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
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
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>
    <!-- 编辑弹框 -->
    <el-dialog title="添加用户" width="560px" :visible.sync="editFlag">
      <el-form :model="editForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="100px">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFlag = false">取 消</el-button>
        <el-button type="primary" @click="editTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" width="560px" :visible.sync="addFlag">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" label-width="100px">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFlag = false">取 消</el-button>
        <el-button type="primary" @click="addTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配角色" width="560px" :visible.sync="allotRoleFlag">
      <el-form>
        <el-form-item label="当前用户" label-width="100px">
          <span>{{allotRoleForm.username}}</span>
        </el-form-item>
        <el-form-item label="当前的角色" label-width="100px">
          <span>{{allotRoleForm.role_name}}</span>
        </el-form-item>
        <el-form-item>
          <el-select v-model="allotRole" placeholder="请选择">
            <el-option
              v-for="(item,index) in allotRoles"
              :key="index"
              :value="item.id"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotRoleFlag = false">取 消</el-button>
        <el-button type="primary" @click="allotRoleTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllotRole, getRole } from "@/api/user";
export default {
  data() {
    return {
      UserData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      totals: 2,
      status: true,
      addFlag: false,
      editFlag: false,
      addForm: {
        //添加弹框信息
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        //添加弹框信息验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      editForm: {
        //修改弹框信息
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      allotRoleForm: [],
      allotRoleFlag: false,
      allotRoles: {},
      allotRole:[],
      allotId: null
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getUser();
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUser();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUser();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 获取列表信息
    async getUser() {
      let res = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      //   console.log(res);
      if (res.status == 200) {
        this.UserData = res.data.data.users;
        this.totals = res.data.data.total;
      }
    },
    // 修改状态
    async userStatus(id, state) {
      let res = await this.$axios.put(`users/${id}/state/${state}`);
      if (res.status == 200) {
        this.$message.success(res.data.meta.msg);
        this.getUser();
      }
    },
    // 添加用户弹框
    addUser() {
      this.addFlag = true;
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    },
    // 添加用户
    async addTrue() {
      let res = await this.$axios.post("users", this.addForm);
      if (res.status == 200) {
        this.$message.success(res.data.meta.msg);
        this.getUser();
        this.addFlag = false;
      }
    },
    // 修改用户信息弹框
    editUser(data) {
      this.editFlag = true;
      this.editForm = data;
    },
    // 修改用户信息
    async editTrue() {
      let res = await this.$axios.put(
        `users/${this.editForm.id}`,
        this.editForm
      );
      if (res.status == 200) {
        this.$message.success(res.data.meta.msg);
        this.getUser();
      }
      this.editFlag = false;
    },
    // 删除用户信息
    async remUser(id) {
      let res = await this.$axios.delete(`users/${id}`);

      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (res.status == 200) {
            this.$message.success(res.data.meta.msg);
            this.getUser();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async setUser(data) {
      let { data: res } = await getRole();
    //  console.log(res.data)
      this.userId = data.id
      
      if (res.meta.status == 200) {
        
        this.allotRoles = res.data
      }
      this.allotRoleForm = data;
      this.allotRoleFlag = true;
    },
    async allotRoleTrue() {
   
      let { data: res } = await getAllotRole(this.userId,this.allotRole);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      } else {
        this.$message.error(res.meta.msg);
      }
      this.allotRoleFlag = false;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 20px;
  padding-left: 20px;
  background: #fff;
}

.el-table .warning-row {
  background: oldlace;
}
.el-input {
  margin-right: 20px;
  width: 350px;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
