<template>
  <div>首页</div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
  mounted(){
    this.setWidth()
  },
  methods:{
       setWidth() {
      ipcRenderer.send("setMainWindow", { width: 1122, height: 670 });
    },
    
  }
}
</script>