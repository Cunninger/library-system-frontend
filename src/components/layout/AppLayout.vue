<script lang="ts" setup>

</script>
<template>
  <div class="common-layout">
    <el-container>
      <AppAside />


      <el-container class="header-and-main">
        <AppHeader />

        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;// 使得header和main垂直排列
  height: 100vh;
}
</style>
