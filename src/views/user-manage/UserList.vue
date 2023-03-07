<template>
    <el-card>
        <template #header>
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3">用户列表</span>
                </template>
            </el-page-header>
        </template>

        <!-- 表格部分 -->
        <el-table :data="data" border style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="avatar" label="头像">
                <template #default="colData">
                    <el-avatar :size="50"
                        :src="colData.row.avatar ?? 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'">
                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别">
                <template #default="colData">
                    <el-tag :type="tagList[colData.row.gender].type">
                        {{ tagList[colData.row.gender].value }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="colData">
                    <el-tag :type="colData.row.role === 1 ? 'success' : ''">
                        {{ colData.row.role === 1 ? '管理员' : '编辑' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="colData">
                    <el-button type="primary" @click="modifyUser(colData.row.id)" :icon="Edit" circle />
                    <el-popconfirm confirm-button-type="danger" @confirm="deleteUserHandler(colData.row.id)"
                        title="确定要删除该用户吗?">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>


    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
        <!-- 编辑用户表单 -->
        <!-- 表单 -->
        <el-form label-width="100px" ref="userFormRef" :model="userForm" :rules="rules" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password type="password" v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select style="width: 100%;" v-model="userForm.role">
                    <el-option label="管理员" :value="1"></el-option>
                    <el-option label="编辑" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select style="width: 100%;" v-model="userForm.gender">
                    <el-option label="保秘" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
                <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <UploadVue v-model:image-src="userForm.avatar" @upload="onUpload"></UploadVue>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="() => {
                    dialogVisible = false
                    onModifyUser()
                }">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { getUsers, deleteUsers, getUsersById, updateUser } from '@/api'
import type { User } from '@/stores/store'
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';

import UploadVue from '@/components/upload/Upload.vue'
import { useUploadImage } from '@/components/upload/uploadImage'

const data = ref<User[]>([])
const dialogVisible = ref(false)
const modifyUserId = ref<number>()
const tagList = [
    {
        type: 'info',
        value: '保密'
    },
    {
        type: '',
        value: '男性'
    },
    {
        type: 'warning',
        value: '女性'
    }
]
onMounted(async () => {
    data.value = (await getUsers()).data
})

const deleteUserHandler = async (id: number) => {
    const res = await deleteUsers(id)
    if (res.success) {
        data.value.splice(data.value.findIndex(item => item.id === id), 1)
        ElMessage.success('删除成功')
    }
}
const modifyUser = async (id: number) => {
    modifyUserId.value = id
    dialogVisible.value = true
    const data = await getUsersById(id)
    if (data.success) {
        /* userForm.username = data.data.username
        userForm.avatar = data.data.avatar
        userForm.gender = data.data.gender
        userForm.introduction = data.data.introduction
        userForm.password = data.data.password
        userForm.role = data.data.role */
        //使用assign进行覆盖保留响应式
        Object.assign(userForm,data.data)
    }
}





const { onUpload, getUploadedImageUrl } = useUploadImage()

const userForm = reactive<Pick<User, 'avatar' | 'username' | 'gender' | 'introduction' | 'role' | 'password'>>({
    avatar: '',
    username: '',
    gender: 0,
    introduction: '',
    password: '',
    role: 2//1 管理员 2编辑
})
const userFormRef = ref<FormInstance>()
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
}

//修改用户
const onModifyUser = () => {
    userFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            userForm.avatar = (await getUploadedImageUrl())!
            const res = (await updateUser(modifyUserId.value!, userForm)).data
            if (res.success) {
                //重置表单
                userFormRef.value?.resetFields()
                data.value.splice(data.value.findIndex(item => item.id === modifyUserId.value), 1, res.data)
                ElMessage.success('修改成功')
            }
        }
    })
}
</script>

<style scoped></style>