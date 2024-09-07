

<template>
  <div class="container">
    <el-card class="header-card">
      <template v-slot:header>
        <div class="clearfix"> {{user.username}} 你好！ 欢迎进入美育绘本屋图书管理后台</div>
      </template>

    </el-card>

    <div class="left-side">
      <el-card class="left-top-card">
        <template v-slot:header>
          <div class="clearfix">项目简介</div>
        </template>
        <div class="fontstyle">
          <p>本系统是一个图书管理系统，主要功能有：</p>
          <p>1.图书的增删改查</p>
          <p>2.读者的增删改查</p>
          <p>3.借阅记录的增删改查</p>
          <p>4.管理员的增删改查</p>
          <p>5.读者借阅图书的功能</p>
          <p>..................</p>

        </div>
      </el-card>
      <el-card class="left-bottom-card">
        <template v-slot:header>
          <div class="clearfix">技术栈</div>
        </template>
        <div class="fontstyle">
          <p>
            后台：SpringBoot3+MyBatis/MyBatis-plus+WT+Hutool
          </p>

          <p>
            前台：Vue3+Element-Plus+Vue-Router+Axios
          </p>
          <p>
            数据库：Mysql5.7/8.0
          </p>
          <p>
            编程工具：Eclipse、Navicat
          </p>
          <p>
            横式：前后端分离
          </p>
          <p>
            操作系统：Window/Mac
          </p>

        </div>
      </el-card>
    </div>

    <el-card class="right-card">
      <template v-slot:header>

        <div class="clearfix">图书类型分布</div>
        <div class="BookClassifystyle">
          <BookClassifyChart />
        </div>
      </template>


    </el-card>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 30% 65%;
  grid-template-rows: auto auto;
  grid-gap: 10px;
}

.header-card {
  grid-column: span 2;

}

.fontstyle {
  font-family: 'cursive,fantasy,宋体,微软雅黑',serif;
  font-weight: lighter;
  font-size: 15px;
  word-spacing: 29px;
  line-height: 2;
  text-shadow: 0px 0px 0px;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
}

.left-top-card,
.left-bottom-card {
  height: 300px;

}


.right-card {
  grid-row: span 2;
  height: 610px;
  margin-left: 65px;

}

.BookClassifystyle {
  display: flex;
  margin-top: 100px;
  height: 100vh;
}
</style>
<script lang="ts" setup>
import { useUserStore } from '@/stores/counter.js'

const user = useUserStore().user

import BookClassifyChart from '@/views/charts/BookClassifyChart.vue'
</script>
