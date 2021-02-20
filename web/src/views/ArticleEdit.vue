<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content" />
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id) {
        this.$axios
          .post("/api/blog/update", {
            title: this.title,
            content: this.content,
            id: this.$route.params.id,
          })
          .then((res) => {
            res = res.data;
            if (res.IsSuccess) {
              this.$message({
                message: "更新成功",
                type: "success",
              });
              setTimeout(() => {
                this.$router.push({ name: "article" });
              }, 1500);
            } else {
              this.$message({
                message: res.message,
                center: true,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        const user_name =Cookie.get('user_name');
        this.$axios
          .post("/api/blog/add", {
            title: this.title,
            content: this.content,
            author: user_name?user_name:this.$store.state.username,
          })
          .then((res) => {
            res = res.data;
            if (res.IsSuccess) {
              this.$message({
                message: "新增成功",
                type: "success",
              });
              setTimeout(() => {
                this.$router.push({ name: "article" });
              }, 1500);
            } else {
              this.$message({
                message: res.message,
                center: true,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getDetail() {
      this.$axios
        .get("/api/blog/details", {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          res = res.data;
          if (res.IsSuccess) {
            let blogList = res.data[0];
            this.title = blogList.title;
            this.content = blogList.content;
          } else {
            this.$message({
              message: res.message,
              center: true,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}
</style>