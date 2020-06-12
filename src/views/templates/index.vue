<template>
    <div>
        模板
        <router-link to="/template/add">去添加</router-link>
        <el-button @click="addFn">新增</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        addFn(){
            this.$router.push("/template/add")
        }
    }
}
</script>