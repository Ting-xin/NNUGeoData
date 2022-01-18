<template>
  <el-button type="text" @click="visible = true"
    >open a Form nested Dialog</el-button
  >
  <el-dialog v-model="visible" title="上传文件" width="30%" center>
    <el-form :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button type="primary">点击上传文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="Zones">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai"></el-option>
          <el-option label="Zone No.2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

export default {
  name: "fileCatalog",
  setup(props) {
    const visible = ref(false);

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const fileList = ref([]);
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    const handlePreview = (file) => {
      console.log(file);
    };
    const handleExceed = (files, fileList) => {
      ElMessage.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    };
    const beforeRemove = (file, fileList) => {
      return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`);
    };

    return {
      visible,
      form,
      fileList,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove
    };
  },
};
</script>