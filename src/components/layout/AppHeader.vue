<script setup="">
import { isCollapse } from '@/components/layout/isCollapse.ts'
import router from '@/router/index.ts'

function handleLogout() {
  ElMessage({
    message: '退出成功!',
    type: 'success',
    duration: 3000,
    showClose: true,
    customClass: 'custom-el-message'  // 可选：用于自定义样式
  })
  router.push('/')
  localStorage.removeItem('token')
  localStorage.removeItem('user')

}
function goToPersonCenter(){
  router.push('/personcenter')
}
</script>
<template>
  <el-header>

    <el-icon @click="isCollapse=!isCollapse">
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
    </el-icon>

    <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="50" :src="'src/assets/img_5.png'"></el-avatar>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToPersonCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>


  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #e8e3e3;
}

.el-dropdown {
  margin-left: auto;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}

// 作用  使得下拉菜单靠右

</style>
