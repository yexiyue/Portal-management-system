<template>
    <el-card>
        <template #header>
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3">添加用户</span>
                </template>
            </el-page-header>
        </template>
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

            <el-form-item>
                <el-button @click="onSubmitUser" type="primary" class="user-form-submit">
                    添加用户
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import type { User } from '@/stores/store';
import { ElMessage, type FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import UploadVue from '@/components/upload/Upload.vue'
import { useUploadImage } from '@/components/upload/uploadImage'
import { createUser } from '@/api'
import { useRouter } from 'vue-router';


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
const router = useRouter()
//添加用户
const onSubmitUser = () => {
    userFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            userForm.avatar = (await getUploadedImageUrl())!
            const res = await createUser(userForm)
            if (res.success) {
                //重置表单
                userFormRef.value?.resetFields()

                ElMessage.success('添加用户成功')
                router.push('/user-manage/userList')
            }
        }
    })
}

</script>

<style scoped>
.el-card {
    margin-top: 5px;
}
</style>