<template>
  <el-col :span="8" >
    <el-card style="height: 81vh;">
      <el-row>
        <h1 style="font-size: 20px">ToolName</h1>
      </el-row>
      <el-row>
        <el-button type="primary" plain @click='test("d2ada262-cf84-4a7c-a5bc-8d2c89a879ef", "fdtwTxlnhka8jY66lOT+kKutgZHnvi4NlnDc7QY5jR4=")'>Load Test Data</el-button>
        <el-button type="primary" plain>Invoke</el-button>
      </el-row>
      <el-divider/>
      <h1 style="font-size: 20px">Introduction</h1>
    </el-card>
  </el-col>
  <el-col :span="16" >
    <el-card style="height: 81vh;width:75vw;margin-left: 20px">
      <el-row class="invokeTitle">Input</el-row>
      <el-row>
        <el-col :span="10">Input data, can be used to run data processing services</el-col>
        <el-col :span="8">
          <el-input v-model="input" disabled placeholder="InputData" />
        </el-col>
        <el-col :span="4" >
          <el-image :src="inputFile" class="fileIcon"></el-image>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="invokeTitle">Parameter</el-row>
      <el-row>Input parameter, can be used to run data processing services</el-row>
      <el-divider></el-divider>
      <el-row class="invokeTitle">
        <el-col :span="10">Output data, data processing service running result file</el-col>
        <el-col :span="8">
          <el-input v-model="input" disabled placeholder="OutputData" />
        </el-col>
      <el-col :span="4">
        <el-image :src="downLoadFile" class="fileIcon"></el-image>
      </el-col>
      </el-row>
    </el-card>
  </el-col>

</template>
<script  setup>
import {ref} from 'vue'
import { test } from '@/api/toolService.js'

const inputFile = ref(require("@/assets/images/inputFile.png"));
const downLoadFile = ref(require("@/assets/images/downloadFile.png"))
</script>

<style scoped>
.invokeTitle{
  font-size: 20px;
  font-style: italic;
}
.fileIcon{
    height: 30px;
}
</style>
