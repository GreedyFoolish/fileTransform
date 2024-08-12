<template>
  <div class="transformFileContainer" ref="transformFileContainer">
    <el-input class="transformInput" v-model="getSettingStore.transformContent" type="textarea" rows="15" clearable>

    </el-input>
  </div>
</template>
<script setup>
import {defineExpose, ref} from "vue";
import {globalStore} from "@/stores/index.js";

const getSettingStore = globalStore()
const transformFileContainer = ref()
const getPageIns = () => {
  return transformFileContainer.value
}
const getRect = () => {
  return transformFileContainer.value.getBoundingClientRect()
}

defineExpose({
  getPageIns,
  getRect,
})
</script>


<style scoped lang="stylus">
.transformFileContainer {
  width 40vw
  height 60vh
  padding 3vh
  display: flex;
  justify-content center
  box-sizing border-box
  background-color white

  .transformInput {
    width 30vw
  }
}
</style>
