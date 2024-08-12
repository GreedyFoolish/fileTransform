<template>
  <el-menu mode="horizontal" :default-active="getSettingStore.activeIndex">
    <el-menu-item index="file" @click="handleSelectMenu('file')">
      {{ "文件" }}
    </el-menu-item>
    <el-menu-item index="transform" @click="handleSelectMenu('transform')">
      {{ "转换" }}
    </el-menu-item>
    <el-menu-item index="about" @click="handleSelectMenu('download')">
      {{ "下载" }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import axios from "axios"
import {globalStore} from "@/stores/index.js";

const getSettingStore = globalStore()

const handleSelectMenu = (type) => {
  switch (type) {
    case "file":
      uploadImage()
      break
    case "transform":
      transformCode()
      break
    case "download":
      downloadCodeFile()
      break
    default:
      break
  }
}

// 上传文件函数
const uploadImage = () => {
  const fileUpload = document.createElement("input")
  fileUpload.type = "file"
  fileUpload.accept = "text/plain"
  fileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (/text+/.test(file.type)) {
      reader.readAsText(file, "utf-8")
    }
    reader.onload = (context) => {
      const code = context.target.result
      const length = code.length
      getSettingStore.sourceContent = code
    }
  })
  fileUpload.click()
}

const transformCode = () => {
  const formData = new FormData()
  formData.append("code", getSettingStore.sourceContent)
  axios({
    method: "post",
    url: "http://localhost:5000/babel",
    data: formData
  }).then(res => {
    const code = res.data
    getSettingStore.transformContent = code
  }).catch(err => {
    console.warn(err)
  })
}

const downloadCodeFile = (filename = "codeFile.js") => {
  axios({
    method: "get",
    url: "http://localhost:5000/babel/download",
  }).then(res => {
    const link = document.createElement('a')
    let blob = new Blob([res.data], {type: 'application/zip'})
    link.href = window.URL.createObjectURL(blob);
    // 设置下载的文件名
    link.download = filename;
    // 将链接插入到文档中，模拟点击下载
    document.body.appendChild(link);
    link.click();
    // 清理插入的链接
    document.body.removeChild(link);
  }).catch(err => {
    console.warn(err)
  })
}

</script>

<style scoped lang="stylus">

</style>
