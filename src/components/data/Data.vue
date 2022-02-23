<template style="height: 100%;">
  <div>
    <el-container>
      <el-header height="5%">
        <el-row style="line-height: 5%">
          <el-col :span="4">
            <el-switch
              v-model="queryInfo.isPrivate"
              size="large"
              active-text="私有数据"
              inactive-text="公有数据"
            />
          </el-col>
        </el-row>
      </el-header>
      <el-main height="80%">
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
              <el-col :span="2">
                <el-button type="primary" size="large" @click="addFolder">新建文件夹</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="large">添加文件</el-button>
              </el-col>
              <el-col :span="4" :push="1">
                <!-- 搜索与添加区域 -->
                <el-input
                  placeholder="请输入内容"
                  v-model="queryInfo.content"
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
            <el-row
              style="line-height: 80%; min-height: 500px; margin-top: 10px"
            >
              <el-table
                :data="dataList"
                :stripe="true"
                size="large"
                fit="false"
                style="
                  background-color: #e9eef3;
                  width: 100%;
                  line-height: 30px;
                "
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
                v-model:currentPage="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons";
import Table from "./Table";
import FileCatalog from './SingleFileDialog.vue'
import { createCatalog, downloadFile, deleteFile, deleteFolder } from '@/plugins/axios/api.js'
import { ElMessage } from 'element-plus';
import { useStore } from "vuex";

export default {
  name: "Data",
  components: {
    Search,
    Table,
  },
  setup() {
    const queryInfo = reactive({
      isPrivate: true,
      content: "", // 查询内容
      pageSize: 15,
      pagenum: 1, // 当前页码
    });
    let catalogId = JSON.parse(localStorage.getItem('catalog')).id 
    let userId = JSON.parse(localStorage.getItem('user')).id
    const store = useStore();

    /**
     * 列表
     */
    const dataList = ref(JSON.parse(localStorage.getItem('dataList')))

    const addFolder = () => {
      createCatalog({
        userId: userId,
        parentId: catalogId,
        name: '新建文件夹'
      })
      .then(res => {
        ElMessage({
          message: '新建文件夹成功',
          type: 'success'
        })
        let data = {}
        data.id = res.data.id
        data.type = 'folder'
        data.name = res.data.name
        data.date = res.data.date
        data.description = ''
        data.clicks = 0
        dataList.value.push(data)
        store.commit("catalog/setDataList", dataList);
      })
      .catch(err => {
          ElMessage({
          message: '新建文件夹失败',
          type: 'error'
        })
      })
    }

    const handleDownload = (index, row) => {
      if(row.type === 'file') {
        downloadFile({id: row.id, catalogId: catalogId})
        .then(res => {
          ElMessage({
            message: '下载文件成功',
            type: 'success'
          })
        })
        .catch(err => {
          ElMessage({
            message: '下载文件失败',
            type: 'error'
          })
        })
      } else {
        ElMessage({
          message: '开发ing',
          type: 'info'
        })
      }
    }
    const handleEdit = (index, row) => {
      console.log('handleEdit')
        row.isEdit = true;
        // 备份原始数据
        row['oldRow'] = JSON.parse(JSON.stringify(row));
      ElMessage({
        message: '开发ing',
        type: 'info'
      })
    }
    const handleDelete = (index, row) => {
      if(row.type === 'file') {
        deleteFile({id: row.id, catalogId: catalogId})
        .then(res => {
          console.log('data.value: ', dataList.value)
          this.dataList.splice(index, 1)
          console.log('data.value: ', dataList.value)

          store.commit('catalog/setDataList', dataList)
          ElMessage({
            message: '删除文件成功',
            type: 'success'
          })
        })
        .catch(err => {
          ElMessage({
            message: '删除文件失败',
            type: 'error'
          })
        })
      } else if (row.type === 'folder') {
        deleteFolder({id: row.id})
        .then(res => {
          delete dataList.value.index
          store.commit('catalog/setDataList', dataList)
          ElMessage({
            message: '删除文件夹成功',
            type: 'success'
          })
        })
        .catch(err => {
          ElMessage({
            message: '删除文件夹失败',
            type: 'error'
          })
        })
      }
      
    }


    return {
      queryInfo,
      dataList,
      Search,
      addFolder,
      handleDownload,
      handleEdit,
      handleDelete
    };
  },
};
</script>
<style scoped>
.el-container.is-vertical {
  height: 100%;
}

.el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
}
</style>