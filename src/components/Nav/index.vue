<template>
  <div class="nav">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      active-text-color="#FE5F23"
      router
    >
      <el-menu-item
        :key="index"
        :index="item.path"
        v-for="(item, index) in routers"
      >
        <i :class="item.icon"></i>
        <span slot="title" v-if="item.meta.title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routers: [],
      active: "",
    };
  },
  watch: {
    $route() {
      console.log(this.$route);
      const route = this.$route.path.split("/").filter(function(s) {
        if (s) {
          return s;
        }
      });
      this.active = "/" + route[0];
    },
  },
  mounted() {
    this.active = this.$route.path;
    this.routers = this.$router.options.routes.filter((item) => {
      return item.meta.nav;
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.nav {
  width: 200px;
  background: white;
  height: 100%;
  position: fixed;
  left: 0;
  box-shadow: 0px 2px 12px 0px rgba(0, 21, 41, 0.12);
}
.el-menu-vertical-demo {
  text-align: left;
}
/deep/ .el-menu-item:focus,
.el-menu-item:hover {
  background: #ffefe9;
}
</style>
