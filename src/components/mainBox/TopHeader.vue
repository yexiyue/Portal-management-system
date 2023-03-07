<template>
    <el-header>
        <div class="left">
            <el-icon size="30" @click="store.isCollapse=!store.isCollapse" >
                <MenuIcon></MenuIcon>
            </el-icon>
            <span>
                企业门户网站管理系统
            </span>
        </div>
        <div class="right">
            <span>
                欢迎 {{ store.user.username }} 回来
            </span>

            <el-dropdown trigger="click" >
                <span class="el-dropdown-link">
                    <el-avatar :size="40"
                    :src="store.user.avatar ?? 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'">
                </el-avatar>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- 点击跳转到个人中心 -->
                        <el-dropdown-item @click="router.push('/center')" >个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup lang="ts">
/**
 * 1.编写header组件
 * 2.用户设置下拉框
 */
import { useIndexStore } from '../../stores/store'
import {User} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router=useRouter()
const store = useIndexStore()

store.$subscribe((mutations, state) => {
    localStorage.setItem('isCollapsed', state.isCollapse + '')
})
//退出
const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')

}
</script>

<style scoped lang="less">

.left,.right {
    height: 100%;
    display: flex;
    align-items: center;

    span {
        margin: 8px
    }
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(100, 183, 221, 0.767);
    color: white;
    line-height: 100%;
    height: 60px;
}
:deep(.el-dropdown){
    color: white;
    padding-bottom: 5px;
    cursor: pointer;
}
.el-icon{
    cursor: pointer;
}
:deep(.el-dropdown):hover{
    color: #1296db;
    .el-icon{
        color: #1296db;
    }
}
</style>