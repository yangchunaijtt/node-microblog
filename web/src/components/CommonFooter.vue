<template>
  <footer class="footer">
    <div class="wrapper">Copyright © {{ username }}博客</div>
  </footer>
</template>

<script>
import Cookie from "js-cookie";

export default {
  computed: {
    username() {
      let username = "";
      const user_name = Cookie.get("user_name");
      user_name
        ? (username = user_name)
        : (username = this.$store.state.username);
      return username;
    },
  },
};
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