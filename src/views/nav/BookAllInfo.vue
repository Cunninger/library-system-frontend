<template>
  <div>
    <el-form :inline="true" class="search-form">
      <el-form-item label="搜索">
        <el-input v-model="searchKeyword" placeholder="请输入作者、书籍名称" style="width: 300px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="handleReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 330px" type="primary" @click="handleExport">导出报表</el-button>
      </el-form-item>

    </el-form>

    <el-button v-if="user.role==='admin'" type="primary" @click="handleAdd">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="书籍编号" prop="bookId" >
      </el-table-column>
      <el-table-column label="书籍名称" prop="title" />
      <el-table-column label="书籍分类" prop="className"  />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="出版社" prop="publisher" />
      <el-table-column label="出版日期" prop="yearPublished">
      </el-table-column>
      <el-table-column label="所属图书馆" prop="libraryName">
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template #default="scope">
          <span>{{ scope.row.status === 'available' ? '未借出' : '已借出' }}</span>
        </template>
      </el-table-column>

      <!-- 新增的借阅列 -->
      <el-table-column label="借阅">
        <template #default="scope">
          <el-button
            v-if="scope.row.status === 'available'"
            type="success"
            @click="handleBorrow(scope.row)"
          >可借阅
          </el-button>
          <el-tag v-else type="danger">不可借阅</el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="user.role==='admin'" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 借阅Dialog -->
    <el-dialog v-model="borrowDialogVisible" title="借阅图书">
      <el-form :model="borrowForm" label-width="100px">
        <el-form-item label="记录ID">
          <el-input v-model="borrowForm.recordId" disabled />
        </el-form-item>
        <el-form-item label="书籍ID">
          <el-input v-model="borrowForm.bookId" disabled />
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="borrowForm.userId" />
        </el-form-item>
        <el-form-item label="借阅日期">
          <el-date-picker v-model="borrowForm.borrowDate" placeholder="选择日期" type="date" />
        </el-form-item>
        <el-form-item :required="true" label="借阅天数">
          <el-input v-model="borrowDays" placeholder="请输入借阅天数（最多30天）" @input="calculateReturnDate" />
        </el-form-item>
        <el-form-item label="归还日期">
          <el-input v-model="borrowForm.returnDate" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="borrowDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBorrow">确定</el-button>
      </template>
    </el-dialog>



    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="100px">
        <el-form-item label="书籍名称">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="书籍分类">
          <el-input v-model="form.classificationId" />
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="form.author" />
        </el-form-item>

        <el-form-item label="出版商">
          <el-input v-model="form.publisher" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="未借出" value="available" />
            <el-option label="已借出" value="borrowed" />
          </el-select>
        </el-form-item>

        <el-form-item label="出版日期">
          <el-input v-model="form.yearPublished" placeholder="请输入出版日期，格式为：YYYY" />
        </el-form-item>

        <el-form-item label="所属图书馆">
          <el-input v-model="form.libraryId" />
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import {
  BookclassificationControllerService,
  type Books,
  BooksControllerService,
  BorrowrecordsControllerService, LibraryControllerService
} from '../../../generated'
import { useUserStore } from '@/stores/counter.ts'
import router from '@/router'

interface TableDataItem {
  author?: string;
  bookId?: number;
  classificationId?: number;
  publisher?: string;
  status?: any;
  title?: string;
  yearPublished?: any;
}

interface BorrowRecord {
  recordId?: number;
  bookId?: number;
  userId?: number;
  borrowDate?: string;
  returnDate?: string;
}

const tableData: Ref<TableDataItem[]> = ref([])
const searchKeyword = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref<TableDataItem>({})

const borrowDialogVisible = ref(false)
const borrowForm = ref<BorrowRecord>({})
const borrowDays = ref<number | string>('')

const userStore = useUserStore()
const user = userStore.user


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)


async function fetchData(): Promise<void> {
  try {
    const response: TableDataItem[] = await BooksControllerService.selectByPageUsingGet1(currentPage.value, pageSize.value)
    const bookClassificationPromises = response.list.map(async (book:Books) => {
      const classification = await BookclassificationControllerService.selectOneUsingGet(book.classificationId!)
      const library = await LibraryControllerService.selectOneUsingGet3(book.libraryId!)
      return {
        ...book,
        className: classification.className,
        libraryName: library.libraryName
      }
    })
    tableData.value = await Promise.all(bookClassificationPromises)
    total.value = response.total;
  } catch (error) {
    alert(error);
  }
}
// todo 导出报表
async function handleExport() {
  try {
    // Fetch the data to be exported
    const response: TableDataItem[] = tableData.value;

    // Convert the data to CSV format
    const csvContent = convertToCSV(response);

    // Add BOM to the CSV content to ensure proper encoding of Chinese characters
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'BooksAllInfo_records.csv');

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    alert('导出失败: ' + error);
  }
}

function convertToCSV(data: TableDataItem[]): string {
  const headers = ['bookId', 'title', 'classificationId', 'author', 'publisher', 'yearPublished', 'status'];
  const rows = data.map(item =>
    headers.map(header => item[header as keyof TableDataItem] ?? '').join(',')
  );
  return [headers.join(','), ...rows].join('\n');
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
    await BooksControllerService.deleteByPrimaryKeyUsingDelete(row.bookId!)
    await fetchData()
  } catch (error) {
    alert('该条数据存在外键关联，无法删除')
  }
}

async function handleConfirm() {
  try {
    if (form.value.bookId) {
      await BooksControllerService.updateByPrimaryKeyUsingPut(form.value)
    } else {
      await BooksControllerService.insertUsingPost1(form.value)
    }
    dialogVisible.value = false
    await fetchData()
  } catch (error) {
    alert(error)
  }
}

function formatDate(date: string): string {
  return new Date(Number(date)).getFullYear().toString()
}

async function handleSearch() {
  try {
    const response: TableDataItem[] = await BooksControllerService.selectByAuthorOrTitleUsingGet(searchKeyword.value)
    tableData.value = response
  } catch (error) {
    alert(error)
  }
}

async function handleReset() {
  searchKeyword.value = ''
  fetchData()
}


async function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  await fetchData()
}

async function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
  await fetchData()
}


// 新增的借阅相关逻辑
async function handleBorrow(row: TableDataItem) {

  borrowForm.value = {
    bookId: row.bookId,
    userId: user.userId,
    borrowDate: new Date().toISOString().slice(0, 10)
  }
  borrowDialogVisible.value = true
}

function calculateReturnDate() {
  const borrowDate = new Date(borrowForm.value.borrowDate || '')
  borrowDate.setDate(borrowDate.getDate() + Number(borrowDays.value))
  borrowForm.value.returnDate = borrowDate.toISOString().slice(0, 10)
}


async function confirmBorrow() {
  if (!borrowDays.value) {
    alert('请输入借阅天数')
    return
  }
  if (Number(borrowDays.value) > 30) {
    alert('借阅天数不能超过30天')
    return
  }
  // 当前条的状态需要由 available 变为 borrowed

  try {
    await BorrowrecordsControllerService.insertUsingPost2({
      bookId: borrowForm.value.bookId,
      userId: borrowForm.value.userId,
      borrowDate: borrowForm.value.borrowDate,
      returnDate: borrowForm.value.returnDate
    })

    await BooksControllerService.updateStatusByBookIdUsingPut({
      bookId: borrowForm.value.bookId,
      status: 'borrowed'
    })
    borrowDialogVisible.value = false
    router.push('/myborrowedpage')
    fetchData()
  } catch (error) {
    alert(error)
  }
}


onMounted(() => {
  fetchData()
})
</script>
