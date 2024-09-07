<template>
  <div>
    <!--    <div style="margin-bottom: 50px">-->
    <!--      <el-select v-model="queryType" placeholder="请选择" style="width: 200px">-->
    <!--        <el-option label="归还日期" value="returnDate"></el-option>-->
    <!--        <el-option label="借阅日期" value="borrowDate"></el-option>-->
    <!--      </el-select>-->
    <!--      <el-date-picker-->
    <!--        v-model="dateRange"-->
    <!--        end-placeholder="结束日期"-->
    <!--        range-separator="至"-->
    <!--        start-placeholder="开始日期"-->
    <!--        type="daterange"-->
    <!--        value-format="YYYY-MM-DD"-->
    <!--      />-->
    <!--      <el-button type="primary" @click="searchOrders">搜索</el-button>-->
    <!--      <el-button type="danger" @click="handleReset">重置</el-button>-->
    <!--      <el-button style="margin-left: 450px" type="primary" @click="handleExport">导出报表</el-button>-->
    <!--    </div>-->


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="借阅ID" prop="recordId" width="180">
      </el-table-column>

      <el-table-column label="图书名称" prop="bookId" />
      <el-table-column label="用户ID" prop="userId" />
      <el-table-column label="借阅日期" prop="borrowDate">
        <template #default="scope">
          {{ formatDate(scope.row.borrowDate) }}
        </template>
      </el-table-column>
      <el-table-column label="归还日期" prop="returnDate" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.returnDate) }}
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
          <el-input :value="formatDate(<string>form.borrowDate)" disabled />
        </el-form-item>
        <el-form-item label="归还日期">
          <el-input :value="formatDate(<string>form.returnDate)" disabled />
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
  BorrowrecordsControllerService
} from '../../../generated'
import type { Ref } from 'vue'
import { useUserStore } from '@/stores/counter'

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
const queryType = ref('returnDate')
const user = useUserStore().user


// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

async function fetchData(): Promise<void> {
  try {
    const response: TableDataItem[] = await BorrowrecordsControllerService.selectPageByUserIdUsingGet(user.userId!, currentPage.value, pageSize.value)
    const bookTitlePromises = response.list.map(async item => {
      const book = await BooksControllerService.selectOneUsingGet1(item.recordId!)
      return { ...item, bookId: book.title }
    })
    tableData.value = await Promise.all(bookTitlePromises)
    total.value = response.total
  } catch (error) {
    alert(error)
  }
}

async function handleExport() {
  try {
    // Fetch the data to be exported
    const response: TableDataItem[] = tableData.value

    // Convert the data to CSV format
    const csvContent = convertToCSV(response)

    // Create a Blob from the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

    // Create a link element
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'borrowed_records.csv')

    // Append the link to the body
    document.body.appendChild(link)

    // Programmatically click the link to trigger the download
    link.click()

    // Clean up the URL object
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    alert('导出失败: ' + error)
  }
}

function convertToCSV(data: TableDataItem[]): string {
  const headers = ['recordId', 'bookId', 'userId', 'borrowDate', 'returnDate']
  const rows = data.map(item =>
    headers.map(header => {
      if (header === 'borrowDate' || header === 'returnDate') {
        return formatDateExport(<string>item[header as keyof TableDataItem] ?? '')
      }
      return item[header as keyof TableDataItem] ?? ''
    }).join(',')
  )
  return [headers.join(','), ...rows].join('\n')
}

function formatDateExport(date: string): string {
  if (!date) return ''
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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
async function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  await fetchData()
}

async function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
  await fetchData()
}

function formatDate(date: string): string {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(() => {
  fetchData()
})
</script>
