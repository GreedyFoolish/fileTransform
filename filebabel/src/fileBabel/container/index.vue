<template>
  <div class="fileContainer" ref="fileContainer">
    <sourceFile></sourceFile>
    <transformFile></transformFile>
  </div>
</template>

<script setup>
import sourceFile from "@/fileBabel/container/components/sourceFile/index.vue"
import transformFile from "@/fileBabel/container/components/transformFile/index.vue"
import {globalStore} from "@/stores/index.js";
import {ref} from "vue";

const getSettingStore = globalStore()
const fileContainer = ref()

const getPageIns = () => {
  return fileContainer.value
}
const getRect = () => {
  return fileContainer.value.getBoundingClientRect()
}

defineExpose({
  getPageIns,
  getRect,
})
</script>

<style scoped lang="stylus">
.fileContainer {
  height 100vh
  padding 5vh
  display flex
  justify-content space-between
  background-color rgb(239 244 249)
  overflow auto
}
</style>
