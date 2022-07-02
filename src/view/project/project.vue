<template>
  <div class="padding-all">
    <el-row class="tool-row">
      <div  class="tool-area area1">
        <el-button :icon="Plus" type="primary" class="tool1"  plain>新建项目</el-button>
      </div>
      <div  class="tool-area area2">
        <el-input size="large" :prefix-icon="Search" class="toolInput" placeholder="搜索"></el-input>
      </div>
      <div class=" area3"  style="display: flex;align-items: center;justify-content: space-between">
        <div class="tool3">
          <el-icon :size="25"><Grid/></el-icon>
          <span>格网</span>
        </div>
        <div class="tool3">
          <el-icon :size="25"><Sort/></el-icon>
          <span>排序方式</span>
        </div>
      </div>
    </el-row>
    <el-row class="card-row">
      <template v-for="(item,key) in projectInfo" :key="key">
        <el-card :body-style="{ padding: '0px' }" class="card-block">
          <el-image :src="item.imageUrl" class="card-image" fit="fill"></el-image>
          <div class="card-info">
            <h4 class="font-size-1" @click="goProjectItem">{{item.name}}</h4>
            <p class="font-size-2 ">
              <span>所有者 </span>
              <span>{{item.author}}</span>
            </p>
            <p class="font-size-3">
              创建日期：{{item.createTime}}
            </p>
            <p  class="font-size-4">
              上次更新日期：{{item.updateTime}}
            </p>
          </div>
        </el-card>
      </template>
    </el-row>
  </div>
</template>
<script  setup>
import {defineEmits} from "vue"
import { useRouter } from "vue-router";
const router = useRouter();
import {Plus,Search,Grid,Sort} from "@element-plus/icons";

const emit = defineEmits(["setMainMargin"])

const goProjectItem = () => {
  router.push('projectItem')
  emit("setMainMargin","margin-left: 64px")
}
const projectInfo = [
  {
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project1.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project2.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project3.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project4.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project5.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project6.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project7.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project8.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project9.jpg")
  },{
    name:"计算莫兰指数",
    author:"鲸鲸鱼",
    createTime:" 2019年10月30日",
    updateTime:"2022年6月14日",
    imageUrl:require("@/assets/projectImg/project10.jpg")
  },
]
</script>

<style scoped>
.padding-all{
  padding: 20px;
}
.card-row{
  display: flex;
  justify-content: space-between;

}
.toolButton{
  padding: 0;
}
/deep/.el-input__inner{
  border: none;
}
.area1{

}
.area2{
  width:70%;
}
.area3{
  display: flex;
}
.tool-area{

}
.tool1{
  padding-top: 4px;
  padding-bottom: 4px;
}
.tool3{
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
}
.tool-row{
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
}
.card-image{
  width: 300px;
  height: 200px;
  display: block;
}
.card-info{
  padding: 0.75rem;
}
.card-block{
  margin-bottom: 1.5rem;
  margin-right: 20px;
  margin-left: 20px;
}
.font-size-1{
  line-height: 1.5;
  font-size: 0.9375rem;
  color:#0079c1 ;
  cursor: pointer;
}
.font-size-2{
  line-height: 1.5;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
}
.font-size-3{
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #6e6e6e;
}
.font-size-4{
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #6e6e6e;
}
</style>

