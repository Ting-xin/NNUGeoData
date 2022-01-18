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
          <el-col :span="6">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="background: #e9eef3"
            />
          </el-col>
          <el-col :span="18">
            <el-row style="line-height: 10%">
              <el-col :span="2">
                <el-button type="primary" size="large">新建文件夹</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" size="large">添加文件</el-button>
              </el-col>
              <el-col :span="10" :push="1">
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
                :data="tableData"
                :stripe="true"
                size="large"
                fit="false"
                style="
                  background-color: #e9eef3;
                  width: 100%;
                  line-height: 30px;
                "
              >
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
                      @click="handleEdit(scope.$index, scope.row)"
                      >download</el-button
                    >
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Edit</el-button
                    >
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)"
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
import Table from "./data/Table";
import FileCatalog from './data/FileDialog.vue'
import FolderCatalog from './data/FolderDialog.vue'


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

    /**
     * 列表
     */
    const tableData = ref(localStorage.getItem('dataList'))
    /**
     * 目录树
     */
    const handleNodeClick = (data) => {
      console.log(data);
    };
    const data = [
      {
        label: "Level one 1",
        children: [
          {
            label: "Level two 1-1",
            children: [
              {
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 2",
        children: [
          {
            label: "Level two 2-1",
            children: [
              {
                label: "Level three 2-1-1",
              },
            ],
          },
          {
            label: "Level two 2-2",
            children: [
              {
                label: "Level three 2-2-1",
              },
            ],
          },
        ],
      },
      {
        label: "Level one 3",
        children: [
          {
            label: "Level two 3-1",
            children: [
              {
                label: "Level three 3-1-1",
              },
            ],
          },
          {
            label: "Level two 3-2",
            children: [
              {
                label: "Level three 3-2-1",
              },
            ],
          },
        ],
      },
    ];
    const defaultProps = {
      children: "children",
      label: "label",
    };



    return {
      queryInfo,
      tableData,
      data,
      defaultProps,
      Search,
    };
  },
};
</script>
<style scoped>
.el-container.is-vertical {
  height: 100%;
}
</style>