<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="query.title" placeholder="类别名称" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="185" show-overflow-tooltip="true" align="center"></el-table-column>
				<el-table-column prop="title" label="类别"></el-table-column>
				<el-table-column prop="createdAt" label="创建时间" :formatter="formatTime"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="类别名称">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog title="新增" v-model="addVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="类别名称">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveAdd">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="types">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { addType, fetchAllTypes, deleteType, updateType } from '../api/types';

interface TableItem {
	id: number;
	title: string;
	createdAt: string;
}

const query = reactive({
	title: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchAllTypes(query.pageIndex).then(res => {
		console.log('res', res);
		tableData.value = res.data.data;
		pageTotal.value = res.data.meta.total;
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 新增
const addVisible = ref(false);
let addForm = reactive({
	title: '',
});
const handleAdd = () => {
	addVisible.value = true;
};
const saveAdd = () => {
	addType({ 
    title: addForm.title,
  }).then(() => {
		addVisible.value = false;
    addForm.title = '';
		ElMessage.success(`新增成功`);
	}).then(() => {
    handleSearch();
  });
};

// 删除操作
const handleDelete = (index: number, row: any) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
    .then(() => {
      return deleteType(row.id)
    })
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  id: '',
	title: '',
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
  form.id = row.id;
	form.title = row.title;
  editVisible.value = true;	
};
const saveEdit = () => {
  updateType(form.id, form.title).then(() => {
    editVisible.value = false;
	  ElMessage.success(`修改第 ${idx + 1} 行成功`);
  }).then(() => {
    getData();
  });
};

const formatTime = (row: any) => {
  return new Date(row.createdAt).toLocaleString("zh-CN");
}
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
