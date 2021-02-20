<template>
  <div class="wrapper">
    <h1 class="title">文章列表</h1>

    <div class="article">
      <el-button class="addBtn" @click="handleAdd">新增+</el-button>
      <el-button @click="signOut" type="danger">退出登录</el-button>
      <el-table :data="articleList" border stripe>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.createtime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button size="mini" type="success" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: "editArticle" });
    },
    handleLook(row) {
      let id = row.id;
      window.open("#/detail/" + id);
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ path: `/article/edit/${id}` });
    },
    signOut() {
      Cookie.remove("token");
      this.$store.commit("setUsername", '');
      Cookie.set("user_name", 'Yc');
      this.$store.commit("setToken", "");
      this.$store.commit("changIsSignIn", 0);
      this.$router.push({ name: "home" });
    },
    handleDelect(row) {
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/api/blog/delete", {
              id: row.id,
            })
            .then((res) => {
              res = res.data;
              if (res.IsSuccess) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `${row.title} 文章删除成功!`,
                });
                setTimeout(() => {
                  location.reload();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getMyBlogList() {
     
      const user_name =Cookie.get('user_name');
       console.log(user_name)
      this.$axios
        .get("/api/blog/getList", {
          params: {
            author:user_name? user_name:this.$store.state.username,
          },
        })
        .then((res) => {
          res = res.data;
          //   debugger;
          if (res.IsSuccess) {
            this.articleList = res.data;
            this.articleList.forEach((item) => {
              item.createtime = this.$moment(parseInt(item.createtime)).format(
                "YYYY-MM-DD HH:SS"
              );
            });
          }else {
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
    this.getMyBlogList();
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}
.article {
  .addBtn {
    float: right;
    margin-bottom: 20px;
  }
}
/deep/ .el-table {
  .cell {
    text-align: center;
  }
}
</style>