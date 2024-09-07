<template>
  <div>
    <el-form :inline="true" class="search-form">
      <el-form-item label="搜索">
        <el-input v-model="searchKeyword" placeholder="请输入邮箱或用户名或手机号码" style="width: 400px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleAdd">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户ID" prop="userId" />
      <el-table-column label="名字" prop="username">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="角色" prop="role">
        <template v-slot="roleoverrite">
          <span>{{ roleoverrite.row.role === 'admin' ? '管理员' : '读者' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle">

      <el-form :model="form" label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="读者" value="reader"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5,10, 20, 30, 40]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>


  </div>

</template>

<script lang="ts" setup>
import {
  type Users,
  UsersControllerService
} from '../../../generated'
import type { Ref } from 'vue'

interface TableDataItem {
  userId?: number;
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
  role?: any;
}

const tableData: Ref<TableDataItem[]> = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref<TableDataItem>({})
const searchKeyword = ref('')

const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
async function handleReset() {
  // 1. 清空输入框的内容，
  // 2. 重新获取数据
  searchKeyword.value = ''
  fetchData()
}

async function fetchData(): Promise<void> {
  try {
    const response: Users[] = await UsersControllerService.selectByPageUsingGet3(currentPage.value, pageSize.value)
    const bookStatusPromises: TableDataItem[] = response.list.map((user: Users) => ({
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone
    }))
    tableData.value = await Promise.all(bookStatusPromises)
    total.value = response.total
  } catch (error) {
    alert(error)
  }
}

async function handleAdd() {
  dialogTitle.value = '添加用户'
  form.value = {}
  dialogVisible.value = true
}

async function handleEdit(row: TableDataItem) {
  dialogTitle.value = '编辑用户'
  form.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: TableDataItem) {
  try {
    await UsersControllerService.deleteUsingDelete1(row.userId!)
    await fetchData()
  } catch (error) {
    alert('该条数据存在外键关联，无法删除')
  }
}

async function handleConfirm() {
  try {
    if (form.value.userId) {
      await UsersControllerService.updateUsingPut2(form.value)
    } else {
      await UsersControllerService.addUsingPost(form.value)
    }
    dialogVisible.value = false
    await fetchData()
  } catch (error) {
    alert(error)
  }
}

async function handleSearch() {
  try {
    const response: TableDataItem[] = await UsersControllerService.selectByPageUsingGet3(searchKeyword.value)
    tableData.value = response
  } catch (error) {
    alert(error)
  }
}

async function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  await fetchData()
}

async function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
  await fetchData()
}
onMounted(() => {
  fetchData()
})
</script>
<style>
.search-form {
  margin-left: 20%;
}
</style>
