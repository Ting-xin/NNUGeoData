<template style="height: 100%;">
  <FileCatalog :visible="fileVisible" @changeVisible="changeFileVisible" />
  <Table :apiField='apiField' :pageInfo='pageInfo' />
</template>

<script>
export default {
  name: "data",
};
</script>

<script setup>
import { ref, reactive } from "vue";

import Table from "./components/table.vue";
import FileCatalog from "./components/fileDialog.vue";

// 新建文件的对话框的控制
const fileVisible = ref(false);
const changeFileVisible = () => {
  fileVisible.value = !fileVisible.value;
};

// 数据列表
const apiField = ref('data')
const queryInfo = reactive({
  isPrivate: true,
  content: "", // 查询内容
  pageSize: 15,
  pagenum: 1, // 当前页码
});
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