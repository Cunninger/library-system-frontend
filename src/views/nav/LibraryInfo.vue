<template>
  <div>
    <el-form :inline="true" class="search-form">
      <el-form-item label="搜索">
        <el-input v-model="searchKeyword" placeholder="请输入书籍分类或者书籍描述" style="width: 300px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button v-if="user.role === 'admin'" type="primary" @click="handleAdd">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="图书馆编号" prop="libraryId" width="280">
      </el-table-column>
      <el-table-column label="图书馆名称" prop="libraryName" width="280" />
      <el-table-column label="地址" prop="address" width="380" />
      <el-table-column v-if="user?.role === 'admin'" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="100px">
        <el-form-item label="图书馆名称">
          <el-input v-model="form.libraryName" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { BookclassificationControllerService, LibraryControllerService } from '../../../generated'
import { useUserStore } from '@/stores/counter'

interface TableDataItem {
  address?: string;
  libraryId?: number;
  libraryName?: string;
}

const tableData: Ref<TableDataItem[]> = ref([])
const searchKeyword = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref<TableDataItem>({})
const user = useUserStore().user
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

async function fetchData(): Promise<void> {
  try {
    const response = await LibraryControllerService.selectByPageUsingGet2(currentPage.value, pageSize.value)
    tableData.value = response.list //
    total.value = response.total
  } catch (error) {
    alert(error)
  }
}

async function handleAdd() {
  dialogTitle.value = '添加书籍分类'
  form.value = {}
  dialogVisible.value = true
}

async function handleEdit(row: TableDataItem) {
  dialogTitle.value = '编辑图书'
  form.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: TableDataItem) {
  try {
    await LibraryControllerService.deleteByPrimaryKeyUsingDelete2(row.libraryId!)
    await fetchData()
  } catch (error) {
    alert('该条数据存在外键关联，无法删除')
  }
}

async function handleConfirm() {
  try {
    if (form.value.libraryId) {
      await LibraryControllerService.updateUsingPut1(form.value)
    } else {
      await LibraryControllerService.insertUsingPost3(form.value)
    }
    dialogVisible.value = false
    await fetchData()
  } catch (error) {
    alert(error)
  }
}

async function handleSearch() {
  currentPage.value = 1
  await fetchData()
}

async function handleReset() {
  searchKeyword.value = ''
  currentPage.value = 1
  await fetchData()
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
