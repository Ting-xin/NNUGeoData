<template>
  <FileCatalog
      :visible="fileVisible"
      :catalogId="catalogId"
      :pageInfo="pageInfo"
      @changeVisible="changeFileVisible"
      @freshList="freshList"
  />
  <el-row>
    <el-col :span="19">
      <el-button type="primary" size="small" @click="addFolder" round>新建文件夹</el-button>
      <el-button type="primary" size="small" @click="changeFileVisible" round>上传文件</el-button>
      <el-button type="primary" size="small" @click="uploadBigFile" round>上传大文件</el-button>
      <el-button type="primary" size="small" @click="uploadMultiFiles" round>上传批量文件</el-button>
    </el-col>
    <el-col :span="4">
      <el-input
          v-model="searchContent"
          placeholder="请输入搜索内容"
          class="input-with-select"
          @click="freshList"
      >
        <!--        <template #prepend>-->
        <!--          <el-select v-model="searchItem" placeholder="Select" style="width: 80px">-->
        <!--            <el-option-->
        <!--                v-for="item in searchOptions"-->
        <!--                :key="item.value"-->
        <!--                :label="item.label"-->
        <!--                :value="item.value"-->
        <!--            >-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </template>-->

        <template #append>
          <el-button style="background-color: #409eff;color: white">搜索</el-button>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="23">
      <!--      <el-page-header-->
      <!--          content="返回"-->
      <!--          @back="goBack"-->
      <!--      ></el-page-header>-->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">全部文件</el-breadcrumb-item>
        <el-breadcrumb-item>新建文件夹1</el-breadcrumb-item>
        <el-breadcrumb-item>新建文件夹2</el-breadcrumb-item>
        <el-breadcrumb-item>新建文件夹3</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col >
    <el-col :span="1">
      <el-image
          style="height:22px"
          :src="displayImg"
          @click="switchThumnail"
      >
      </el-image>
    </el-col>
  </el-row>
  <el-row>
    <el-table
        :data="list"
        :stripe="true"
        size="large"
        fit="false"
        style="background-color:#eeeeee; width: 100%; line-height: 30px;"
        :row-style="{}"
    >
      <el-table-column sortable label="名称">
        <template #header>
          <span class="demonstration">名称</span>
        </template>
        <template #default="scope">
          <img
              v-if="scope.row.type === 'folder'"
              src="@/assets/images/folder.png"
              height="24"
              alt="Safari"
              title="Safari"
          />
          <img
              v-if="scope.row.type === 'file'"
              src="@/assets/images/file.png"
              height="24"
              alt="Safari"
              title="Safari"
          />
          <span @click="intoFolder(scope.$index, scope.row)"
                style="margin-left: 15px"
          >
          {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column sortable label="时间" prop="date"/>
      <el-table-column sortable label="描述" prop="description"/>
      <el-table-column>
        <template #header>
          <span class="demonstration">操作</span>
        </template>
        <template #default="scope">
          <el-button
              size="small"
              type="success"
              @click="handleDownload(scope.$index, scope.row)"
              plain>download
          </el-button
          >
          <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              plain>Edit
          </el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              plain>delete
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: "table",
};
</script>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive} from "vue";
import { useStore } from "vuex";

import { todo } from "@/utils/littleTools.js";
import { ArrowLeftBold, ArrowRightBold, Search } from "@element-plus/icons";
import {
  downloadFile,
  deleteFile,
} from "@/api/data";
import{
  createCatalog,
  deleteFolder,
  getCatalog,
  findByIdAndPage,
  findByItems,
} from "@/api/catalog";

import FileCatalog from "./components/fileDialog";
const thumnailImg = require("@/assets/images/thumnail.png");
const listImg = require("@/assets/images/list.png");
const displayImg = ref(listImg);
const goBack = () => {
  console.log('go back')
}
//切换缩略图-列表图标
const switchThumnail = ()=>{
  displayImg.value = displayImg.value == thumnailImg ? listImg : thumnailImg;
}

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
])
const ascOptions = ref([
  {label: "升序", value: true},
  {label: "降序", value: false}
])
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
const totalSize = ref(0);
const fileRoute = ref("/root");
// 新建文件的对话框的控制
const fileVisible = ref(false);
const changeFileVisible = () => {
  fileVisible.value = !fileVisible.value;
};

const getRoot = async () => {
  const res = await getCatalog(catalogId.value);
  list.value = res.data.children;
  totalSize.value = list.value.length;
};
getRoot();

const freshList = async () => {
  try {
    let res;
    if(searchContent.value == '') {
      console.log('freshList')
      console.log('catalogId: ', catalogId.value)
      console.log('pageInfo', pageInfo)
      res = await findByIdAndPage(catalogId.value, pageInfo)
    } else {
      res = await findByItems(catalogId.value, searchItem.value, searchContent.value, pageInfo)
    }
    list.value = res.data.children;
    store.commit('catalog/record', res.data.id)
    fileRoute.value = fileRoute.value + '/' + res.data.name
  } catch (err) {
    ElMessage({
      showClose: true,
      type: "error",
      message: "查询错误：" + err
    })
  }
};

const intoFolder = (index, row) => {
  if (row.type == "folder") {
    catalogId.value = row.id;
    freshList();
  } else {
    // todo: 这里可以写一个显示文件的关系表
    todo("click file");
  }
};

const catalogRedo = () => {
  catalogId.value = store.commit('catalog/redo')
  freshList()
}

const catalogUndo = () => {
  catalogId.value = store.commit('catalog/undo')
  freshList()
}

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
  todo('upload big file')
}

const uploadMultiFiles = () => {
  todo('upload multi files')
}

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

.el-table{
  --el-table-header-bg-color:#f5f6f7;
}
.input-with-select{
  margin-left: 20px;
}
</style>


