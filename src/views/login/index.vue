<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>登 录</h2>
      <div class="form-group">
        <label for="username">用户名</label>
        <input id="username" v-model="username" required type="text" />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input id="password" v-model="password" required type="password" />
      </div>
      <div class="form-group">
        <label for="role">角色</label>
        <el-select v-model="role" placeholder="请选择角色">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="读者" value="reader"></el-option>
        </el-select>
      </div>
      <div class="form-group">
        <label for="captcha">验证码</label>
        <div class="captcha-container">
          <input id="captcha" v-model="captcha" required type="text" />
          <img :src="captchaUrl" alt="验证码" @click="getCaptcha" />
        </div>
      </div>
      <button class="login-button" type="submit">Login</button>
      <div class="register-description">
        还没有账号？
        <router-link to="/register">前往注册</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UsersControllerService } from '../../../generated'
import router from '@/router'
import { useUserStore } from '@/stores/counter.ts'
import { OpenAPI } from '../../../generated'

const username = ref('')
const password = ref('')
const role = ref('')
const captcha = ref('')
const captchaUrl = OpenAPI.BASE+'/users/captcha?'+new Date().getTime()
const userStore = useUserStore()



const login = async () => {
  const loginVo = {
    username: username.value,
    password: password.value,
    role: role.value,
    captcha: captcha.value
  };

  try {
    const res = await UsersControllerService.loginUsingPost1(loginVo);
    handleLoginResponse(res);
  } catch (error) {
    handleLoginError(error);
  }
};

const handleLoginResponse = (res) => {
  if (res.code === 200) {
    showMessage('登录成功!', 'success');
    userStore.setUser(res.data); // 存储用户信息
    OpenAPI.TOKEN = userStore?.user?.token; // 设置全局token
    localStorage.setItem('token', OpenAPI.TOKEN); // 存储token到localStorage
    router.push('/layout');
  } else {
    handleLoginError(res);
  }
};

const handleLoginError = (error) => {
  if (error.code === 1001) {
    showMessage('验证码错误!', 'error');
  } else if (error.code === 400) {
    showMessage('用户名或密码错误!', 'error');
  } else {
    showMessage('登录失败，请稍后再试!', 'error');
  }
};

const showMessage = (message, type) => {
  ElMessage({
    message,
    type,
    duration: 3000
  });
};

</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  background-image: url('@/assets/img_4.png'); // 替换为你的背景图片路径
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  opacity: 0.8;
}

.login-form h2 {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-description {
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-container input {
  flex: 1;
  margin-right: 1rem;
}

.captcha-container img {
  cursor: pointer;
}
</style>
