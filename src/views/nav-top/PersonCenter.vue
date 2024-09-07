<template>
  <div class="container">
    <el-card class="header-card">
      <template v-slot:header>
        <div class="clearfix"><strong>
          {{ user.username }}
        </strong> 你好！ 欢迎进入美育绘本屋图书管理后台
        </div>
      </template>
    </el-card>

    <div class="left-side">
      <el-card class="left-top-card">
        <template v-slot:header>
          <div class="clearfix">个人简介</div>
        </template>
        <div class="fontstyle">
          <p>用户名：{{ user.username }}</p>
          <p>角色：{{ user.role }}</p>
          <p>手机号码：{{ user.phone ? user.phone : '在编辑中' }} </p>
          <p>邮箱：{{ user.email ? user.email : '在编辑中' }}</p>

        </div>
      </el-card>
      <el-card class="left-bottom-card">
        <template v-slot:header>
          <div class="clearfix">技术栈</div>
        </template>
        <div class="fontstyle">
          <p>
            后台：Servlet+JavaSeverPage+JavaBean
          </p>

          <p>
            前台：Vue+HTML+CSS+JavaScript+Element-Plus+Vue-Router+Axios
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

        <div class="clearfix">修改密码</div>
        <el-divider />
        <div class="BookClassifystyle">
          <el-form :model="form" :rules="rules">
            <el-form-item label="原密码" prop="oldPassword" required>
              <el-input v-model="form.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" required>
              <el-input v-model="form.newPassword" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" required>
              <el-input v-model="form.confirmPassword" />
            </el-form-item>
            <el-form-item style="justify-content: center">
              <el-button type="primary" @click="handleConfirm">确定</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
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
  font-family: 'cursive,fantasy,宋体,微软雅黑', serif;
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
  justify-content: center;
}
</style>
<script lang="ts" setup>
import { useUserStore } from '@/stores/counter.ts'
import { UsersControllerService } from '../../../generated'

const userStore = useUserStore()
const user = userStore.user
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const rules = ref({
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
})

const handleConfirm = async () => {
  // 如果表单有任何一项为空
  if (!form.value.oldPassword || !form.value.newPassword || !form.value.confirmPassword) {
    ElMessage({
      message: '请填写完整信息!',
      type: 'error',
      duration: 3000
    })
    return
  }
  if (form.value.newPassword !== form.value.confirmPassword) {
    ElMessage({
      message: '新密码和确认密码不一致!',
      type: 'error',
      duration: 3000
    })
    return
  }
  try {
    const res = await UsersControllerService.updatePasswordUsingPost({
      userId: user.userId,
      oldPwd: form.value.oldPassword,
      newPwd: form.value.newPassword
    })

    if (res.code === 200) {
      ElMessage({
        message: '密码修改成功!',
        type: 'success',
        duration: 3000
      })
      handleReset()
    } else {
      ElMessage({
        message: res.message || '密码修改失败!',
        type: 'error',
        duration: 3000
      })
    }
  } catch (error) {
    console.error('修改密码出错:', error)
    ElMessage({
      message: '修改密码过程中出现错误,请稍后再试',
      type: 'error',
      duration: 3000
    })
  }
}
const handleReset = () => {
  form.value.oldPassword = ''
  form.value.newPassword = ''
  form.value.confirmPassword = ''
}
</script>
