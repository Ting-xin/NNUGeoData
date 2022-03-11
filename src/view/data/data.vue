<template>
  <FileCatalog
    :visible="fileVisible"
    :catalogId="catalogId"
    :pageInfo="pageInfo"
    @changeVisible="changeFileVisible"
    @freshList="freshList"
  />
  <el-container>
    <el-main style="padding: 0px">
      <el-row style="min-height: 300px">
        <el-col :span="24">
          <el-row style="line-height: 10%">
            <el-col :span="2">
              <el-button type="primary" size="large" @click="addFolder"
                >新建文件夹</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="large" @click="changeFileVisible"
                >上传文件</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="large" @click="uploadMultiFiles"
                >上传文件夹</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="large" @click="uploadBigFile"
                >上传大文件</el-button
              >
            </el-col>
            <el-col :span="4">
              <div style="display: inline-block" @click="catalogUndo">
                <el-icon><arrow-left-bold /></el-icon>
                <span>返回</span>
              </div>
              <div style="display: inline-block" @click="catalogRedo">
                <el-icon><arrow-right-bold /></el-icon>
                <span>前进</span>
              </div>

              <div
                style="
                  border: solid;
                  display: inline-block;
                  width: 200px;
                  padding: 10px;
                  text-align: left;
                "
              >
                路径：
                {{ fileRoute }}
              </div>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="searchContent"
                placeholder="请输入搜索内容"
                class="input-with-select"
                @click="freshList"
              >
                <template #prepend>
                  <el-select
                    v-model="searchItem"
                    placeholder="Select"
                    style="width: 80px"
                  >
                    <el-option
                      v-for="item in searchOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" @click="freshList"></el-button>
                </template>
              </el-input>
            </el-col>
            <el-col :span="1"> Sort By: </el-col>
            <el-col :span="1">
              <el-select
                v-model="pageInfo.sortField"
                class="m-2"
                placeholder="Select"
                size="large"
                @click="freshList"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click="freshList"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <el-select
                v-model="pageInfo.asc"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in ascOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
              <el-table-column label="名称">
                <template #header>
                  <span class="demonstration">名称</span>
                </template>
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
                  <span @click="intoFolder(scope.$index, scope.row)">
                    {{ scope.row.name }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="时间" prop="date" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="点击量" prop="clicks" />
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
            <div style="background: #e9eef3; margin-top: 10px; margin: 0 auto">
            <span>共{{total}}条</span>
            <el-pagination
              :current-page="pageInfo.page"
              :page-size="pageInfo.pageSize"
              :page-sizes="[10, 15, 20, 25]"
              :total="total"
              layout="sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
            </div>
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
import { ArrowLeftBold, ArrowRightBold, Search } from "@element-plus/icons";

import { todo } from "@/utils/littleTools.js";
import { downloadFile, deleteFile } from "@/api/data";
import {
  createCatalog,
  deleteFolder,
  getCatalog,
  findByIdAndPage,
  findByItems,
} from "@/api/catalog";
import FileCatalog from "./components/fileDialog";

// 搜索条件
const pageInfo = reactive({
  page: 1, // 当前页码
  pageSize: 10,
  asc: false, // 排序
  sortField: "date",
});
const sortOptions = ref([
  { label: "名称", value: "name" },
  { label: "时间", value: "date" },
  { label: "类型", value: "type" },
  { label: "点击量", value: "clicks" },
]);
const ascOptions = ref([
  { label: "升序", value: true },
  { label: "降序", value: false },
]);
const searchOptions = ref([
  { label: "名称", value: "name" },
  { label: "描述", value: "description" },
]);
const searchItem = ref("name");
const searchContent = ref("");

const store = useStore();
const user = reactive(store.getters["user/getUser"]);
const catalogId = ref(store.getters["catalog/getCatalogId"]);
const list = ref([]);
const total = ref(0);
const fileRoute = ref("/root");
// 新建文件的对话框的控制
const fileVisible = ref(false);
const changeFileVisible = () => {
  fileVisible.value = !fileVisible.value;
};

// const getRoot = async () => {
//   const res = await getCatalog(catalogId.value);
//   list.value = res.data.children;
//   total.value = list.value.length;
// };
// getRoot();

const freshList = async () => {
  try {
    let res;
    if (searchContent.value == "") {
      console.log("freshList");
      console.log("catalogId: ", catalogId.value);
      console.log("pageInfo", pageInfo);
      res = await findByIdAndPage(catalogId.value, pageInfo);
    } else {
      res = await findByItems(
        catalogId.value,
        searchItem.value,
        searchContent.value,
        pageInfo
      );
    }
    list.value = res.data.children;
    list.value.forEach((item) => {
      let temp = new Date(item.date);
      item.date = temp.toLocaleString();
    });
    total.value = res.data.total
    store.commit("catalog/record", res.data.id);
  } catch (err) {
    ElMessage({
      showClose: true,
      type: "error",
      message: "查询错误：" + err,
    });
  }
};
freshList.bind(this);
freshList();

const intoFolder = (index, row) => {
  if (row.type == "folder") {
    catalogId.value = row.id;
    freshList();
    fileRoute.value = fileRoute.value + "/" + res.data.name;
  } else {
    // todo: 这里可以写一个显示文件的关系表
    todo("click file");
  }
};

const catalogRedo = async () => {
  catalogId.value = await store.commit("catalog/redo");
  freshList();
};

const catalogUndo = async () => {
  catalogId.value = await store.commit("catalog/undo");
  freshList();
};

const handleSizeChange = (val) => {
  pageInfo.pageSize = val;
  freshList();
};

const handleCurrentChange = (val) => {
  pageInfo.page = val;
  freshList();
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

const uploadBigFile = () => {
  todo("upload big file");
};

const uploadMultiFiles = () => {
  todo("upload multi files");
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