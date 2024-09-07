<script setup="">
import { isCollapse } from '@/components/layout/isCollapse.ts'
import { ChatDotRound, EditPen, ElementPlus, HomeFilled, Notebook, StarFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/counter.ts'

const userStore = useUserStore()
const user = userStore.user
</script>
<template>
  <el-aside>
    <el-scrollbar>
      <el-menu :collapse="isCollapse" router unique-opened>
        <a class="logo" href="/layout">
          <img alt="" src="@/assets/img_6.png" style="width: 60px; height: 50px;"/>
          <h1 style="font-family: '宋体';
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            color: #696969;
            text-decoration: initial;
            letter-spacing: 3px;
        text-shadow: 0px 0px 7px;"> 美育绘本屋</h1>
        </a>
        <el-menu-item index="/layout">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span> 系统首页</span>
        </el-menu-item>




        <!--         信息管理          -->
        <el-sub-menu>
          <template #title>
            <el-icon>
              <ChatDotRound />
            </el-icon>
            <span> 信息管理</span>
          </template>

          <el-menu-item index="/bookclassify">
            <el-icon>
              <ElementPlus />
            </el-icon>
            <span> 图书分类</span>
          </el-menu-item>

          <el-menu-item index="/bookallinfo">
            <el-icon>
              <Notebook />
            </el-icon>
            <span> 图书信息</span>
          </el-menu-item>

          <el-menu-item index="/myborrowedpage">
            <el-icon><StarFilled /></el-icon>
            <span> 我的借阅</span>
          </el-menu-item>


          <el-menu-item v-if=" user?.role==='admin'" index="/borrowedpage">
            <el-icon>
              <EditPen />
            </el-icon>
            <span> 借阅管理</span>
          </el-menu-item>


        </el-sub-menu>




        <el-sub-menu v-if="user.role==='admin'">
          <template #title>
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span> 系统管理</span>
          </template>
          <el-menu-item index="/userpage">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span> 用户管理</span>
          </el-menu-item>

          <el-menu-item index="/libraryinfo">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span> 图书馆管理</span>
          </el-menu-item>


        </el-sub-menu>


      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #eee;
  height: 100vh;
  width: auto;
}

.el-menu {
  width: 200px;
  background-color: #eee;
  color: #fff;
  border-right: none;

  &.el-menu--collapse {
    width: 64px;

    & h1 {
      display: none;
      // 解释 & 的作用
      // 1. & 代表当前选择器的父级选择器
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;

  img {
    width: 28px;
    height: 28px
  }
}
</style>
