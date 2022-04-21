<template>
  <el-row>
    <el-button>创建工具</el-button>
    <el-button @click="invokeTool(toolId)">调用工具</el-button>
  </el-row>
  <el-row>
  </el-row>
<el-row>
  <el-col :span="24" >
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="基础信息" @click="clickStepOne"/>
      <el-step title="资源" @click="clickStepTwo"/>
      <el-step title="详情" @click="clickStepThree"/>
      <el-step title="作者" @click="clickStepFour"/>
    </el-steps>
  </el-col>

</el-row>
  <el-row></el-row>
  <el-row></el-row>
  <el-row>
    <div class="stepContent" v-show="active == 0">
      <el-form
          :label-position="labelPosition"
          label-width="150px"
          :model="formLabelAlign"
          style="max-width: 800px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="formLabelAlign.name"/>
        </el-form-item>
        <el-form-item label="Bind Data Template">
          <el-input v-model="formLabelAlign.region"/>
        </el-form-item>
        <el-form-item label="Keywords">
          <el-input v-model="formLabelAlign.type"/>
        </el-form-item>
        <el-form-item label="Overview">
          <el-input v-model="formLabelAlign.Overview"/>
        </el-form-item>
        <el-form-item label="Method">
          <el-radio-group v-model="radiogroup1">
            <el-radio-button label="Conversion" />
            <el-radio-button label="Processing" />
            <el-radio-button label="Visualization" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Status">
          <el-radio-group v-model="radiogroup2">
            <el-radio-button label="Public" />
            <el-radio-button label="Discoverable" />
            <el-radio-button label="Visualization" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Content Type">
            <el-radio v-model="radio1" label="1">OpenGMS Data-Service Package</el-radio>
            <el-radio v-model="radio1" label="2">Source Code</el-radio>
        </el-form-item>
      </el-form>
    </div>
    <div class="stepContent" v-show="active == 1">
      <el-form
          :label-position="labelPosition"
          label-width="150px"
          :model="formLabelAlignResource"
          style="max-width: 460px"
      >
        <el-form-item label="Bind Test Data">
          <el-button type="primary">Bind Test Data</el-button>
        </el-form-item>
        <el-form-item label="Add a Zip File">
          <el-button type="primary">Add</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="stepContent" v-show="active == 2">
        <RichTextEditor></RichTextEditor>
    </div>
    <div class="stepContent" v-show="active == 3">
      <el-col :span="8">
        <el-card shadow="hover"> Authorship </el-card>
        <el-form :model="ruleForm" status-icon ref="formRef" label-width="120px">
          <el-row :gutter="20" v-for="(item, index) in ruleForm.fruitConfig" :key="index">
            <el-col :span="20">
              <el-form-item label="Name:" prop="'Name' + index">
                <el-input type="text" v-model="item.Name" autocomplete="off" maxlength="500">
                </el-input>
              </el-form-item>
              <el-form-item label="Affiliation:" :prop="'Affiliation' + index">
                <el-input type="text" v-model="item.Affiliation" autocomplete="off" maxlength="500">
                </el-input>
              </el-form-item>
              <el-form-item label="Email:" :prop="'Email' + index">
                <el-input type="text" v-model="item.Email" autocomplete="off" maxlength="500">
                </el-input>
              </el-form-item>
              <el-form-item label="HomePage:" :prop="'Homepage' + index">
                <el-input type="text" v-model="item.Homepage" autocomplete="off" maxlength="500">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button @click.prevent="removeFruitConfig(item)">删除</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-form-item>
              <el-button type="primary" @click="addFruitConfig">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </div>
  </el-row>
  <el-row style="position:absolute;left: 80vw;top:75vh">
      <el-button style="" @click="next">Next step</el-button>
  </el-row>

</template>


<script setup>
import { reactive, ref ,toRefs} from 'vue'
import RichTextEditor from "./components/richTextEditor"
import { useRouter } from "vue-router";

const router = useRouter();
const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
  Overview:'',
})
const formLabelAlignResource = reactive({
  name: '',
  Affiliation: '',
  Email: '',
  Homepage:'',
})
const radiogroup1 = ref('Conversion')
const radiogroup2 = ref('Public')
const radio1 = ref('1')

const active = ref(0)
const next = () => {
  if (active.value++ > 2) active.value = 0
}
const clickStepOne =() => {
  active.value = 0;
}
const clickStepTwo =() => {
  active.value = 1;
}
const clickStepThree =() => {
  active.value = 2;
}
const clickStepFour =() =>{
  active.value = 3;

}

// 参数声明
const formRef = ref(null);
const state = reactive({
  ruleForm: {
    fruitConfig: [{
      name: '',
      Affiliation: '',
      Email: '',
      Homepage:'',
    }]
  },
})


const addFruitConfig = () => { // 新增水果、售价行
  state.ruleForm.fruitConfig.push({
    name: '',
    Affiliation: '',
    Email: '',
    Homepage:'',
  })
}

const removeFruitConfig = (item) => { // 删除水果、售价行
  const index = state.ruleForm.fruitConfig.indexOf(item)
  if (index !== -1) {
    state.ruleForm.fruitConfig.splice(index, 1)
  }
}

const submitForm = () => { // 点击确定按钮，输出行内数据
  var fruitConfig = state.ruleForm.fruitConfig;
  console.log(fruitConfig);
  console.log("水果名称：" + fruitConfig[0].fruit);
  console.log("水果售价：" + fruitConfig[0].price);
}

// 数据解构
const {
  ruleForm,
} = {
  ...toRefs(state)
};

//工具调用
const toolId = ref('');
toolId.value = "123"
const invokeTool = (id) =>{
    let pageInvokeTool = router.resolve({
        path:"/invokeTool",
        query:{
          id:id
        }
    });
    window.open(pageInvokeTool.href,'_blank');

}
</script>
<style scoped>
.stepContent{
  width:100%;
  display: flex;
  justify-content : center;
}
</style>
