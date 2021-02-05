<template>
  <div class="list">
    <div class="card" v-for="item in blogList" :key="item.id">
      <router-link :to="'/detail/' + item.id">
        <p class="title">{{ item.title }}</p>
      </router-link>
      <p class="date">{{ item.createtime}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
    };
  },
  methods: {
    getBlogList() {
      this.$axios
        .get("/api/blog/getList")
        .then((res) => {
          res = res.data;
          if (res.IsSuccess) {
            this.blogList = res.data;
            this.blogList.forEach(item => {
               item.createtime=  this.$moment(parseInt(item.createtime)).format('YYYY-MM-DD HH:SS')
            })
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getBlogList();
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 20px;
  margin-top: 15px;
  border-bottom: 1px solid #eee;
  .title {
    color: #0085a1;
    font-size: 26px;
    font-weight: 600;
  }
  .date {
    font-style: italic;
    font-family: Lora, "Times New Roman", serif;
    color: #808080;
    margin-top: 20px;
  }
}
</style>