<template>
  <div class="layoutContainer">
    <Menu></Menu>
    <Container></Container>
  </div>
</template>

<script setup>
import Menu from "./menu/index.vue";
import Container from "./container/index.vue";

</script>

<style scoped lang="stylus">
.layoutContainer {
  display flex
  flex-direction column
  height 100vh
}
</style>
