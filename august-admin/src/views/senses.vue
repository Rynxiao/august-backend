<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="query.title" placeholder="标题" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="105" show-overflow-tooltip="true" align="center"></el-table-column>
				<el-table-column prop="title" label="标题" width="150" show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="content" label="内容" width="200" show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="cover" label="图片地址"></el-table-column>
				<el-table-column prop="liked" label="是否收藏" width="55" :formatter="formatLiked"></el-table-column>
				<el-table-column prop="read" label="是否已读" width="55" :formatter="formatRead"></el-table-column>
				<el-table-column prop="type" label="类型" width="75" :formatter="formatType"></el-table-column>
				<el-table-column prop="createdAt" label="创建时间" :formatter="formatCreatedAt"></el-table-column>
				<el-table-column prop="updatedAt" label="修改时间" :formatter="formatUpdatedAt"></el-table-column>
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
		<el-dialog title="编辑" v-model="editVisible" width="50%">
			<el-form label-width="70px">
				<el-form-item label="标题">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="70px">
				<el-form-item label="内容">
          <md-editor class="mgb20" v-model="form.content" />
				</el-form-item>
			</el-form>
			<el-form label-width="70px">
				<el-form-item label="图片链接">
					<el-input v-model="form.cover"></el-input>
				</el-form-item>
			</el-form>
      <el-form label-width="70px">
				<el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typesData"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

    <!-- 新增弹出框 -->
		<el-dialog title="新增" v-model="addVisible" width="50%">
			<el-form label-width="70px">
				<el-form-item label="标题">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="70px">
				<el-form-item label="内容">
					<md-editor class="mgb20" v-model="addForm.content" />
				</el-form-item>
			</el-form>
      <el-form label-width="70px">
				<el-form-item label="类型">
					<el-select v-model="addForm.type" placeholder="请选择">
            <el-option
              v-for="item in typesData"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
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

<script setup lang="ts" name="senses">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { addSense, fetchAllSenses, deleteSense, updateSense } from '../api/senses';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { fetchAllTypes } from '../api/types';

interface TableItem {
	id: number;
	title: string;
	content: string;
	cover: string;
	liked: number;
	read: number;
	type: string;
	createdAt: string;
	updatedAt: string;
}

interface TypeItem {
	id: string;
	title: string;
	createdAt: string;
}

const query = reactive({
	title: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const typesData = ref<TypeItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchAllSenses(query.pageIndex).then(res => {
		tableData.value = res.data.data;
		pageTotal.value = res.data.meta.total;
	});

  fetchAllTypes(1, 1000).then(res => {
		typesData.value = res.data.data;
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
  content: '',
  type: '',
});
const handleAdd = () => {
	addVisible.value = true;
};
const saveAdd = () => {
	addSense({ 
    title: addForm.title, 
    content: addForm.content,
    type: addForm.type,
  }).then(() => {
		addVisible.value = false;
    addForm.title = '';
    addForm.content = '';
    addForm.type = '';
		ElMessage.success(`新增成功`);
	}).then(() => {
    getData();
  });
};

// 删除操作
const handleDelete = (index: number, row: any) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
    .then(() => {
      return deleteSense(row.id)
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
  content: '',
  cover: '',
  type: '',
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
  form.id = row.id;
	form.title = row.title;
  form.content = row.content;
  form.cover = row.cover;
  form.type = `${row.type}`;
  editVisible.value = true;	
};
const saveEdit = () => {
  updateSense(form.id, { 
    title: form.title, 
    content: form.content,
    cover: form.cover,
    type: form.type,
  }).then(() => {
    editVisible.value = false;
	  ElMessage.success(`修改第 ${idx + 1} 行成功`);
  }).then(() => {
    getData();
  });
};

const formatCreatedAt = (row: any) => {
  return new Date(row.createdAt).toLocaleDateString("zh-CN");
}

const formatUpdatedAt = (row: any) => {
  return new Date(row.updatedAt).toLocaleDateString("zh-CN");
}

const formatType = (row: any) => {
  const typeArray = typesData.value.filter(type => type.id == row.type);
  return typeArray.length > 0 ? typeArray[0].title : row.id;
}

const formatText = (text: string) => {
  return text == '0' ? '否' : '是';
}
const formatLiked = (row: any) => formatText(row.liked);
const formatRead = (row: any) => formatText(row.read);
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
