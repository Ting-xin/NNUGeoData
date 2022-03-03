<template>
  <FileCatalog
    :visible="fileVisible"
    @changeVisible="changeFileVisible"
    @freshList="freshList"
  />
  <el-container>
    <el-main height="85%">
      <el-row style="min-height: 300px">
        <!-- <el-col :span="6">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="background: #e9eef3"
            />
          </el-col> -->
        <el-col :span="24">
          <el-row style="line-height: 10%">
            <!-- <el-col :span="3">
              <el-switch
                v-model="queryInfo.isPrivate"
                size="large"
                active-text="私有数据"
                inactive-text="公有数据"
              />
            </el-col> -->
            <el-col :span="2">
              <el-button type="primary" size="large" @click="addFolder"
                >新建文件夹</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="large" @click="changeFileVisible"
                >添加文件</el-button
              >
            </el-col>
            <el-col :span="4" :push="1">
              <!-- 搜索与添加区域 -->
              <el-input
                placeholder="请输入内容"
                v-model="pageInfo.content"
                clearable
                @clear="getUserList"
                style="height: 40px"
              >
                <template #append>
                  <el-button @click="getUserList">
                    <el-icon><search /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="line-height: 80%; min-height: 500px; margin-top: 10px">
            <el-table
              :data="list"
              :stripe="true"
              size="large"
              fit="false"
              style="background-color: #e9eef3; width: 100%; line-height: 30px"
            >
              <el-table-column width="50">
                <!-- <template #header>
                    <span class="demonstration">操作</span>
                  </template> -->
                <template #default="scope">
                  <img
                    v-if="scope.row.type === 'folder'"
                    src="@/assets/images/folder.png"
                    width="28"
                    height="30"
                    alt="Safari"
                    title="Safari"
                  />
                  <img
                    v-if="scope.row.type === 'file'"
                    src="@/assets/images/file.png"
                    width="28"
                    height="30"
                    alt="Safari"
                    title="Safari"
                  />
                  <!-- <avatar
                      v-if="scope.row.type === 'file'"
                      :size="24"
                      :rounded="false"
                      :username="scope.row.name"
                    ></avatar> -->
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="name" />
              <el-table-column label="时间" prop="date" />
              <el-table-column label="描述" prop="description" />
              <el-table-column>
                <template #header>
                  <span class="demonstration">操作</span>
                </template>
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="handleDownload(scope.$index, scope.row)"
                    >download</el-button
                  >
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)"
                    >delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row style="line-height: 10%">
            <el-pagination
              style="background: #e9eef3; margin-top: 10px; margin: 0 auto"
              v-model:currentPage="pageInfo.currentPage"
              v-model:page-size="pageInfo.pageSize"
              :page-sizes="[10, 15, 20, 25]"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "table",
};
</script>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

import { todo } from "@/utils/littleTools.js";
import {
  createCatalog,
  updateFile,
  downloadFile,
  deleteFile,
  deleteFolder,
  getDataList,
} from "@/api/data";
import FileCatalog from "./components/fileDialog";

// 新建文件的对话框的控制
const fileVisible = ref(false);
const changeFileVisible = () => {
  console.log("test");
  fileVisible.value = !fileVisible.value;
};

const pageInfo = reactive({
  isPrivate: true,
  content: "", // 查询内容
  pageSize: 10,
  currentPage: 1, // 当前页码
});

const store = useStore();
const user = reactive(store.getters["user/getUser"]);
const catalogId = ref(store.getters["catalog/getCatalogId"]);
const list = ref([]);
const totalSize = ref(0);
const freshList = async () => {
  const res = await getDataList(catalogId.value);
  list.value = res.data.children;
  totalSize.value = list.value.length;
};
freshList();

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};

const addFolder = () => {
  createCatalog({
    userId: user.id,
    parentId: catalogId.value,
    name: "新建文件夹",
  })
    .then((res) => {
      ElMessage({
        message: "新建文件夹成功",
        type: "success",
      });
      let data = {
        type: "folder",
        descriptoin: "",
        clicks: 0,
      };
      data.id = res.data.id;
      data.name = res.data.name;
      data.date = res.data.date;
      list.value.push(data);
    })
    .catch((err) => {
      ElMessage({
        message: "新建文件夹失败",
        type: "error",
      });
    });
};

const addFile = (data) => {
  console.log("data: ", data);
  list.value.push(data);
};

const handleDownload = (index, row) => {
  if (row.type === "file") {
    downloadFile({ id: row.id, catalogId: catalogId.value })
      .then((res) => {
        ElMessage({
          message: "下载文件成功",
          type: "success",
        });
      })
      .catch((err) => {
        ElMessage({
          message: "下载文件失败",
          type: "error",
        });
      });
  } else {
    todo("download folder");
  }
};

const handleEdit = (index, row) => {
  console.log("handleEdit");
  row.isEdit = true;
  // 备份原始数据
  row["oldRow"] = JSON.parse(JSON.stringify(row));
  ElMessage({
    message: "开发ing",
    type: "info",
  });
};

const handleDelete = (index, row) => {
  if (row.type === "file") {
    deleteFile({ id: row.id, catalogId: catalogId.value })
      .then((res) => {
        console.log("data.value: ", list.value);
        list.splice(index, 1);
        console.log("data.value: ", list.value);
        ElMessage({
          message: "删除文件成功",
          type: "success",
        });
      })
      .catch((err) => {
        ElMessage({
          message: "删除文件失败",
          type: "error",
        });
      });
  } else if (row.type === "folder") {
    deleteFolder({ id: row.id })
      .then((res) => {
        ElMessage({
          message: "删除文件夹成功",
          type: "success",
        });
      })
      .catch((err) => {
        ElMessage({
          message: "删除文件夹失败",
          type: "error",
        });
      });
  }
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>