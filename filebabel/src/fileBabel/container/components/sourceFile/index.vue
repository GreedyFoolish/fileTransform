<template>
  <div class="sourceFileContainer" ref="sourceFileContainer">
    <el-input class="sourceInput" v-model="getSettingStore.sourceContent" type="textarea" rows="15" clearable
              placeholder="请输入/上传要转换的文件内容"></el-input>
  </div>
</template>
<script setup>
import {defineExpose, ref} from "vue";
import {globalStore} from "@/stores/index.js";

const getSettingStore = globalStore()
const sourceFileContainer = ref()
const getPageIns = () => {
  return sourceFileContainer.value
}
const getRect = () => {
  return sourceFileContainer.value.getBoundingClientRect()
}

defineExpose({
  getPageIns,
  getRect,
})
</script>


<style scoped lang="stylus">
.sourceFileContainer {
  width 40vw
  height 60vh
  padding 3vh
  display: flex;
  justify-content center
  box-sizing border-box
  background-color white

  .sourceInput {
    width 30vw
  }
}
</style>
