<template>
  <div>
    <!--    <el-form :inline="true" class="search-form">-->
    <!--      <el-form-item label="搜索">-->
    <!--        <el-input v-model="searchKeyword" placeholder="请输入书籍名称" style="width: 300px" />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item>-->
    <!--        <el-button type="primary" @click="handleSearch">搜索</el-button>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item>-->
    <!--        <el-button type="danger" @click="handleReset">重置</el-button>-->
    <!--      </el-form-item>-->

    <!--    </el-form>-->


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="借阅ID" prop="recordId"></el-table-column>
      <el-table-column label="图书名称" prop="bookTitle"></el-table-column>
      <el-table-column label="所属图书馆" prop="libraryName"></el-table-column>
      <el-table-column label="借阅日期" prop="borrowDate">
        <template #default="scope">
          {{ formatDate(scope.row.borrowDate) }}
        </template>
      </el-table-column>
      <el-table-column label="归还日期" prop="returnDate">
        <template #default="scope">
          {{ formatDate(scope.row.returnDate) }}
        </template>
      </el-table-column>
      <el-table-column label="借阅">
        <template #default="scope">
          <el-button
            v-if="scope.row.status !== 'available'"
            type="danger"
            @click="handleReturn(scope.row)"
          >待归还
          </el-button>
          <el-tag v-else type="success">已归还</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="user?.role==='admin'" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="100px">
        <el-form-item label="借阅ID">
          <el-input v-model="form.readerId" />
        </el-form-item>
        <el-form-item label="图书ID">
          <el-input v-model="form.bookId" />
        </el-form-item>
        <el-form-item label="读者ID">
          <el-input v-model="form.readerId" />
        </el-form-item>
        <el-form-item label="借阅日期">
          <el-input :value="formatDate(form.borrowDate)" disabled />
        </el-form-item>
        <el-form-item label="归还日期">
          <el-input :value="formatDate(form.returnDate)" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="returnDialogVisible" title="确认归还">
      <span>确定要归还这本书吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="returnDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReturn">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5,10, 20, 50, 100]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

  </div>

</template>

<script lang="ts" setup>
import {
  BooksControllerService,
  type Borrowrecords,
  BorrowrecordsControllerService, LibraryControllerService
} from '../../../generated'
import type { Ref } from 'vue'
import { useUserStore } from '@/stores/counter.ts'

interface TableDataItem {
  bookId?: number;
  borrowDate?: string;
  readerId?: number;
  recordId?: number;
  returnDate?: string;
}

const tableData: Ref<TableDataItem[]> = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref<TableDataItem>({})
const dateRange = ref([])
const searchKeyword = ref('')
const userStore = useUserStore()
const user = userStore.user
const returnDialogVisible = ref(false)
const returnForm = ref<TableDataItem>({})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)


async function fetchData(): Promise<void> {
  try {
    const borrowRecords: TableDataItem[] = await BorrowrecordsControllerService.selectPageByUserIdUsingGet(user.userId, currentPage.value, pageSize.value)
    const bookStatusPromises = borrowRecords.list.map(async (record) => {
      const book = await BooksControllerService.selectOneUsingGet1(record.bookId!)
      const library = await LibraryControllerService.selectOneUsingGet3(book.libraryId!)
      console.log('Fetched library:', library) // 打印图书信息
      return { ...record, status: book.status, bookTitle: book.title, libraryName: library.libraryName }
    })
    tableData.value = await Promise.all(bookStatusPromises)
    total.value = borrowRecords.total
    console.log('Fetched table data:', tableData.value) // 打印表格数据
  } catch (error) {
    alert(error)
  }
}


async function handleReset() {
  // 1. 清空日期范围选择框的内容
  dateRange.value = []

  // 2. 重新获取数据
  await fetchData()
}

async function handleAdd() {
  dialogTitle.value = '添加订单'
  form.value = {}
  dialogVisible.value = true
}

/**
 *  处理归还
 * @param row
 */
async function handleReturn(row: TableDataItem) {
  returnForm.value = { ...row }
  returnDialogVisible.value = true
}

/**
 *  确认归还
 */
async function confirmReturn() {
  try {
    await BooksControllerService.updateStatusByBookIdUsingPut({
      bookId: returnForm.value.bookId,
      status: 'available'
    })
    // 在BorrowrecordsControllerService调用delele删除借阅记录
    await BorrowrecordsControllerService.deleteByPrimaryKeyUsingDelete1(returnForm.value.recordId!)
    returnDialogVisible.value = false
    await fetchData()
  } catch (error) {
    alert(error)
  }
}

/**
 *  根据归还日期查询
 */

async function searchOrders(): Promise<void> {
  if (dateRange.value.length === 2) {
    const startDate = dateRange.value[0]
    const endDate = dateRange.value[1]
    try {
      const response: Borrowrecords[] = await BorrowrecordsControllerService.selectAllByReturnDateBetweenUsingGet(startDate, endDate)

      tableData.value = response
    } catch (error) {
      alert(error)
    }
  } else {
    fetchData()
  }
}

/**
 *  根据借出日期查询
 * @param row
 */
async function searchOrdersBorrowed(): Promise<void> {
  if (dateRange.value.length === 2) {
    const startDate = dateRange.value[0]
    const endDate = dateRange.value[1]
    try {
      const response: Borrowrecords[] = await BorrowrecordsControllerService.selectByBorrowDateBetweenUsingGet(startDate, endDate)
      tableData.value = response
    } catch (error) {
      alert(error)
    }
  } else {
    fetchData()
  }
}


async function handleEdit(row: TableDataItem) {
  dialogTitle.value = '编辑订单'
  form.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: TableDataItem) {
  try {
    await BorrowrecordsControllerService.deleteByPrimaryKeyUsingDelete1(row.recordId!)
    await fetchData()
  } catch (error) {
    alert('该条数据存在外键关联，无法删除')
  }
}

async function handleConfirm() {
  try {
    if (form.value.recordId) {
      await BorrowrecordsControllerService.updateByPrimaryKeyUsingPut1(form.value)
    } else {
      await BorrowrecordsControllerService.insertUsingPost2(form.value)
    }
    dialogVisible.value = false
    await fetchData()
  } catch (error) {
    alert(error)
  }
}

function formatDate(date: string): string {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function handleSearch() {
  try {
    // todo
    const response: TableDataItem[] = await BorrowrecordsControllerService.selectByBookTitleUsingGet(searchKeyword.value)
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
</style>
