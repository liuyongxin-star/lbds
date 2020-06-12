<template>
  <div class="layout">
    <NavHeader></NavHeader>
    <div class="layout-content">
      <div class="layout-left">
        <Nav></Nav>
      </div>
      <div class="layout-right">
          <div class="layout-right_content">
            <keep-alive>
             <router-view></router-view>
            </keep-alive>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import NavHeader from "@/components/Header";
export default {
  data() {
    return {};
  },
  components: {
    Nav,
    NavHeader
  }
};
</script>
<style lang="scss" scoped>
.layout-content {
  display: flex;
  justify-content: space-between;
  .layout-left {
    width: 200px;
    flex: 0 0 200px;
  }
  .layout-right {
    flex: 1;
    padding: 16px;
    box-sizing: border-box;
    background: #F0F2F5;
    min-height: calc(100vh - 60px);
    .layout-right_content{
        background: white;
        height: 100%;
    }
  
  }
}
</style>
