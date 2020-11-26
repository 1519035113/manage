<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="log">
          <img src="../../assets/heima.png" alt />
          <p>电商后台管理系统</p>
        </div>
        <div class="logout">
          <el-button @click="logout" type="info">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside id="aside" width="64px">
          <el-col :span="12">
            <p class="status" @click="flag">|||</p>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#333744"
              text-color="#fff"
              :collapse="isCollapse"
              router
            >
              <el-submenu :index="item.path" v-for="(item,index) in menus" :key="index">
                <template slot="title">
                  <i :class="menuIcon[item.id]" style="padding-right:10px"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group v-for="(item,index) in item.children" :key="index">
                  <el-menu-item :index="item.path">
                    <i class="el-icon-menu"></i>
                    {{item.authName}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 页面主体 -->
        <el-main>
          <!-- 面包屑 -->
          <Bread></Bread>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Bread from "../../components/Bread";
export default {
  data() {
    return {
      isCollapse: true,
      menus: [],
      menuIcon:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getMenu();
  },
  watch: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    flag() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse == true) {
        aside.style.width = "64px";
      } else {
        aside.style.width = "200px";
      }
    },
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token");

          this.$message({
            type: "success",
            message: "退出登录成功!"
          });
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录"
          });
        });
    },
    async getMenu() {
      let res = await this.$axios.get("menus");
      console.log(res);
      this.menus = res.data.data;
    }
  },
  components: {
    Bread
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.log {
  display: flex;
  justify-content: space-around;
  font-size: 22px;
  color: #fff;
  line-height: 60px;
  img {
    width: 56px;
    height: 56px;
    margin-right: 15px;
  }
}
.logout {
  line-height: 60px;
}
.el-aside {
  background-color: #333744;
  color: #fff;
  
}
.el-col {
  width: 100%;
}
.el-menu {
  border: none;
}
.status {
  width: 100%;
  text-align: center;
  height: 22px;
  line-height: 22px;
  background: #4a5064;
}
.el-main {
  background-color: #eaedf1;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
