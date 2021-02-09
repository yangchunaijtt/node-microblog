<template>
  <footer class="footer">
    <div class="wrapper">Copyright © {{$store.state.username}}博客</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  .wrapper {
    text-align: center;
  }
}
</style>