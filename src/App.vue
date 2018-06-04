<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu class="navbar" mode="horizontal">
          <el-menu-item class="navbar-brand" index="0">
            <i class="el-icon-share"></i>NME在线社交网络演化模型</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside class="side-menu-container" width="200px">
          <el-menu text-color="#300232" active-text-color="#c43235" default-active="2">
            <el-menu-item index="2" @click="$router.push('/evolution')">
              <i class="el-icon-share"></i>
              <span slot="title">模型演化过程</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/comparison')">
              <i class="el-icon-news"></i>
              <span slot="title">真实数据集对比分析</span>
            </el-menu-item>
            <!-- <el-menu-item index="4" @click="$router.push('setting')">
              <i class="el-icon-setting"></i>
              <span slot="title">用户设置</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
      </el-container>
      <el-footer>
        <el-row type="flex" justify="center">
          <ul class="footer-list">
            <li>
              <a href="mailto:cuijiahetony@163.com">联系开发者</a>
            </li>
            <li>
              <router-link to="">相关论文</router-link>
            </li>
          </ul>
        </el-row>
        <el-row type="flex" justify="center">
          <ul class="footer-list">
            <li>
              NME在线社交网络演化模演示系统
              <small>©2018</small>
            </li>
          </ul>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted: function () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
@import "./assets/css/common.scss";
body {
  margin: 0;
  padding: 0;
  .side-menu-container {
    .el-menu {
      border-left: solid 1px #e6e6e6;
      border-right: none;
      position: fixed;
      .el-menu-item {
        &:hover,
        &.is-active {
          background-color: $clr_w !important;
        }
      }
    }
  }
  .el-header,
  .el-footer {
    padding: 0;
  }
  .el-footer {
    background-color: $clr_p;
    height: 80px !important;
    box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.9);
    .footer-list {
      margin-top: 12px;
      margin-bottom: 2px;
      color: $clr_w;
      li {
        display: inline;
        list-style: none;
        padding: 0 5px;
        a {
          text-decoration: none;
          color: $clr_r;
        }
      }
    }
  }
  .el-card {
    color: $clr_r !important;
  }
}
.navbar {
  background-color: $clr_b;
  .navbar-brand {
    &:hover {
      background-color: $clr_b !important;
    }
    &.is-active {
      background-color: $clr_b !important;
    }
    color: $clr_w !important;
    font-size: 16px;
    i {
      font-size: 23px !important;
      color: $clr_r !important;
    }
  }
}
</style>
